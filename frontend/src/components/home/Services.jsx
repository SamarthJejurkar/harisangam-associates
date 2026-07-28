import { motion } from "framer-motion";
import { useSection } from "../../hooks/useSection";
import { useEditableSection } from "../../hooks/useEditableSection";
import { useAdminMode } from "../../context/AdminModeContext";
import EditableText from "../admin/EditableText";

export default function Services() {
  const { isEditing } = useAdminMode();
  const editable = useEditableSection("services");
  const readOnly = useSection("services");

  const servicesData = isEditing ? editable.data : readOnly.data;
  const loading = isEditing ? editable.loading : readOnly.loading;

  if (loading || !servicesData) return null;

  function saveItemField(index, field, value) {
    const updatedItems = servicesData.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    editable.saveWhole({ items: updatedItems });
  }

  return (
    <section id="services" className="max-w-7xl mx-auto px-6 md:px-12 py-20">
      <span className="text-xs tracking-[0.2em] text-gold">
        <EditableText
          as="span"
          value={servicesData.eyebrow}
          onSave={(v) => editable.saveField("eyebrow", v)}
        />
      </span>

      <h2 className="font-serif text-3xl md:text-4xl mt-4 text-charcoal">
        <EditableText
          as="span"
          value={servicesData.headline}
          onSave={(v) => editable.saveField("headline", v)}
        />
      </h2>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 mt-12">
        {servicesData.items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="border-t border-charcoal/10 pt-6"
          >
            <h3 className="font-serif text-xl text-charcoal mb-2">
              <EditableText
                as="span"
                value={item.title}
                onSave={(v) => saveItemField(i, "title", v)}
              />
            </h3>
            <p className="text-sm text-charcoal/60 leading-relaxed max-w-sm">
              <EditableText
                as="span"
                multiline
                value={item.description}
                onSave={(v) => saveItemField(i, "description", v)}
              />
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}