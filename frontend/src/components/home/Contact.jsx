import { useState } from "react";
import { useSection } from "../../hooks/useSection";
import { useEditableSection } from "../../hooks/useEditableSection";
import { useAdminMode } from "../../context/AdminModeContext";
import EditableText from "../admin/EditableText";
import { submitEnquiry } from "../../api/enquiries";

export default function Contact() {
  const { isEditing } = useAdminMode();
  const editable = useEditableSection("contact");
  const readOnly = useSection("contact");

  const contactData = isEditing ? editable.data : readOnly.data;
  const loading = isEditing ? editable.loading : readOnly.loading;

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  if (loading || !contactData) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitEnquiry(form);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 md:px-12 py-20">
      <span className="text-xs tracking-[0.2em] text-gold">
        <EditableText as="span" value={contactData.eyebrow} onSave={(v) => editable.saveField("eyebrow", v)} />
      </span>

      <h2 className="font-serif text-3xl md:text-4xl mt-4 text-charcoal">
        <EditableText as="span" value={contactData.headline} onSave={(v) => editable.saveField("headline", v)} />{" "}
        <EditableText as="span" className="italic" value={contactData.headline_accent} onSave={(v) => editable.saveField("headline_accent", v)} />
      </h2>

      <div className="grid md:grid-cols-2 gap-12 mt-12">
        <div className="space-y-4 text-sm text-charcoal/70">
          <p><EditableText as="span" value={contactData.email} onSave={(v) => editable.saveField("email", v)} /></p>
          <p><EditableText as="span" value={contactData.phone} onSave={(v) => editable.saveField("phone", v)} /></p>
          <p><EditableText as="span" value={contactData.address} onSave={(v) => editable.saveField("address", v)} /></p>
        </div>

        {status === "sent" ? (
          <div className="flex items-center">
            <p className="text-sm text-charcoal/70">
              Thank you — your message has been received. We'll be in touch soon.
            </p>
          </div>
          
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border-b border-charcoal/20 bg-transparent py-2 text-sm outline-none focus:border-gold transition-colors"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border-b border-charcoal/20 bg-transparent py-2 text-sm outline-none focus:border-gold transition-colors"
            />
            <textarea
              placeholder="Your Message"
              rows={3}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border-b border-charcoal/20 bg-transparent py-2 text-sm outline-none focus:border-gold transition-colors resize-none"
            />
            {status === "error" && (
              <p className="text-xs text-red-600">Something went wrong. Please try again.</p>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="text-xs tracking-[0.15em] border-b border-charcoal/30 hover:border-charcoal transition-colors pb-1 disabled:opacity-50"
            >
              {status === "sending" ? "SENDING..." : "SEND MESSAGE →"}
            </button>
          </form>
          
        )
        }
      </div>
    </section>
  );
}