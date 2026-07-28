import { useEffect, useState } from "react";
import AdminShell from "../components/admin/AdminShell";
import { listAdmins, createAdmin, deleteAdmin } from "../api/admins";

export default function AdminTeam() {
  const [admins, setAdmins] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  function loadAdmins() {
    listAdmins().then(setAdmins).catch(console.error).finally(() => setLoading(false));
  }

  useEffect(() => {
    loadAdmins();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    setError("");
    try {
      await createAdmin(username, password);
      setUsername("");
      setPassword("");
      loadAdmins();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to add admin");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Remove this admin's access?")) return;
    await deleteAdmin(id);
    loadAdmins();
  }

  return (
    <AdminShell pageTitle="Manage Team">
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-20">
        <h1 className="font-serif text-3xl text-charcoal mb-8">Team Members</h1>

        {!loading && (
          <ul className="space-y-3 mb-12">
            {admins.map((a) => (
              <li
                key={a.id}
                className="flex items-center justify-between border-b border-charcoal/10 pb-3 text-sm"
              >
                <div>
                  <span className="text-charcoal">{a.username}</span>
                  <span className="ml-3 text-xs tracking-[0.1em] text-charcoal/40">
                    {a.role.toUpperCase()}
                  </span>
                </div>
                {a.role !== "owner" && (
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="text-xs tracking-[0.1em] text-red-600/70 hover:text-red-600 transition-colors"
                  >
                    REMOVE
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}

        <h2 className="font-serif text-xl text-charcoal mb-4">Add Team Member</h2>
        <form onSubmit={handleAdd} className="flex flex-col gap-4 max-w-sm">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border-b border-charcoal/20 bg-transparent py-2 text-sm outline-none focus:border-gold transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b border-charcoal/20 bg-transparent py-2 text-sm outline-none focus:border-gold transition-colors"
          />
          {error && <p className="text-xs text-red-600">{error}</p>}
          <button
            type="submit"
            className="text-xs tracking-[0.15em] border-b border-charcoal/30 hover:border-charcoal transition-colors pb-1 self-start"
          >
            ADD MEMBER →
          </button>
        </form>
      </div>
    </AdminShell>
  );
}