

// import { motion } from "framer-motion";
// import { useSection } from "../../hooks/useSection";
// import { useEditableSection } from "../../hooks/useEditableSection";
// import { useAdminMode } from "../../context/AdminModeContext";
// import EditableText from "../admin/EditableText";
// import EditableImageSlots from "../admin/EditableImageSlots";
// import HeroCarousel from "./HeroCarousel";

// export default function Hero() {
//   const { isEditing } = useAdminMode();

//   const editable = useEditableSection("hero");
//   const readOnly = useSection("hero");

//   const heroData = isEditing ? editable.data : readOnly.data;
//   const loading = isEditing ? editable.loading : readOnly.loading;

//   if (loading || !heroData) return null;

//   // ---------- ADMIN: editing needs clear, separate controls ----------
//   // Text-on-image overlay is great for the public site, but trying to make
//   // that exact overlay directly click-to-edit gets fiddly and hard to read
//   // while editing. So in admin mode we show the text fields plainly above
//   // the image slots grid instead - same data, easier to actually edit.
//   if (isEditing) {
//     return (
//       <section className="max-w-[1900px] mx-auto px-4 md:pl-24 md:pr-16 pt-8 pb-10">
//         <div className="max-w-2xl mb-8">
//           <h1 className="font-serif text-3xl md:text-4xl leading-[1.15] text-charcoal">
//             <EditableText
//               as="span"
//               value={heroData.headline_line1}
//               onSave={(v) => editable.saveField("headline_line1", v)}
//             />{" "}
//             <EditableText
//               as="span"
//               value={heroData.headline_line2}
//               onSave={(v) => editable.saveField("headline_line2", v)}
//             />{" "}
//             <EditableText
//               as="span"
//               className="italic text-gold"
//               value={heroData.headline_accent}
//               onSave={(v) => editable.saveField("headline_accent", v)}
//             />
//           </h1>

//           <p className="mt-4 text-sm text-charcoal/60 leading-relaxed">
//             <EditableText
//               as="span"
//               multiline
//               value={heroData.subtext}
//               onSave={(v) => editable.saveField("subtext", v)}
//             />
//           </p>

//           <p className="mt-4 text-xs tracking-[0.1em] text-charcoal/40">
//             CTA TEXT:{" "}
//             <EditableText
//               as="span"
//               value={heroData.cta_text}
//               onSave={(v) => editable.saveField("cta_text", v)}
//             />
//           </p>
//         </div>

//         <EditableImageSlots
//           images={heroData.images || []}
//           onChange={(next) => editable.saveField("images", next)}
//         />
//       </section>
//     );
//   }

//   // ---------- PUBLIC: full-bleed image, tagline overlaid at bottom ----------
//   return (
//     <section className="relative w-full h-[70vh] md:h-[92vh]">
//       <HeroCarousel
//         images={heroData.images || []}
//         alt="Featured architecture"
//         className="w-full h-full"
//       />

//       <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent pointer-events-none" />

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, ease: "easeOut" }}
//         className="absolute bottom-0 left-0 right-0 px-5 md:pl-24 md:pr-16 pb-10 md:pb-16"
//       >
//         <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl leading-[1.15] md:leading-[1.05] text-cream max-w-2xl">
//           {heroData.headline_line1} {heroData.headline_line2}{" "}
//           <span className="italic text-gold">
//             {heroData.headline_accent}
//           </span>
//         </h1>

//         <p className="mt-3 md:mt-5 text-xs md:text-sm text-cream/80 leading-relaxed max-w-md">
//           {heroData.subtext}
//         </p>

//         <a
//           href="/projects"
//           className="group inline-flex items-center gap-2 mt-5 md:mt-8 text-[11px] md:text-xs tracking-[0.1em] text-cream"
//         >
//           <span className="border-b border-cream/40 pb-1 group-hover:border-cream transition-colors">
//             {heroData.cta_text}
//           </span>

//           <span className="transition-transform group-hover:translate-x-1">
//             →
//           </span>
//         </a>
//       </motion.div>
//     </section>
//   );
// }

import { motion } from "framer-motion";
import { useSection } from "../../hooks/useSection";
import { useEditableSection } from "../../hooks/useEditableSection";
import { useAdminMode } from "../../context/AdminModeContext";
import EditableImageSlots from "../admin/EditableImageSlots";
import HeroCarousel from "./HeroCarousel";

export default function Hero() {
  const { isEditing } = useAdminMode();

  const editable = useEditableSection("hero");
  const readOnly = useSection("hero");

  const heroData = isEditing ? editable.data : readOnly.data;
  const loading = isEditing ? editable.loading : readOnly.loading;

  if (loading || !heroData) return null;

  if (isEditing) {
    return (
      <section className="max-w-[1900px] mx-auto px-4 md:pl-24 md:pr-16 pt-8 pb-10">
        <div className="max-w-md mb-6">
          <p className="text-xs tracking-[0.1em] text-charcoal/40 mb-1">
            BUTTON TEXT (only text shown on the public hero)
          </p>

          <input
            type="text"
            value={heroData.cta_text || ""}
            onChange={(e) =>
              editable.saveField("cta_text", e.target.value)
            }
            className="input-field text-sm"
          />
        </div>

        <EditableImageSlots
          images={heroData.images || []}
          onChange={(next) => editable.saveField("images", next)}
        />
      </section>
    );
  }

  return (
    <section className="relative w-full h-[42vh] sm:h-[55vh] md:h-[calc(100vh-96px)]">
      <HeroCarousel
        images={heroData.images || []}
        alt="Featured architecture"
        className="w-full h-full"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 px-5 md:pl-24 md:pr-16 pb-6 md:pb-12"
      >
        <a
          href="/projects"
          className="group inline-flex items-center gap-2 text-[11px] md:text-xs tracking-[0.1em] text-cream"
        >
          <span className="border-b border-cream/40 pb-1 group-hover:border-cream transition-colors">
            {heroData.cta_text || "EXPLORE OUR WORK"}
          </span>

          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>
      </motion.div>
    </section>
  );
}