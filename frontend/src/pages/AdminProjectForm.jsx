import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminShell from "../components/admin/AdminShell";
import { getProject, createProject, updateProject } from "../api/projects";
import { uploadImageToCloudinary } from "../api/cloudinary";

const emptyProject = {
  title: "",
  category: "Residential",
  location: "",
  year: "",
  area: "",
  typology: "",
  architect_name: "",
  concept: "",
  cover_image: "",
  gallery: [],
  review: { quote: "", client_name: "" },
};

const categories = ["Residential", "Commercial", "Interior", "Landscape"];

export default function AdminProjectForm() {
  const { id } = useParams(); // undefined when creating new
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyProject);
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditMode) {
      getProject(id)
        .then((data) => {
          setForm({
            ...data,
            review: data.review || { quote: "", client_name: "" },
          });
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id, isEditMode]);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateReviewField(field, value) {
    setForm((prev) => ({ ...prev, review: { ...prev.review, [field]: value } }));
  }

  async function handleCoverUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    try {
      const url = await uploadImageToCloudinary(file);
      updateField("cover_image", url);
    } catch (err) {
      alert("Cover image upload failed.");
    } finally {
      setUploadingCover(false);
      e.target.value = "";
    }
  }

  async function handleGalleryUpload(e) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploadingGallery(true);
    try {
      const urls = await Promise.all(files.map(uploadImageToCloudinary));
      setForm((prev) => ({ ...prev, gallery: [...prev.gallery, ...urls] }));
    } catch (err) {
      alert("One or more gallery images failed to upload.");
    } finally {
      setUploadingGallery(false);
      e.target.value = "";
    }
  }

  function removeGalleryImage(index) {
    setForm((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.title || !form.cover_image) {
      setError("Title and cover image are required.");
      return;
    }

    const payload = {
      ...form,
      review: form.review.quote && form.review.client_name ? form.review : null,
    };

    setSaving(true);
    try {
      if (isEditMode) {
        await updateProject(id, payload);
      } else {
        await createProject(payload);
      }
      navigate("/admin/projects");
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to save project.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <AdminShell pageTitle={isEditMode ? "Edit Project" : "New Project"}>
        <div className="max-w-3xl mx-auto px-6 py-16 text-sm text-charcoal/50">Loading...</div>
      </AdminShell>
    );
  }

  return (
    <AdminShell pageTitle={isEditMode ? "Edit Project" : "New Project"}>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-6 md:px-12 py-16 space-y-10">
        <h1 className="font-serif text-3xl text-charcoal">
          {isEditMode ? "Edit Project" : "New Project"}
        </h1>

        {/* Basic fields */}
        <div className="grid md:grid-cols-2 gap-6">
          <Field label="Title">
            <input
              type="text"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              className="input-field"
            />
          </Field>

          <Field label="Category">
            <select
              value={form.category}
              onChange={(e) => updateField("category", e.target.value)}
              className="input-field"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>

          <Field label="Location">
            <input
              type="text"
              value={form.location}
              onChange={(e) => updateField("location", e.target.value)}
              className="input-field"
            />
          </Field>

          <Field label="Year">
            <input
              type="text"
              value={form.year}
              onChange={(e) => updateField("year", e.target.value)}
              className="input-field"
            />
          </Field>

          <Field label="Area">
            <input
              type="text"
              placeholder='e.g. 3,200 sq ft'
              value={form.area}
              onChange={(e) => updateField("area", e.target.value)}
              className="input-field"
            />
          </Field>

          <Field label="Typology">
            <input
              type="text"
              placeholder="e.g. Single-family residence"
              value={form.typology}
              onChange={(e) => updateField("typology", e.target.value)}
              className="input-field"
            />
          </Field>
           <Field label="Architect Name">
            <input
              type="text"
              placeholder="e.g. Rohan Harisangam"
              value={form.architect_name || ""}
              onChange={(e) => updateField("architect_name", e.target.value)}
              className="input-field"
            />
          </Field>
        </div>

        <Field label="Concept / Description">
          <textarea
            rows={5}
            value={form.concept}
            onChange={(e) => updateField("concept", e.target.value)}
            className="input-field resize-none"
          />
        </Field>

        {/* Cover image */}
        <Field label="Cover Image">
          {form.cover_image && (
            <img src={form.cover_image} alt="Cover" className="w-full max-w-xs aspect-[4/3] object-cover mb-3" />
          )}
          <label className="inline-block text-xs tracking-[0.1em] border-b border-charcoal/30 hover:border-charcoal transition-colors pb-1 cursor-pointer">
            {uploadingCover ? "UPLOADING..." : form.cover_image ? "CHANGE COVER IMAGE" : "UPLOAD COVER IMAGE"}
            <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" disabled={uploadingCover} />
          </label>
        </Field>

        {/* Gallery */}
        <Field label="Gallery Images">
          <div className="flex flex-wrap gap-3 mb-3">
            {form.gallery.map((img, i) => (
              <div key={img + i} className="relative w-24 h-24 group">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(i)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-charcoal text-cream text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <label className="inline-block text-xs tracking-[0.1em] border-b border-charcoal/30 hover:border-charcoal transition-colors pb-1 cursor-pointer">
            {uploadingGallery ? "UPLOADING..." : "+ ADD GALLERY IMAGES"}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryUpload}
              className="hidden"
              disabled={uploadingGallery}
            />
          </label>
        </Field>

        {/* Client review */}
        <div className="border-t border-charcoal/10 pt-8">
          <p className="text-xs tracking-[0.15em] text-charcoal/50 mb-4">CLIENT REVIEW (OPTIONAL)</p>
          <div className="space-y-4">
            <Field label="Quote">
              <textarea
                rows={2}
                value={form.review.quote}
                onChange={(e) => updateReviewField("quote", e.target.value)}
                className="input-field resize-none"
              />
            </Field>
            <Field label="Client Name">
              <input
                type="text"
                value={form.review.client_name}
                onChange={(e) => updateReviewField("client_name", e.target.value)}
                className="input-field"
              />
            </Field>
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex items-center gap-6">
          <button
            type="submit"
            disabled={saving}
            className="text-xs tracking-[0.15em] bg-charcoal text-cream px-6 py-3 hover:bg-gold transition-colors disabled:opacity-50"
          >
            {saving ? "SAVING..." : isEditMode ? "SAVE CHANGES" : "CREATE PROJECT"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/projects")}
            className="text-xs tracking-[0.15em] text-charcoal/50 hover:text-charcoal transition-colors"
          >
            CANCEL
          </button>
        </div>
      </form>
    </AdminShell>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs tracking-[0.1em] text-charcoal/50 mb-2">{label.toUpperCase()}</label>
      {children}
    </div>
  );
}