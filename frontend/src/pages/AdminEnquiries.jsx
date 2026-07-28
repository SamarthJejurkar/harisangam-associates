import { useEffect, useState } from "react";
import AdminShell from "../components/admin/AdminShell";
import { listEnquiries, markEnquiryRead, deleteEnquiry } from "../api/enquiries";

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all | unread

  useEffect(() => {
    loadEnquiries();
  }, []);

  function loadEnquiries() {
    setLoading(true);
    listEnquiries().then(setEnquiries).catch(console.error).finally(() => setLoading(false));
  }

  async function toggleRead(enquiry) {
    const updated = await markEnquiryRead(enquiry.id, !enquiry.read);
    setEnquiries((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  }

  async function handleDelete(enquiry) {
    if (!confirm(`Delete enquiry from ${enquiry.name}?`)) return;
    await deleteEnquiry(enquiry.id);
    setEnquiries((prev) => prev.filter((e) => e.id !== enquiry.id));
  }

  const visibleEnquiries = filter === "unread" ? enquiries.filter((e) => !e.read) : enquiries;
  const unreadCount = enquiries.filter((e) => !e.read).length;

  return (
    <AdminShell pageTitle="Enquiries">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-serif text-3xl text-charcoal">
            Enquiries {unreadCount > 0 && <span className="text-gold text-lg">({unreadCount} new)</span>}
          </h1>
          <div className="flex gap-6 text-xs tracking-[0.15em]">
            <button
              onClick={() => setFilter("all")}
              className={filter === "all" ? "text-charcoal border-b border-gold" : "text-charcoal/40"}
            >
              ALL
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={filter === "unread" ? "text-charcoal border-b border-gold" : "text-charcoal/40"}
            >
              UNREAD
            </button>
          </div>
        </div>

        {!loading && visibleEnquiries.length === 0 && (
          <p className="text-sm text-charcoal/50">No enquiries {filter === "unread" ? "unread" : "yet"}.</p>
        )}

        <div className="space-y-3">
          {visibleEnquiries.map((enquiry) => (
            <div
              key={enquiry.id}
              className={`border p-5 ${
                enquiry.read ? "border-charcoal/10 bg-white" : "border-gold/40 bg-gold/5"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-serif text-lg text-charcoal">
                    {enquiry.name}{" "}
                    {!enquiry.read && (
                      <span className="text-[10px] tracking-[0.1em] bg-gold text-cream px-2 py-0.5 rounded-full align-middle ml-2">
                        NEW
                      </span>
                    )}
                  </p>
                  <a href={`mailto:${enquiry.email}`} className="text-xs text-charcoal/50 hover:text-gold transition-colors">
                    {enquiry.email}
                  </a>
                  <p className="text-sm text-charcoal/70 mt-3 leading-relaxed">{enquiry.message}</p>
                  <p className="text-[10px] tracking-[0.1em] text-charcoal/30 mt-3">
                    {new Date(enquiry.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-col gap-2 shrink-0 text-xs tracking-[0.1em]">
                  <button
                    onClick={() => toggleRead(enquiry)}
                    className="text-charcoal/60 hover:text-charcoal transition-colors"
                  >
                    MARK {enquiry.read ? "UNREAD" : "READ"}
                  </button>
                  <button
                    onClick={() => handleDelete(enquiry)}
                    className="text-red-600/70 hover:text-red-600 transition-colors"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}