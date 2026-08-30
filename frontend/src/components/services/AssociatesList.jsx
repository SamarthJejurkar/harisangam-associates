import { useRef, useState } from "react";
import { useSection } from "../../hooks/useSection";
import { useEditableSection } from "../../hooks/useEditableSection";
import { useAdminMode } from "../../context/AdminModeContext";
import EditableText from "../admin/EditableText";
import { uploadImageToCloudinary } from "../../api/cloudinary";
import { cld } from "../../utils/cloudinaryTransform";

function AssociateLogo({ logo, name, onSave }) {
  const { isEditing } = useAdminMode();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      await onSave(url);
    } catch (err) {
      console.error("Logo upload failed:", err);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  const initials = (name || "?")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 shrink-0 bg-charcoal/5 flex items-center justify-center overflow-hidden group/logo">
      {logo ? (
        <img src={cld(logo, { width: 300 })} alt={name} className="w-full h-full object-contain p-3" />
      ) : (
        <span className="text-lg md:text-xl font-serif text-charcoal/30">{initials}</span>
      )}

      {isEditing && (
        <>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className={`absolute inset-0 flex items-center justify-center text-[9px] tracking-[0.05em] text-cream transition-opacity ${
              uploading ? "opacity-100 bg-charcoal/70" : "opacity-0 group-hover/logo:opacity-100 bg-charcoal/60"
            }`}
          >
            {uploading ? "..." : "CHANGE"}
          </button>
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
  );
}

// Groups categories into visual rows: any category with more than one
// associate gets its own full-width row; consecutive single-associate
// categories pair up two-per-row. Doing this in JS (rather than relying on
// CSS grid auto-flow per-category) means each row can have ONE divider
// line that always spans the true full width, instead of a line per
// category that only spans that category's own (possibly half) column.
function groupCategoriesIntoRows(categories) {
  const rows = [];
  let i = 0;
  while (i < categories.length) {
    const cat = categories[i];
    if (cat.associates.length > 1) {
      rows.push([{ cat, index: i }]);
      i += 1;
    } else {
      const next = categories[i + 1];
      if (next && next.associates.length <= 1) {
        rows.push([
          { cat, index: i },
          { cat: next, index: i + 1 },
        ]);
        i += 2;
      } else {
        rows.push([{ cat, index: i }]);
        i += 1;
      }
    }
  }
  return rows;
}



export default function AssociatesList() {
  const { isEditing } = useAdminMode();
  const editable = useEditableSection("associates");
  const readOnly = useSection("associates");

  const data = isEditing ? editable.data : readOnly.data;
  const loading = isEditing ? editable.loading : readOnly.loading;

  if (loading || !data) return null;

  function updateCategories(updater) {
    editable.saveWhole({ categories: updater(data.categories) });
  }

  function saveCategoryLabel(catIndex, value) {
    updateCategories((cats) => cats.map((c, i) => (i === catIndex ? { ...c, label: value } : c)));
  }

  function saveAssociateField(catIndex, assocIndex, field, value) {
    updateCategories((cats) =>
      cats.map((c, i) =>
        i !== catIndex
          ? c
          : {
              ...c,
              associates: c.associates.map((a, j) => (j === assocIndex ? { ...a, [field]: value } : a)),
            }
      )
    );
  }

  function addAssociate(catIndex) {
    updateCategories((cats) =>
      cats.map((c, i) =>
        i !== catIndex ? c : { ...c, associates: [...c.associates, { name: "New Associate", logo: "" }] }
      )
    );
  }

  function removeAssociate(catIndex, assocIndex) {
    updateCategories((cats) =>
      cats.map((c, i) =>
        i !== catIndex ? c : { ...c, associates: c.associates.filter((_, j) => j !== assocIndex) }
      )
    );
  }

  function addCategory() {
    updateCategories((cats) => [...cats, { label: "New Category", associates: [] }]);
  }

  function removeCategory(catIndex) {
    if (!confirm("Remove this whole category and its associates?")) return;
    updateCategories((cats) => cats.filter((_, i) => i !== catIndex));
  }

  return (
    <section className="max-w-[1900px] mx-auto px-4 md:pl-24 md:pr-16 pt-10 md:pt-16 pb-20">
      <span className="text-xs tracking-[0.2em] text-gold">
        <EditableText as="span" value={data.eyebrow} onSave={(v) => editable.saveField("eyebrow", v)} />
      </span>

      <h1 className="font-serif text-3xl md:text-5xl mt-3 max-w-2xl text-charcoal">
        <EditableText as="span" value={data.heading} onSave={(v) => editable.saveField("heading", v)} />
      </h1>

      <div className="mt-12 md:mt-16 space-y-12 md:space-y-16">
        {groupCategoriesIntoRows(data.categories).map((row, rowIndex) => (
          <div key={rowIndex} className="border-t border-charcoal/10 pt-8">
            <div className={`grid ${row.length > 1 ? "md:grid-cols-2" : ""} gap-x-12 gap-y-10`}>
              {row.map(({ cat, index: catIndex }) => (
                <div key={catIndex}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xs tracking-[0.2em] text-charcoal/50">
                      <EditableText
                        as="span"
                        value={cat.label.toUpperCase()}
                        onSave={(v) => saveCategoryLabel(catIndex, v)}
                      />
                    </h2>
                    {isEditing && (
                      <button
                        onClick={() => removeCategory(catIndex)}
                        className="text-xs text-red-600/60 hover:text-red-600 transition-colors"
                      >
                        × remove category
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {cat.associates.map((assoc, assocIndex) => (
                      <div key={assocIndex} className="flex items-center gap-4 md:gap-5 relative">
                        <AssociateLogo
                          logo={assoc.logo}
                          name={assoc.name}
                          onSave={(url) => saveAssociateField(catIndex, assocIndex, "logo", url)}
                        />
                        <p className="font-serif font-semibold text-lg md:text-xl text-charcoal/70 flex-1">
                          <EditableText
                            as="span"
                            value={assoc.name}
                            onSave={(v) => saveAssociateField(catIndex, assocIndex, "name", v)}
                          />
                        </p>
                        {isEditing && (
                          <button
                            onClick={() => removeAssociate(catIndex, assocIndex)}
                            className="text-xs text-red-600/60 hover:text-red-600 transition-colors shrink-0"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}

                    {isEditing && (
                      <button
                        onClick={() => addAssociate(catIndex)}
                        className="text-left text-xs tracking-[0.1em] text-charcoal/40 hover:text-charcoal/70 transition-colors border border-dashed border-charcoal/20 px-4 py-5"
                      >
                        + ADD ASSOCIATE
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {isEditing && (
          <button
            onClick={addCategory}
            className="text-xs tracking-[0.1em] text-charcoal/40 hover:text-charcoal/70 transition-colors border-t border-dashed border-charcoal/20 pt-6 w-full text-left"
          >
            + ADD CATEGORY
          </button>
        )}
      </div>
    </section>
  );
}