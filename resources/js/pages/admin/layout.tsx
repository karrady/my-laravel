import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { useAdminAuthStore } from "@/stores/admin-auth-store";
import { adminApi } from "@/utils/admin-api";
import { cx } from "@/utils/cx";

const nav = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "🏠" },
  { to: "/admin/boekingen", label: "Boekingen", icon: "🚖" },
  { to: "/admin/klanten", label: "Klanten", icon: "👥" },
  { label: "CMS", icon: null, header: true },
  { to: "/admin/cms/voertuigen", label: "Voertuigen", icon: "🚗" },
  { to: "/admin/cms/faqs", label: "FAQ's", icon: "❓" },
  { to: "/admin/cms/reviews", label: "Reviews", icon: "⭐" },
  { to: "/admin/cms/diensten", label: "Servicegebieden", icon: "📍" },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, clearAuth } = useAdminAuthStore();
  const navigate = useNavigate();

  async function handleLogout() {
    try { await adminApi.post("/logout"); } catch {}
    clearAuth();
    navigate("/admin/login");
  }

  return (
    <div className="flex h-screen bg-secondary overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cx(
          "flex flex-col bg-primary border-r border-secondary transition-all duration-200",
          sidebarOpen ? "w-60" : "w-16",
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-secondary">
          <div className="flex-shrink-0 size-8 rounded-lg bg-brand-solid flex items-center justify-center">
            <span className="text-white font-bold text-sm">Y</span>
          </div>
          {sidebarOpen && (
            <div>
              <p className="text-sm font-semibold text-primary leading-none">YAS Admin</p>
              <p className="text-xs text-tertiary mt-0.5">TaxiCentrale</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {nav.map((item, i) => {
            if (item.header) {
              return sidebarOpen ? (
                <p key={i} className="px-2 pt-4 pb-1 text-xs font-semibold text-quaternary uppercase tracking-wider">
                  {item.label}
                </p>
              ) : <hr key={i} className="my-2 border-secondary" />;
            }
            return (
              <NavLink
                key={item.to}
                to={item.to!}
                className={({ isActive }) =>
                  cx(
                    "flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition duration-100",
                    isActive
                      ? "bg-active text-primary font-medium"
                      : "text-tertiary hover:bg-primary_hover hover:text-primary",
                  )
                }
              >
                <span className="text-base">{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* User + collapse */}
        <div className="border-t border-secondary p-2 space-y-1">
          {sidebarOpen && user && (
            <div className="px-2 py-1.5">
              <p className="text-xs font-medium text-primary truncate">{user.name}</p>
              <p className="text-xs text-tertiary truncate">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm text-tertiary hover:bg-primary_hover hover:text-primary transition duration-100"
          >
            <span>🚪</span>
            {sidebarOpen && <span>Uitloggen</span>}
          </button>
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm text-tertiary hover:bg-primary_hover transition duration-100"
          >
            <span>{sidebarOpen ? "◀" : "▶"}</span>
            {sidebarOpen && <span>Inklappen</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
