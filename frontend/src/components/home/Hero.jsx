import { motion } from "framer-motion";
import { useSection } from "../../hooks/useSection";
import { useEditableSection } from "../../hooks/useEditableSection";
import { useAdminMode } from "../../context/AdminModeContext";
import EditableText from "../admin/EditableText";
import EditableImage from "../admin/EditableImage";
import { cld } from "../../utils/cloudinaryTransform";

export default function Hero() {
  const { isEditing } = useAdminMode();

  // In admin mode we need saveField, so use the editable hook there.
  // On the public site, the plain read-only hook is enough.
  const editable = useEditableSection("hero");
  const readOnly = useSection("hero");

  const heroData = isEditing ? editable.data : readOnly.data;
  const loading = isEditing ? editable.loading : readOnly.loading;

  if (loading || !heroData) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 pt-8 md:pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.1] text-charcoal">
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

        <p className="mt-6 max-w-sm text-sm text-charcoal/60 leading-relaxed">
          <EditableText
            as="span"
            multiline
            value={heroData.subtext}
            onSave={(v) => editable.saveField("subtext", v)}
          />
        </p>

        <a
          href="/projects"
          className="group inline-flex items-center gap-2 mt-8 text-xs tracking-[0.15em] text-charcoal"
        >
          <span className="border-b border-charcoal/30 group-hover:border-charcoal transition-colors pb-1">
            <EditableText
              as="span"
              value={heroData.cta_text}
              onSave={(v) => editable.saveField("cta_text", v)}
            />
          </span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="aspect-[4/5] overflow-hidden"
      >
        <EditableImage
          src={cld(heroData.image, { width: 900 })}
          alt="Featured architecture"
          className="w-full h-full object-cover"
          onSave={(url) => editable.saveField("image", url)}
        />
      </motion.div>
    </section>
  );
}