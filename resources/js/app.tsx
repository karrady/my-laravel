import "../css/app.css";

import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Navigate, Outlet } from "react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { useAdminAuthStore } from "@/stores/admin-auth-store";

const Home = lazy(() => import("@/pages/home"));
const Diensten = lazy(() => import("@/pages/diensten"));
const AirportService = lazy(() => import("@/pages/airport-service"));
const OverOns = lazy(() => import("@/pages/over-ons"));
const Contact = lazy(() => import("@/pages/contact"));
const Reserveren = lazy(() => import("@/pages/reserveren"));
const Chauffeur = lazy(() => import("@/pages/chauffeur"));

// Admin
const AdminLogin = lazy(() => import("@/pages/admin/login"));
const AdminLayout = lazy(() => import("@/pages/admin/layout"));
const AdminDashboard = lazy(() => import("@/pages/admin/dashboard"));
const AdminBoekingen = lazy(() => import("@/pages/admin/boekingen"));
const AdminBoeking = lazy(() => import("@/pages/admin/boeking-detail"));
const AdminKlanten = lazy(() => import("@/pages/admin/klanten"));
const AdminCmsVoertuigen = lazy(() => import("@/pages/admin/cms-voertuigen"));
const AdminCmsFaqs = lazy(() => import("@/pages/admin/cms-faqs"));
const AdminCmsReviews = lazy(() => import("@/pages/admin/cms-reviews"));
const AdminCmsDiensten = lazy(() => import("@/pages/admin/cms-diensten"));

function AdminGuard() {
    const isAuthenticated = useAdminAuthStore((s) => s.isAuthenticated)();
    return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
}

const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 1000 * 60 * 5, retry: 1 } },
});

function App() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center" />}>
            <Routes>
                {/* Publieke website */}
                <Route path="/" element={<Home />} />
                <Route path="/diensten" element={<Diensten />} />
                <Route path="/airport-service" element={<AirportService />} />
                <Route path="/over-ons" element={<OverOns />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/reserveren" element={<Reserveren />} />
                <Route path="/chauffeur" element={<Chauffeur />} />

                {/* Admin */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route element={<AdminGuard />}>
                    <Route element={<AdminLayout />}>
                        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        <Route path="/admin/boekingen" element={<AdminBoekingen />} />
                        <Route path="/admin/boekingen/:id" element={<AdminBoeking />} />
                        <Route path="/admin/klanten" element={<AdminKlanten />} />
                        <Route path="/admin/cms/voertuigen" element={<AdminCmsVoertuigen />} />
                        <Route path="/admin/cms/faqs" element={<AdminCmsFaqs />} />
                        <Route path="/admin/cms/reviews" element={<AdminCmsReviews />} />
                        <Route path="/admin/cms/diensten" element={<AdminCmsDiensten />} />
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    );
}

const rootEl = document.getElementById("root");
if (rootEl) {
    createRoot(rootEl).render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </QueryClientProvider>
        </StrictMode>,
    );
}
