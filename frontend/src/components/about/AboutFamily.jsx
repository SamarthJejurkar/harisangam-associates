import { motion } from "framer-motion";
import { useSection } from "../../hooks/useSection";
import { useEditableSection } from "../../hooks/useEditableSection";
import { useAdminMode } from "../../context/AdminModeContext";
import EditableText from "../admin/EditableText";
import EditableImage from "../admin/EditableImage";
import { cld } from "../../utils/cloudinaryTransform";

export default function AboutFamily() {
  const { isEditing } = useAdminMode();
  const editable = useEditableSection("about_family");
  const readOnly = useSection("about_family");

  const data = isEditing ? editable.data : readOnly.data;
  const loading = isEditing ? editable.loading : readOnly.loading;

  if (loading || !data) return null;

  function saveMemberField(index, field, value) {
    const updatedMembers = data.members.map((m, i) => (i === index ? { ...m, [field]: value } : m));
    editable.saveWhole({ members: updatedMembers });
  }

  return (
    <section className="max-w-[1900px] mx-auto px-4 md:pl-24 md:pr-16 py-16 md:py-24 border-t border-charcoal/10">
      <span className="text-xs tracking-[0.2em] text-gold">
        <EditableText as="span" value={data.eyebrow} onSave={(v) => editable.saveField("eyebrow", v)} />
      </span>

      <h2 className="font-serif text-3xl md:text-5xl mt-4 max-w-2xl text-charcoal">
        <EditableText as="span" value={data.heading} onSave={(v) => editable.saveField("heading", v)} />
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mt-12 md:mt-16">
        {data.members.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <div className="aspect-[4/5] overflow-hidden mb-4">
              <EditableImage
                src={cld(member.image, { width: 500 })}
                alt={member.name}
                className="w-full h-full object-cover"
                onSave={(url) => saveMemberField(i, "image", url)}
              />
            </div>

            <h3 className="font-serif font-semibold text-lg text-charcoal">
              <EditableText as="span" value={member.name} onSave={(v) => saveMemberField(i, "name", v)} />
            </h3>
            <p className="text-xs tracking-[0.1em] text-gold mt-1">
              <EditableText as="span" value={member.role} onSave={(v) => saveMemberField(i, "role", v)} />
            </p>
            <p className="text-sm text-charcoal/60 leading-relaxed mt-3">
              <EditableText as="span" multiline value={member.bio} onSave={(v) => saveMemberField(i, "bio", v)} />
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}