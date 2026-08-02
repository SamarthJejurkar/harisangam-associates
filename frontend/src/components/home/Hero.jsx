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

//   return (
//     <section className="grid md:grid-cols-[44%_56%] items-stretch min-h-[92vh]">
//       <motion.div
//         className="flex items-center pl-6 md:pl-24 pr-6 py-16 md:py-0"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, ease: "easeOut" }}
//       >
//         <div className="max-w-[440px]">
//           <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.1] text-charcoal">
//             <EditableText
//               as="span"
//               value={heroData.headline_line1}
//               onSave={(v) => editable.saveField("headline_line1", v)}
//             />
//             <br />
//             <EditableText
//               as="span"
//               value={heroData.headline_line2}
//               onSave={(v) => editable.saveField("headline_line2", v)}
//             />
//             <br />
//             <EditableText
//               as="span"
//               className="italic text-gold"
//               value={heroData.headline_accent}
//               onSave={(v) => editable.saveField("headline_accent", v)}
//             />
//           </h1>

//           <p className="mt-6 text-sm text-charcoal/60 leading-relaxed">
//             <EditableText
//               as="span"
//               multiline
//               value={heroData.subtext}
//               onSave={(v) => editable.saveField("subtext", v)}
//             />
//           </p>

//           <a
//             href="/projects"
//             className="group inline-flex items-center gap-2 mt-8 text-xs tracking-[0.15em] text-charcoal"
//           >
//             <span className="border-b border-charcoal/30 group-hover:border-charcoal transition-colors pb-1">
//               <EditableText
//                 as="span"
//                 value={heroData.cta_text}
//                 onSave={(v) => editable.saveField("cta_text", v)}
//               />
//             </span>

//             <span className="transition-transform group-hover:translate-x-1">
//               →
//             </span>
//           </a>
//         </div>
//       </motion.div>

//       <motion.div
//         className="w-full min-h-[50vh] md:min-h-[92vh]"
//         initial={{ opacity: 0, scale: 0.97 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//       >
//         {isEditing ? (
//           <EditableImageSlots
//             images={heroData.images || []}
//             onChange={(next) => editable.saveField("images", next)}
//           />
//         ) : (
//           <HeroCarousel
//             images={heroData.images || []}
//             alt="Featured architecture"
//             className="w-full h-full"
//           />
//         )}
//       </motion.div>
//     </section>
//   );
// }



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

//   return (
//     <section className="grid md:grid-cols-[44%_56%] items-stretch min-h-[92vh]">
//       {/* Left */}
//       <motion.div
//         className="flex items-center pl-8 md:pl-20 lg:pl-24 pr-2"
//         initial={{ opacity: 0, y: 12 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, ease: "easeOut" }}
//       >
//         <div className="max-w-[500px]">
//           {/* <h1 className="font-serif text-[54px] md:text-[64px] leading-[1.04] text-charcoal"> */}
//           <h1 className="font-serif text-[58px] md:text-[70px] leading-[1.03] text-charcoal">
//             <EditableText
//               as="span"
//               value={heroData.headline_line1}
//               onSave={(v) => editable.saveField("headline_line1", v)}
//             />
//             <br />
//             <EditableText
//               as="span"
//               value={heroData.headline_line2}
//               onSave={(v) => editable.saveField("headline_line2", v)}
//             />
//             <br />
//             <EditableText
//               as="span"
//               className="italic text-gold"
//               value={heroData.headline_accent}
//               onSave={(v) => editable.saveField("headline_accent", v)}
//             />
//           </h1>

//           <p className="mt-8 max-w-[340px] text-[15px] leading-[1.75] text-charcoal/60">
//             <EditableText
//               as="span"
//               multiline
//               value={heroData.subtext}
//               onSave={(v) => editable.saveField("subtext", v)}
//             />
//           </p>

//           <a
//             href="/projects"
//             className="group inline-flex items-center gap-3 mt-10 text-xs tracking-[0.08em] text-charcoal"
//           >
//             <span className="border-b border-charcoal/30 pb-[6px] transition-colors group-hover:border-charcoal">
//               <EditableText
//                 as="span"
//                 value={heroData.cta_text}
//                 onSave={(v) => editable.saveField("cta_text", v)}
//               />
//             </span>

