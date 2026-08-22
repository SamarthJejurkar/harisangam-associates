import { useEffect, useRef, useState } from "react";
import AdminShell from "../components/admin/AdminShell";
import { getSection, updateSection } from "../api/sections";
import { uploadImageToCloudinary } from "../api/cloudinary";
import { cld } from "../utils/cloudinaryTransform";

export default function AdminLogoSettings() {
  const [logoUrl, setLogoUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    getSection("site_settings")
      .then((data) => setLogoUrl(data.logo_url || ""))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      await updateSection("site_settings", { logo_url: url });
      setLogoUrl(url);
    } catch (err) {
      console.error("Logo upload failed:", err);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleReset() {
    if (!confirm("Remove the uploaded logo and go back to the default?")) return;
    await updateSection("site_settings", { logo_url: "" });
    setLogoUrl("");
  }

  return (
    <AdminShell pageTitle="Site Logo">
      <div className="max-w-xl mx-auto px-6 md:px-12 py-16">
        <h1 className="font-serif text-3xl text-charcoal mb-2">Site Logo</h1>
        <p className="text-xs text-charcoal/50 mb-10">
          This logo appears in the navigation bar across the whole site. Upload a new one to
          replace it, or reset to use the default file.
        </p>

        {!loading && (
          <>
            <div className="w-40 h-40 bg-charcoal/5 flex items-center justify-center overflow-hidden mb-6">
              {logoUrl ? (
                <img src={cld(logoUrl, { width: 300 })} alt="Current logo" className="w-full h-full object-contain p-4" />
              ) : (
                <img src="/logo.jpg" alt="Default logo" className="w-full h-full object-contain p-4" />
              )}
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="text-xs tracking-[0.15em] bg-charcoal text-cream px-6 py-3 hover:bg-gold transition-colors disabled:opacity-50"
              >
                {uploading ? "UPLOADING..." : logoUrl ? "REPLACE LOGO" : "UPLOAD LOGO"}
              </button>

              {logoUrl && (
                <button
                  onClick={handleReset}
                  className="text-xs tracking-[0.15em] text-charcoal/50 hover:text-charcoal transition-colors"
                >
                  RESET TO DEFAULT
                </button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
            />
          </>
        )}
      </div>
    </AdminShell>
  );
}