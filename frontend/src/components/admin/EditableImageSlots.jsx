import { useRef, useState } from "react";
import EditableImage from "./EditableImage";
import { uploadImageToCloudinary } from "../../api/cloudinary";

const MAX_SLIDES = 5;

// Admin-only grid of carousel slide tiles. Each existing slide reuses the
// existing EditableImage component untouched (same hover-to-change UX).
// Adds a "+ ADD SLIDE" tile when under the max, and a small remove button
// per tile when there's more than one slide.
export default function EditableImageSlots({ images = [], onChange, className = "" }) {
  const fileInputRef = useRef(null);
  const [addingSlide, setAddingSlide] = useState(false);

  function replaceSlide(index, newUrl) {
    const next = [...images];
    next[index] = newUrl;
    onChange(next);
  }

  function removeSlide(index) {
    if (images.length <= 1) return; // always keep at least one slide
    onChange(images.filter((_, i) => i !== index));
  }

  function handleAddClick() {
    fileInputRef.current?.click();
  }

  async function handleAddFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAddingSlide(true);
    try {
      const newUrl = await uploadImageToCloudinary(file);
      onChange([...images, newUrl]);
    } catch (err) {
      console.error("Slide upload failed:", err);
      alert("Image upload failed. Please try again.");
    } finally {
      setAddingSlide(false);
      e.target.value = "";
    }
  }

  return (
   <div className={`grid grid-cols-3 gap-3 p-4 md:p-6 ${className}`}>
      {images.map((img, i) => (
<div key={i} className="relative aspect-square group/slot">          <EditableImage
            src={img}
            alt={`Hero slide ${i + 1}`}
            className="w-full h-full object-cover"
            onSave={(newUrl) => replaceSlide(i, newUrl)}
          />
          {images.length > 1 && (
            <button
              type="button"
              onClick={() => removeSlide(i)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-charcoal text-cream text-xs rounded-full opacity-0 group-hover/slot:opacity-100 transition-opacity z-10"
              aria-label={`Remove slide ${i + 1}`}
            >
              ×
            </button>
          )}
        </div>
      ))}

      {images.length < MAX_SLIDES && (
        <button
          type="button"
          onClick={handleAddClick}
          disabled={addingSlide}
className="aspect-square border border-dashed border-charcoal/30 flex items-center justify-center text-xs tracking-[0.1em] text-charcoal/50 hover:border-charcoal hover:text-charcoal transition-colors disabled:opacity-50"        >
          {addingSlide ? "UPLOADING..." : "+ ADD SLIDE"}
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleAddFile}
        className="hidden"
      />
    </div>
  );
}