//             <span className="transition-transform duration-300 group-hover:translate-x-2">
//               →
//             </span>
//           </a>
//         </div>
//       </motion.div>

//       {/* Right */}
//       <motion.div
//   className={
//     isEditing
//       ? "relative w-full min-h-[92vh] bg-charcoal/5"
//       : "relative w-full h-[92vh] overflow-hidden"
//   }
//   initial={{ opacity: 0, scale: 0.98 }}
//   animate={{ opacity: 1, scale: 1 }}
//   transition={{ duration: 0.8, ease: "easeOut" }}
// >
//         {isEditing ? (
//           <EditableImageSlots
//             images={heroData.images || []}
//             onChange={(next) => editable.saveField("images", next)}
//           />
//         ) : (
//           <HeroCarousel
//             images={heroData.images || []}
//             alt="Featured architecture"
//             className="w-full h-full"
//           />
//         )}
//       </motion.div>
//     </section>
//   );
// }

import { motion } from "framer-motion";
import { useSection } from "../../hooks/useSection";
import { useEditableSection } from "../../hooks/useEditableSection";
import { useAdminMode } from "../../context/AdminModeContext";
import EditableText from "../admin/EditableText";
import EditableImageSlots from "../admin/EditableImageSlots";
import HeroCarousel from "./HeroCarousel";

export default function Hero() {
  const { isEditing } = useAdminMode();

  const editable = useEditableSection("hero");
  const readOnly = useSection("hero");

  const heroData = isEditing ? editable.data : readOnly.data;
  const loading = isEditing ? editable.loading : readOnly.loading;

  if (loading || !heroData) return null;

  return (
    <section className="flex flex-col md:grid md:grid-cols-[44%_56%] md:items-stretch md:min-h-[92vh]">
      {/* Hero Image */}
      <motion.div
        className="order-1 md:order-2 relative w-full h-[42vh] sm:h-[50vh] md:h-[92vh] overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {isEditing ? (
          <EditableImageSlots
            images={heroData.images || []}
            onChange={(next) => editable.saveField("images", next)}
            className="w-full h-full"
          />
        ) : (
          <HeroCarousel
            images={heroData.images || []}
            alt="Featured architecture"
            className="w-full h-full"
          />
        )}
      </motion.div>

      {/* Hero Text */}
      <motion.div
        className="order-2 md:order-1 flex items-center px-5 pt-5 pb-8 md:px-0 md:pl-20 lg:md:pl-24 md:py-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="w-full max-w-[500px]">
          <h1 className="font-serif text-[34px] sm:text-[46px] md:text-[60px] lg:text-[70px] leading-[1.15] md:leading-[1.03] text-charcoal">
            <EditableText
              as="span"
              value={heroData.headline_line1}
              onSave={(v) => editable.saveField("headline_line1", v)}
            />
            <br />
            <EditableText
              as="span"
              value={heroData.headline_line2}
              onSave={(v) => editable.saveField("headline_line2", v)}
            />
            <br />
            <EditableText
              as="span"
              className="italic text-gold"
              value={heroData.headline_accent}
              onSave={(v) => editable.saveField("headline_accent", v)}
            />
          </h1>

          <p className="mt-3 md:mt-6 max-w-full sm:max-w-[340px] text-[13px] md:text-[15px] leading-relaxed md:leading-[1.75] text-charcoal/60">
            <EditableText
              as="span"
              multiline
              value={heroData.subtext}
              onSave={(v) => editable.saveField("subtext", v)}
            />
          </p>

          <a
            href="/projects"
            className="group inline-flex items-center gap-2 md:gap-3 mt-5 md:mt-10 text-[10px] md:text-xs tracking-[0.08em] text-charcoal"
          >
            <span className="border-b border-charcoal/30 pb-[3px] md:pb-[6px] transition-colors group-hover:border-charcoal">
              <EditableText
                as="span"
                value={heroData.cta_text}
                onSave={(v) => editable.saveField("cta_text", v)}
              />
            </span>

            <span className="transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}