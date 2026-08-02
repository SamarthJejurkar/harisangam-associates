import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cld } from "../../utils/cloudinaryTransform";

const AUTOPLAY_MS = 4500;

export default function HeroCarousel({ images = [], alt = "Featured architecture", className = "" }) {
  const [index, setIndex] = useState(0);
  const slides = images.filter(Boolean);

  // Preload every slide as soon as we have the list, so switching between
  // slides never has to wait on a network fetch (that wait was the visible
  // "blank" gap during transitions).
  useEffect(() => {
    slides.forEach((url) => {
      const img = new Image();
      img.src = cld(url, { width: 1600 });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.join(",")]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* All slides are stacked and always mounted; only opacity changes.
          This overlaps the crossfade (no unmount/wait gap) and guarantees
          every image is already loaded before it needs to be shown. */}
      {slides.map((url, i) => (
        <motion.img
          key={url}
          src={cld(url, { width: 1600 })}
          alt={alt}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-full h-full object-cover absolute inset-0"
        />
      ))}

      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-cream" : "w-1.5 bg-cream/50 hover:bg-cream/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}