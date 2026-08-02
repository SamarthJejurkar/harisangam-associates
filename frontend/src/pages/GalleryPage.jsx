import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getGalleryImages } from "../api/gallery";
import { cld } from "../utils/cloudinaryTransform";
import { tileSizeClasses } from "../utils/galleryLayout";

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    getGalleryImages()
      .then(setImages)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-[1900px] mx-auto px-4 md:pl-24 md:pr-16 pt-10 md:pt-16 pb-20">
      <span className="text-xs tracking-[0.2em] text-gold">GALLERY</span>
      <h1 className="font-serif text-3xl md:text-5xl mt-3 text-charcoal">Moments & Details</h1>

      {!loading && images.length === 0 && (
        <p className="text-sm text-charcoal/50 mt-10">No images yet.</p>
      )}

      {!loading && images.length > 0 && (
       <div
  className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 auto-rows-[130px] sm:auto-rows-[160px] md:auto-rows-[190px] gap-3 md:gap-4 mt-10"
  style={{ gridAutoFlow: "dense" }}
>
  {images.map((img, i) => (
    <motion.button
      key={img.id}
      onClick={() => setLightboxIndex(i)}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className={`${tileSizeClasses(img.order)} overflow-hidden group`}
    >
      <img
        src={cld(img.image_url, { width: 700 })}
        alt={img.caption || ""}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </motion.button>
  ))}
</div>
      )}

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-charcoal/95 z-[100] flex items-center justify-center p-6"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-cream text-2xl"
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={cld(images[lightboxIndex].image_url, { width: 1400 })}
            alt={images[lightboxIndex].caption || ""}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}