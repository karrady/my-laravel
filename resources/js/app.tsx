import "../css/app.css";

import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";

const Home = lazy(() => import("@/pages/home"));
const Diensten = lazy(() => import("@/pages/diensten"));
const AirportService = lazy(() => import("@/pages/airport-service"));
const OverOns = lazy(() => import("@/pages/over-ons"));
const Contact = lazy(() => import("@/pages/contact"));
const Reserveren = lazy(() => import("@/pages/reserveren"));

const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 1000 * 60 * 5, retry: 1 } },
});

function App() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center" />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/diensten" element={<Diensten />} />
                <Route path="/airport-service" element={<AirportService />} />
                <Route path="/over-ons" element={<OverOns />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/reserveren" element={<Reserveren />} />
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
