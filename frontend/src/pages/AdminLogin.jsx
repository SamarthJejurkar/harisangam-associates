import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      navigate("/admin/home");
    } catch (err) {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-sm mx-auto px-6 pt-24 pb-24">
      <h1 className="font-serif text-3xl text-charcoal mb-8">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          disabled={loading}
          className="text-xs tracking-[0.15em] border-b border-charcoal/30 hover:border-charcoal transition-colors pb-1 disabled:opacity-50"
        >
          {loading ? "LOGGING IN..." : "LOG IN →"}
        </button>
      </form>
    </section>
  );
}