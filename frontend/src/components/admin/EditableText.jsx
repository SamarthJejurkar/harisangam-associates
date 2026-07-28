import { useState, useRef, useEffect } from "react";
import { useAdminMode } from "../../context/AdminModeContext";

export default function EditableText({
  as: Tag = "span",
  value,
  onSave,
  className = "",
  multiline = false,
}) {
  const { isEditing } = useAdminMode();
  const ref = useRef(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (ref.current && document.activeElement !== ref.current) {
      ref.current.textContent = value;
    }
  }, [value]);

  if (!isEditing) {
    return <Tag className={className}>{value}</Tag>;
  }

  async function handleBlur(e) {
    const newValue = e.target.textContent.trim();
    if (newValue === value) return;

    setSaving(true);
    try {
      await onSave(newValue);
    } catch (err) {
      console.error("Failed to save:", err);
      e.target.textContent = value; // revert on failure
    } finally {
      setSaving(false);
    }
  }

  function handleKeyDown(e) {
    if (!multiline && e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  }

  return (
    <Tag
      ref={ref}
      className={`${className} outline-none rounded px-1 -mx-1 transition-colors ${
        saving ? "bg-gold/20" : "hover:bg-gold/10 focus:bg-gold/10"
      } cursor-text`}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      {value}
    </Tag>
  );
}