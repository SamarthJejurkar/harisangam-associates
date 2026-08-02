import { useState, useRef } from "react";
import { useAdminMode } from "../../context/AdminModeContext";
import { uploadImageToCloudinary } from "../../api/cloudinary";

export default function EditableImage({ src, alt, onSave, className = "" }) {
  const { isEditing } = useAdminMode();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  if (!isEditing) {
    return <img src={src} alt={alt} className={className} />;
  }

  function handleClick() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const newUrl = await uploadImageToCloudinary(file);
      await onSave(newUrl);
    } catch (err) {
      console.error("Image upload/save failed:", err);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
      e.target.value = ""; // allow re-selecting the same file later
    }
  }

  return (
    <div className="relative group/image w-full h-full">
      <img src={src} alt={alt} className={className} />

      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity ${
          uploading ? "opacity-100 bg-charcoal/60" : "opacity-0 group-hover/image:opacity-100 bg-charcoal/50"
        }`}
      >
        <button
          onClick={handleClick}
          disabled={uploading}
          className="px-4 py-2 bg-cream text-charcoal text-xs tracking-[0.1em] hover:bg-gold hover:text-cream transition-colors disabled:opacity-50"
        >
          {uploading ? "UPLOADING..." : "CHANGE IMAGE"}
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}