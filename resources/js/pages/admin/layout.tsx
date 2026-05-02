import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import {
  Car01,
  ChevronLeft,
  ChevronRight,
  CurrencyEuroCircle,
  HelpCircle,
  Home02,
  LogOut01,
  MarkerPin01,
  MessageSquare02,
  Star01,
  Receipt,
  Users01,
} from "@untitledui/icons";
import type { FC, SVGProps } from "react";
import { useAdminAuthStore } from "@/stores/admin-auth-store";
import { adminApi } from "@/utils/admin-api";
import { cx } from "@/utils/cx";

type NavItem =
  | { header: true; label: string }
  | { header?: false; to: string; label: string; icon: FC<SVGProps<SVGSVGElement>> };

const nav: NavItem[] = [
  { to: "/admin/dashboard", label: "Dashboard", icon: Home02 },
  { to: "/admin/boekingen", label: "Boekingen", icon: Receipt },
  { to: "/admin/klanten", label: "Klanten", icon: Users01 },
  { to: "/admin/contact-berichten", label: "Contactberichten", icon: MessageSquare02 },
  { header: true, label: "CMS" },
  { to: "/admin/cms/voertuigen", label: "Voertuigen", icon: Car01 },
  { to: "/admin/cms/tarieven", label: "Tarieven", icon: CurrencyEuroCircle },
  { to: "/admin/cms/faqs", label: "FAQ's", icon: HelpCircle },
  { to: "/admin/cms/reviews", label: "Reviews", icon: Star01 },
  { to: "/admin/cms/service-areas", label: "Servicegebieden", icon: MarkerPin01 },
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
    <div className="flex h-screen overflow-hidden bg-secondary">
      {/* Sidebar */}
      <aside
        className={cx(
          "flex flex-col border-r border-secondary bg-primary transition-all duration-200",
          sidebarOpen ? "w-60" : "w-16",
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-secondary px-4 py-5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-solid">
            <span className="text-sm font-bold text-white">Y</span>
          </div>
          {sidebarOpen && (
            <div>
              <p className="text-sm leading-none font-semibold text-primary">YAS Admin</p>
              <p className="mt-0.5 text-xs text-tertiary">TaxiCentrale</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-3">
          {nav.map((item, i) => {
            if (item.header) {
              return sidebarOpen ? (
                <p key={i} className="px-2 pt-4 pb-1 text-xs font-semibold tracking-wider text-quaternary uppercase">
                  {item.label}
                </p>
              ) : <hr key={i} className="my-2 border-secondary" />;
            }
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cx(
                    "flex items-center gap-3 rounded-lg px-2 py-2 text-sm transition duration-100 ease-linear",
                    isActive
                      ? "bg-active font-medium text-primary"
                      : "text-tertiary hover:bg-primary_hover hover:text-primary",
                  )
                }
              >
                <Icon aria-hidden="true" className="size-5 shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* User + collapse */}
        <div className="space-y-1 border-t border-secondary p-2">
          {sidebarOpen && user && (
            <div className="px-2 py-1.5">
              <p className="truncate text-xs font-medium text-primary">{user.name}</p>
              <p className="truncate text-xs text-tertiary">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm text-tertiary transition duration-100 ease-linear hover:bg-primary_hover hover:text-primary"
          >
            <LogOut01 aria-hidden="true" className="size-5 shrink-0" />
            {sidebarOpen && <span>Uitloggen</span>}
          </button>
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm text-tertiary transition duration-100 ease-linear hover:bg-primary_hover"
          >
            {sidebarOpen ? (
              <ChevronLeft aria-hidden="true" className="size-5 shrink-0" />
            ) : (
              <ChevronRight aria-hidden="true" className="size-5 shrink-0" />
            )}
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
