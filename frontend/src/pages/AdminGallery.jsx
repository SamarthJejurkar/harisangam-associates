import { useEffect, useRef, useState } from "react";
import AdminShell from "../components/admin/AdminShell";
import { AdminModeProvider } from "../context/AdminModeContext";
import EditableImage from "../components/admin/EditableImage";
import {
  getGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from "../api/gallery";
import { uploadImageToCloudinary } from "../api/cloudinary";
import { cld } from "../utils/cloudinaryTransform";
import { tileSizeClasses } from "../utils/galleryLayout";

const SLOT_COUNT = 50;

function EmptySlot({ index, sizeClass, onUpload }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await onUpload(index, file);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <button
      onClick={() => fileInputRef.current?.click()}
      disabled={uploading}
      className={`${sizeClass} border border-dashed border-charcoal/25 flex items-center justify-center text-[10px] tracking-[0.1em] text-charcoal/35 hover:border-charcoal/60 hover:text-charcoal/60 transition-colors disabled:opacity-50`}
    >
      {uploading ? "UPLOADING..." : `+ SLOT ${index + 1}`}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </button>
  );
}

function FilledSlot({ image, sizeClass, onReplace, onDelete }) {
  return (
    <div className={`relative ${sizeClass} group/tile overflow-hidden`}>
      <EditableImage
        src={cld(image.image_url, { width: 400 })}
        alt={image.caption || ""}
        className="w-full h-full object-cover"
        onSave={(newUrl) => onReplace(image.id, newUrl)}
      />
      <button
        onClick={() => onDelete(image.id)}
        className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-charcoal/70 text-cream text-sm rounded opacity-0 group-hover/tile:opacity-100 transition-opacity z-10"
        title="Remove image from this slot"
      >
        ×
      </button>
    </div>
  );
}

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, []);

  function loadImages() {
    setLoading(true);
    getGalleryImages().then(setImages).catch(console.error).finally(() => setLoading(false));
  }

  const slots = Array(SLOT_COUNT).fill(null);
  images.forEach((img) => {
    if (img.order >= 0 && img.order < SLOT_COUNT) {
      slots[img.order] = img;
    }
  });

  async function handleUploadToSlot(slotIndex, file) {
    try {
      const url = await uploadImageToCloudinary(file);
      const created = await createGalleryImage({
        image_url: url,
        caption: "",
        order: slotIndex,
        size: "",
      });
      setImages((prev) => [...prev, created]);
    } catch (err) {
      console.error("Failed to add gallery image:", err);
      alert("Upload failed. Please try again.");
    }
  }

  async function handleReplace(id, newUrl) {
    const image = images.find((i) => i.id === id);
    await updateGalleryImage(id, { ...image, image_url: newUrl });
    setImages((prev) => prev.map((i) => (i.id === id ? { ...i, image_url: newUrl } : i)));
  }

  async function handleDelete(id) {
    if (!confirm("Remove this image from its slot? This cannot be undone.")) return;
    await deleteGalleryImage(id);
    setImages((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <AdminShell pageTitle="Manage Gallery">
      <AdminModeProvider isEditing={true}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
          <h1 className="font-serif text-3xl text-charcoal mb-2">Gallery</h1>
          <p className="text-xs text-charcoal/50 mb-8">
            This is the full 50-slot layout, in the exact shapes it uses on the live site. Click
            any empty slot to add an image there, hover a filled one to replace it, × to clear it.
          </p>

          {!loading && (
            <div
              className="grid grid-cols-4 sm:grid-cols-6 auto-rows-[90px] sm:auto-rows-[110px] gap-3"
              style={{ gridAutoFlow: "dense" }}
            >
              {slots.map((image, index) =>
                image ? (
                  <FilledSlot
                    key={image.id}
                    image={image}
                    sizeClass={tileSizeClasses(index)}
                    onReplace={handleReplace}
                    onDelete={handleDelete}
                  />
                ) : (
                  <EmptySlot
                    key={`empty-${index}`}
                    index={index}
                    sizeClass={tileSizeClasses(index)}
                    onUpload={handleUploadToSlot}
                  />
                )
              )}
            </div>
          )}
        </div>
      </AdminModeProvider>
    </AdminShell>
  );
}