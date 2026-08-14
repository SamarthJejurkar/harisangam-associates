// import { motion } from "framer-motion";
// import { useSection } from "../../hooks/useSection";
// import { useEditableSection } from "../../hooks/useEditableSection";
// import { useAdminMode } from "../../context/AdminModeContext";
// import EditableText from "../admin/EditableText";
// import EditableImage from "../admin/EditableImage";
// import { cld } from "../../utils/cloudinaryTransform";

// export default function AboutFamily() {
//   const { isEditing } = useAdminMode();
//   const editable = useEditableSection("about_family");
//   const readOnly = useSection("about_family");

//   const data = isEditing ? editable.data : readOnly.data;
//   const loading = isEditing ? editable.loading : readOnly.loading;

//   if (loading || !data) return null;

//   function saveMemberField(index, field, value) {
//     const updatedMembers = data.members.map((m, i) => (i === index ? { ...m, [field]: value } : m));
//     editable.saveWhole({ members: updatedMembers });
//   }

//   return (
//     <section className="max-w-[1900px] mx-auto px-4 md:pl-24 md:pr-16 py-16 md:py-24 border-t border-charcoal/10">
//       <span className="text-xs tracking-[0.2em] text-gold">
//         <EditableText as="span" value={data.eyebrow} onSave={(v) => editable.saveField("eyebrow", v)} />
//       </span>

//       <h2 className="font-serif text-3xl md:text-5xl mt-4 max-w-2xl text-charcoal">
//         <EditableText as="span" value={data.heading} onSave={(v) => editable.saveField("heading", v)} />
//       </h2>

//       <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mt-12 md:mt-16">
//         {data.members.map((member, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 15 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.3 }}
//             transition={{ duration: 0.5, delay: i * 0.08 }}
//           >
//             <div className="aspect-[4/5] overflow-hidden mb-4">
//               <EditableImage
//                 src={cld(member.image, { width: 500 })}
//                 alt={member.name}
//                 className="w-full h-full object-cover"
//                 onSave={(url) => saveMemberField(i, "image", url)}
//               />
//             </div>

//             <h3 className="font-serif font-semibold text-lg text-charcoal">
//               <EditableText as="span" value={member.name} onSave={(v) => saveMemberField(i, "name", v)} />
//             </h3>
//             <p className="text-xs tracking-[0.1em] text-gold mt-1">
//               <EditableText as="span" value={member.role} onSave={(v) => saveMemberField(i, "role", v)} />
//             </p>
//             <p className="text-sm text-charcoal/60 leading-relaxed mt-3">
//               <EditableText as="span" multiline value={member.bio} onSave={(v) => saveMemberField(i, "bio", v)} />
//             </p>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }

import { useState } from "react";
import { motion } from "framer-motion";
import { useSection } from "../../hooks/useSection";
import { useEditableSection } from "../../hooks/useEditableSection";
import { useAdminMode } from "../../context/AdminModeContext";
import EditableText from "../admin/EditableText";
import EditableImage from "../admin/EditableImage";
import ProfileDrawer from "./ProfileDrawer";
import { cld } from "../../utils/cloudinaryTransform";

export default function AboutFamily() {
  const { isEditing } = useAdminMode();
  const editable = useEditableSection("about_family");
  const readOnly = useSection("about_family");

  const data = isEditing ? editable.data : readOnly.data;
  const loading = isEditing ? editable.loading : readOnly.loading;

  const [selected, setSelected] = useState(null);

  if (loading || !data) return null;

  function saveFounderField(field, value) {
    editable.saveWhole({ founder: { ...data.founder, [field]: value } });
  }

  function saveMemberField(index, field, value) {
    const updatedMembers = data.members.map((m, i) => (i === index ? { ...m, [field]: value } : m));
    editable.saveWhole({ members: updatedMembers });
  }

  const selectedPerson =
    selected?.type === "founder"
      ? data.founder
      : selected?.type === "member"
      ? data.members[selected.index]
      : null;

  const selectedSaveField =
    selected?.type === "founder"
      ? saveFounderField
      : selected?.type === "member"
      ? (field, value) => saveMemberField(selected.index, field, value)
      : () => {};

  return (
    <section className="max-w-[1900px] mx-auto px-4 md:pl-24 md:pr-16 py-16 md:py-24 border-t border-charcoal/10">
      <span className="text-xs tracking-[0.2em] text-gold">
        <EditableText as="span" value={data.eyebrow} onSave={(v) => editable.saveField("eyebrow", v)} />
      </span>

      <h2 className="font-serif text-3xl md:text-5xl mt-4 max-w-2xl text-charcoal">
        <EditableText as="span" value={data.heading} onSave={(v) => editable.saveField("heading", v)} />
      </h2>

      <motion.button
        onClick={() => setSelected({ type: "founder" })}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-8 md:gap-14 mt-12 md:mt-16 text-left group"
      >
        <div className="aspect-[4/5] md:aspect-[4/3] overflow-hidden">
          {isEditing ? (
            <EditableImage
              src={cld(data.founder.image, { width: 900 })}
              alt={data.founder.name}
              className="w-full h-full object-cover"
              onSave={(url) => saveFounderField("image", url)}
            />
          ) : (
            <img
              src={cld(data.founder.image, { width: 900 })}
              alt={data.founder.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="font-serif font-semibold text-2xl md:text-3xl text-charcoal">{data.founder.name}</h3>
          <p className="text-xs tracking-[0.1em] text-gold mt-2">{data.founder.role}</p>
          <p className="text-sm md:text-base text-charcoal/60 leading-relaxed mt-5 max-w-md">
            {data.founder.bio}
          </p>
          <span className="text-xs tracking-[0.1em] text-charcoal/40 mt-6 group-hover:text-charcoal/70 transition-colors">
            VIEW PROFILE →
          </span>
        </div>
      </motion.button>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 mt-14 md:mt-20">
        {data.members.map((member, i) => (
          <motion.button
            key={i}
            onClick={() => setSelected({ type: "member", index: i })}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="text-left group"
          >
            <div className="aspect-square overflow-hidden mb-3">
              {isEditing ? (
                <EditableImage
                  src={cld(member.image, { width: 400 })}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onSave={(url) => saveMemberField(i, "image", url)}
                />
              ) : (
                <img
                  src={cld(member.image, { width: 400 })}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
            </div>
            <h4 className="font-serif font-semibold text-sm md:text-base text-charcoal">{member.name}</h4>
          </motion.button>
        ))}
      </div>

      <ProfileDrawer
        person={selectedPerson}
        onClose={() => setSelected(null)}
        onSaveField={selectedSaveField}
      />
    </section>
  );
}