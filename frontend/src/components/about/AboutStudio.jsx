// import { motion } from "framer-motion";
// import { useSection } from "../../hooks/useSection";
// import { useEditableSection } from "../../hooks/useEditableSection";
// import { useAdminMode } from "../../context/AdminModeContext";
// import EditableText from "../admin/EditableText";
// import EditableImage from "../admin/EditableImage";
// import { cld } from "../../utils/cloudinaryTransform";

// export default function AboutStudio() {
//   const { isEditing } = useAdminMode();
//   const editable = useEditableSection("about_studio");
//   const readOnly = useSection("about_studio");

//   const data = isEditing ? editable.data : readOnly.data;
//   const loading = isEditing ? editable.loading : readOnly.loading;

//   if (loading || !data) return null;

//   function saveStatField(index, field, value) {
//     const updatedStats = data.stats.map((s, i) => (i === index ? { ...s, [field]: value } : s));
//     editable.saveWhole({ stats: updatedStats });
//   }

//   return (
//     <section className="relative border-t border-charcoal/10">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.98 }}
//         whileInView={{ opacity: 1, scale: 1 }}
//         viewport={{ once: true, amount: 0.3 }}
//         transition={{ duration: 0.8 }}
//         className="w-full h-[50vh] md:h-[65vh] overflow-hidden"
//       >
//         <EditableImage
//           src={cld(data.image, { width: 1600 })}
//           alt="The studio"
//           className="w-full h-full object-cover"
//           onSave={(url) => editable.saveField("image", url)}
//         />
//       </motion.div>

//       <div className="max-w-[1900px] mx-auto px-4 md:pl-24 md:pr-16 py-16 md:py-24">
//         <span className="text-xs tracking-[0.2em] text-gold">
//           <EditableText as="span" value={data.eyebrow} onSave={(v) => editable.saveField("eyebrow", v)} />
//         </span>

//         <h2 className="font-serif text-3xl md:text-5xl mt-4 max-w-2xl text-charcoal">
//           <EditableText as="span" value={data.heading} onSave={(v) => editable.saveField("heading", v)} />
//         </h2>

//         <p className="text-sm md:text-base text-charcoal/60 leading-relaxed mt-6 max-w-2xl">
//           <EditableText as="span" multiline value={data.body} onSave={(v) => editable.saveField("body", v)} />
//         </p>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-14 md:mt-16 pt-10 border-t border-charcoal/10">
//           {data.stats.map((stat, i) => (
//             <div key={i}>
//               <p className="font-serif text-3xl md:text-4xl text-charcoal">
//                 <EditableText as="span" value={stat.value} onSave={(v) => saveStatField(i, "value", v)} />
//               </p>
//               <p className="text-xs tracking-[0.1em] text-charcoal/50 mt-2">
//                 <EditableText as="span" value={stat.label} onSave={(v) => saveStatField(i, "label", v)} />
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import { motion } from "framer-motion";
import { useSection } from "../../hooks/useSection";
import { useEditableSection } from "../../hooks/useEditableSection";
import { useAdminMode } from "../../context/AdminModeContext";
import EditableText from "../admin/EditableText";
import EditableImageSlots from "../admin/EditableImageSlots";
import HeroCarousel from "../home/HeroCarousel";

export default function AboutStudio() {
  const { isEditing } = useAdminMode();
  const editable = useEditableSection("about_studio");
  const readOnly = useSection("about_studio");

  const data = isEditing ? editable.data : readOnly.data;
  const loading = isEditing ? editable.loading : readOnly.loading;

  if (loading || !data) return null;

  function saveStatField(index, field, value) {
    const updatedStats = data.stats.map((s, i) => (i === index ? { ...s, [field]: value } : s));
    editable.saveWhole({ stats: updatedStats });
  }

  return (
    <section className="relative border-t border-charcoal/10">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className={isEditing ? "px-4 md:pl-24 md:pr-16 pt-10" : "w-full h-[50vh] md:h-[65vh] overflow-hidden"}
      >
        {isEditing ? (
          <EditableImageSlots
            images={data.images || []}
            onChange={(next) => editable.saveField("images", next)}
            maxSlides={3}
          />
        ) : (
          <HeroCarousel images={data.images || []} alt="The studio" className="w-full h-full" />
        )}
      </motion.div>

      <div className="max-w-[1900px] mx-auto px-4 md:pl-24 md:pr-16 py-16 md:py-24">
        <span className="text-xs tracking-[0.2em] text-gold">
          <EditableText as="span" value={data.eyebrow} onSave={(v) => editable.saveField("eyebrow", v)} />
        </span>

        <h2 className="font-serif text-3xl md:text-5xl mt-4 max-w-2xl text-charcoal">
          <EditableText as="span" value={data.heading} onSave={(v) => editable.saveField("heading", v)} />
        </h2>

        <p className="text-sm md:text-base text-charcoal/60 leading-relaxed mt-6 max-w-2xl">
          <EditableText as="span" multiline value={data.body} onSave={(v) => editable.saveField("body", v)} />
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-14 md:mt-16 pt-10 border-t border-charcoal/10">
          {data.stats.map((stat, i) => (
            <div key={i}>
              <p className="font-serif text-3xl md:text-4xl text-charcoal">
                <EditableText as="span" value={stat.value} onSave={(v) => saveStatField(i, "value", v)} />
              </p>
              <p className="text-xs tracking-[0.1em] text-charcoal/50 mt-2">
                <EditableText as="span" value={stat.label} onSave={(v) => saveStatField(i, "label", v)} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}