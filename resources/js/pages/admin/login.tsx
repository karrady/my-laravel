import { useState } from "react";
import { useNavigate } from "react-router";
import { useAdminAuthStore } from "@/stores/admin-auth-store";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAdminAuthStore();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Inloggen mislukt.");
        return;
      }

      setAuth(data.token, data.user);
      navigate("/admin/dashboard");
    } catch {
      setError("Verbindingsfout. Probeer opnieuw.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="mx-auto size-12 rounded-2xl bg-brand-solid flex items-center justify-center mb-4">
            <span className="text-white font-bold text-xl">Y</span>
          </div>
          <h1 className="text-xl font-semibold text-primary">YAS Admin</h1>
          <p className="text-sm text-tertiary mt-1">Inloggen bij het beheerpaneel</p>
        </div>

        {/* Form */}
        <div className="bg-primary rounded-2xl border border-secondary shadow-sm p-6 space-y-4">
          {error && (
            <div className="bg-error-primary border border-error_subtle rounded-lg px-4 py-3 text-sm text-error-primary">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1.5">
                E-mailadres
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-3.5 py-2.5 rounded-lg border border-primary text-sm text-primary bg-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition duration-100"
                placeholder="admin@yastaxicentrale.nl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1.5">
                Wachtwoord
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-3.5 py-2.5 rounded-lg border border-primary text-sm text-primary bg-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition duration-100"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-brand-solid hover:bg-brand-solid_hover text-white font-semibold text-sm rounded-lg transition duration-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Inloggen…" : "Inloggen"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
