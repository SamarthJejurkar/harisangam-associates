import { motion } from "framer-motion";
import { useSection } from "../../hooks/useSection";
import { useEditableSection } from "../../hooks/useEditableSection";
import { useAdminMode } from "../../context/AdminModeContext";
import EditableText from "../admin/EditableText";
import EditableImage from "../admin/EditableImage";
import { cld } from "../../utils/cloudinaryTransform";

export default function About() {
  const { isEditing } = useAdminMode();
  const editable = useEditableSection("about");
  const readOnly = useSection("about");

  const aboutData = isEditing ? editable.data : readOnly.data;
  const loading = isEditing ? editable.loading : readOnly.loading;

  if (loading || !aboutData) return null;

  return (
    <section id="about" className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="aspect-[4/5] overflow-hidden order-2 md:order-1"
      >
        <EditableImage
          src={cld(aboutData.image, { width: 900 })}
          alt="About Harsangam"
          className="w-full h-full object-cover"
          onSave={(url) => editable.saveField("image", url)}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="order-1 md:order-2"
      >
        <span className="text-xs tracking-[0.2em] text-gold">
          <EditableText
            as="span"
            value={aboutData.eyebrow}
            onSave={(v) => editable.saveField("eyebrow", v)}
          />
        </span>

        <h2 className="font-serif text-3xl md:text-4xl mt-4 leading-snug text-charcoal">
          <EditableText
            as="span"
            value={aboutData.headline}
            onSave={(v) => editable.saveField("headline", v)}
          />
          <br />
          <EditableText
            as="span"
            className="italic"
            value={aboutData.headline_accent}
            onSave={(v) => editable.saveField("headline_accent", v)}
          />
        </h2>

        <p className="mt-6 text-sm text-charcoal/60 leading-relaxed max-w-md">
          <EditableText
            as="span"
            multiline
            value={aboutData.body}
            onSave={(v) => editable.saveField("body", v)}
          />
        </p>

        <p className="mt-8 text-xs tracking-[0.2em] text-charcoal/50">
          <EditableText
            as="span"
            value={aboutData.signature}
            onSave={(v) => editable.saveField("signature", v)}
          />
        </p>
      </motion.div>
    </section>
  );
}