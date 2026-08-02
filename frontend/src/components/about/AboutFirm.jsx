import { motion } from "framer-motion";
import { useSection } from "../../hooks/useSection";
import { useEditableSection } from "../../hooks/useEditableSection";
import { useAdminMode } from "../../context/AdminModeContext";
import EditableText from "../admin/EditableText";
import EditableImage from "../admin/EditableImage";
import { cld } from "../../utils/cloudinaryTransform";

export default function AboutFirm() {
  const { isEditing } = useAdminMode();
  const editable = useEditableSection("about_firm");
  const readOnly = useSection("about_firm");

  const data = isEditing ? editable.data : readOnly.data;
  const loading = isEditing ? editable.loading : readOnly.loading;

  if (loading || !data) return null;

  return (
    <section className="max-w-[1900px] mx-auto px-4 md:pl-24 md:pr-16 pt-16 md:pt-24 pb-16 md:pb-24">
      <span className="text-xs tracking-[0.2em] text-gold">
        <EditableText as="span" value={data.eyebrow} onSave={(v) => editable.saveField("eyebrow", v)} />
      </span>

      <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl leading-[1.15] md:leading-[1.05] mt-4 max-w-3xl text-charcoal">
        <EditableText as="span" value={data.heading} onSave={(v) => editable.saveField("heading", v)} />{" "}
        <EditableText
          as="span"
          className="italic text-gold"
          value={data.heading_accent}
          onSave={(v) => editable.saveField("heading_accent", v)}
        />
      </h1>

      <div className="grid md:grid-cols-2 gap-10 md:gap-16 mt-12 md:mt-16 items-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="aspect-[4/5] overflow-hidden"
        >
          <EditableImage
            src={cld(data.image, { width: 900 })}
            alt="Harisangam & Associates"
            className="w-full h-full object-cover"
            onSave={(url) => editable.saveField("image", url)}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-sm md:text-base text-charcoal/60 leading-relaxed max-w-md"
        >
          <EditableText as="span" multiline value={data.body} onSave={(v) => editable.saveField("body", v)} />
        </motion.p>
      </div>
    </section>
  );
}