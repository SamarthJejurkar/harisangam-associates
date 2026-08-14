import { motion, AnimatePresence } from "framer-motion";
import { useAdminMode } from "../../context/AdminModeContext";
import EditableText from "../admin/EditableText";
import EditableImage from "../admin/EditableImage";
import { cld } from "../../utils/cloudinaryTransform";

export default function ProfileDrawer({ person, onClose, onSaveField }) {
  const { isEditing } = useAdminMode();

  return (
    <AnimatePresence>
      {person && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-charcoal/50 z-[90]"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-cream z-[100] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center text-charcoal/60 hover:text-charcoal text-2xl z-10"
              aria-label="Close"
            >
              ×
            </button>

            <div className="aspect-[4/5] overflow-hidden">
              {isEditing ? (
                <EditableImage
                  src={cld(person.image, { width: 700 })}
                  alt={person.name}
                  className="w-full h-full object-cover"
                  onSave={(url) => onSaveField("image", url)}
                />
              ) : (
                <img
                  src={cld(person.image, { width: 700 })}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="px-6 md:px-8 py-8">
              <h3 className="font-serif font-semibold text-2xl text-charcoal">
                {isEditing ? (
                  <EditableText as="span" value={person.name} onSave={(v) => onSaveField("name", v)} />
                ) : (
                  person.name
                )}
              </h3>
              <p className="text-xs tracking-[0.1em] text-gold mt-1">
                {isEditing ? (
                  <EditableText as="span" value={person.role} onSave={(v) => onSaveField("role", v)} />
                ) : (
                  person.role
                )}
              </p>
              <p className="text-sm text-charcoal/60 leading-relaxed mt-5">
                {isEditing ? (
                  <EditableText as="span" multiline value={person.bio} onSave={(v) => onSaveField("bio", v)} />
                ) : (
                  person.bio
                )}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}