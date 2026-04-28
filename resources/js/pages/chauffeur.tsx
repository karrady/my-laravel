import { type FC, useCallback, useEffect, useRef, useState } from "react";
import { Car01, CheckCircle, Clock, MarkerPin01 } from "@untitledui/icons";

// ── Types ──────────────────────────────────────────────────────
interface Booking {
    id: number;
    booking_number: string;
    pickup_address: string;
    destination_address: string;
    pickup_at: string;
    distance_km: number | null;
    duration_min: number | null;
    customer_phone: string;
    passengers: number;
    vehicle_type: string;
    status: "pending" | "confirmed";
    is_quick_request: boolean;
    accept_deadline: string | null;
    driver_accepted_at: string | null;
    created_at: string;
}

// ── Helpers ────────────────────────────────────────────────────
function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("nl-NL", { weekday: "short", day: "numeric", month: "short" });
}

/** Geeft "X:XX" terug (MM:SS) of null als verlopen */
function useCountdown(deadlineIso: string | null) {
    const [secs, setSecs] = useState<number>(() => {
        if (!deadlineIso) return 0;
        return Math.max(0, Math.floor((new Date(deadlineIso).getTime() - Date.now()) / 1000));
    });

    useEffect(() => {
        if (!deadlineIso) return;
        const id = setInterval(() => {
            const remaining = Math.max(0, Math.floor((new Date(deadlineIso).getTime() - Date.now()) / 1000));
            setSecs(remaining);
        }, 1000);
        return () => clearInterval(id);
    }, [deadlineIso]);

    return secs;
}

// ── Countdown badge ────────────────────────────────────────────
const CountdownBadge: FC<{ deadline: string | null; accepted: boolean }> = ({ deadline, accepted }) => {
    const secs = useCountdown(deadline);

    if (accepted) {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold" style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}>
                <CheckCircle className="size-3.5" aria-hidden />
                Geaccepteerd
            </span>
        );
    }

    if (!deadline || secs === 0) {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold" style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444" }}>
                <Clock className="size-3.5" aria-hidden />
                Verlopen
            </span>
        );
    }

    const hours   = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    const display = hours > 0
        ? `${hours}u ${String(minutes).padStart(2, "0")}m`
        : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    const urgent = secs < 600; // < 10 min

    return (
        <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold font-mono"
            style={{
                background: urgent ? "rgba(251,191,36,0.15)" : "rgba(255,255,255,0.07)",
                color:      urgent ? "#fbbf24" : "#aaa",
            }}
        >
            <Clock className="size-3.5" aria-hidden />
            {display}
        </span>
    );
};

// ── Booking card ───────────────────────────────────────────────
interface BookingCardProps {
    booking: Booking;
    pin: string;
    onAccepted: (id: number) => void;
}

const BookingCard: FC<BookingCardProps> = ({ booking, pin, onAccepted }) => {
    const [loading, setLoading] = useState(false);

    const accept = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/v1/driver/bookings/${booking.id}/accept`, {
                method:  "POST",
                headers: { "X-Driver-Pin": pin, "Content-Type": "application/json" },
            });
            if (res.ok) onAccepted(booking.id);
        } finally {
            setLoading(false);
        }
    };

    const isAccepted = booking.status === "confirmed" || !!booking.driver_accepted_at;
    const bufferedMin = booking.duration_min ? Math.round(booking.duration_min * 1.2) : null;

    return (
        <div
            className="rounded-2xl border p-5 flex flex-col gap-4"
            style={{ background: "#141414", borderColor: isAccepted ? "rgba(34,197,94,0.3)" : "#262626" }}
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs font-mono" style={{ color: "#555" }}>{booking.booking_number}</p>
                    <p className="text-sm font-bold text-white mt-0.5">
                        {formatDate(booking.pickup_at)} &nbsp;·&nbsp;
                        <span style={{ color: "rgb(255,210,0)" }}>{formatTime(booking.pickup_at)}</span>
                    </p>
                </div>
                <CountdownBadge deadline={booking.accept_deadline} accepted={isAccepted} />
            </div>

            {/* Route */}
            <div className="flex flex-col gap-1.5">
                <div className="flex items-start gap-2 text-sm">
                    <MarkerPin01 className="size-4 mt-0.5 shrink-0" style={{ color: "rgb(255,210,0)" }} aria-hidden />
                    <span className="text-white leading-snug">{booking.pickup_address}</span>
                </div>
                <div className="ml-2 w-px h-3" style={{ background: "#333" }} />
                <div className="flex items-start gap-2 text-sm">
                    <MarkerPin01 className="size-4 mt-0.5 shrink-0" style={{ color: "#aaa" }} aria-hidden />
                    <span style={{ color: "#aaa" }} className="leading-snug">{booking.destination_address}</span>
                </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 text-xs" style={{ color: "#555" }}>
                {booking.distance_km && (
                    <span>
                        <span className="text-white font-semibold">{booking.distance_km} km</span>
                    </span>
                )}
                {bufferedMin && (
                    <span>
                        <span className="text-white font-semibold">
                            {booking.duration_min}–{bufferedMin} min
                        </span>{" "}
                        rijduur
                    </span>
                )}
                {booking.customer_phone && (
                    <a
                        href={`tel:${booking.customer_phone}`}
                        className="text-white font-semibold hover:underline"
                    >
                        {booking.customer_phone}
                    </a>
                )}
            </div>

            {/* Deadline toelichting */}
            {!isAccepted && booking.accept_deadline && (
                <p className="text-xs" style={{ color: "#555" }}>
                    Accepteer voor{" "}
                    <span className="text-white">
                        {formatTime(booking.accept_deadline)}
                    </span>
                    {" "}({formatDate(booking.accept_deadline)}) — 2 uur vóór rit
                </p>
            )}

            {/* Accepteer-knop */}
            {!isAccepted && (
                <button
                    onClick={accept}
                    disabled={loading}
                    className="w-full rounded-xl py-2.5 text-sm font-bold transition duration-100 hover:brightness-90 active:scale-[0.98] disabled:opacity-50"
                    style={{ background: "rgb(255,210,0)", color: "#0E0E0E" }}
                >
                    {loading ? "Accepteren…" : "Rit accepteren"}
                </button>
            )}
        </div>
    );
};

// ── PIN-login scherm ───────────────────────────────────────────
interface PinLoginProps { onLogin: (pin: string) => void }

const PinLogin: FC<PinLoginProps> = ({ onLogin }) => {
    const [pin, setPin] = useState("");
    const [error, setError] = useState(false);

    const submit = async () => {
        // Test de PIN met een echte API-call
        const res = await fetch("/api/v1/driver/bookings", {
            headers: { "X-Driver-Pin": pin },
        });
        if (res.ok) {
            localStorage.setItem("driver_pin", pin);
            onLogin(pin);
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "#0E0E0E" }}>
            <div className="w-full max-w-sm rounded-2xl border p-8 flex flex-col items-center gap-6" style={{ background: "#141414", borderColor: "#262626" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(255,210,0,0.1)" }}>
                    <Car01 className="size-7" style={{ color: "rgb(255,210,0)" }} />
                </div>
                <div className="text-center">
                    <h1 className="text-lg font-bold text-white">YAS Chauffeursdashboard</h1>
                    <p className="text-sm mt-1" style={{ color: "#666" }}>Voer uw pincode in</p>
                </div>
                <div className="w-full flex flex-col gap-3">
                    <input
                        type="password"
                        value={pin}
                        placeholder="Pincode"
                        onChange={(e) => setPin(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && submit()}
                        className="w-full rounded-xl border px-4 py-3 text-center text-lg font-mono text-white outline-none [color-scheme:dark]"
                        style={{ background: "#0E0E0E", borderColor: error ? "#ef4444" : "#333" }}
                    />
                    {error && <p className="text-xs text-center" style={{ color: "#ef4444" }}>Onjuiste pincode</p>}
                    <button
                        onClick={submit}
                        className="w-full rounded-xl py-3 font-bold text-sm transition hover:brightness-90"
                        style={{ background: "rgb(255,210,0)", color: "#0E0E0E" }}
                    >
                        Inloggen
                    </button>
                </div>
            </div>
        </div>
    );
};

// ── Hoofd-pagina ───────────────────────────────────────────────
const Chauffeur: FC = () => {
    const [pin,      setPin]      = useState<string | null>(() => localStorage.getItem("driver_pin"));
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading,  setLoading]  = useState(false);
    const [lastFetch, setLastFetch] = useState<Date | null>(null);

    const fetchBookings = useCallback(async (currentPin: string) => {
        setLoading(true);
        try {
            const res = await fetch("/api/v1/driver/bookings", {
                headers: { "X-Driver-Pin": currentPin },
            });
            if (res.status === 401) {
                localStorage.removeItem("driver_pin");
                setPin(null);
                return;
            }
            const data = await res.json();
            setBookings(Array.isArray(data) ? data : []);
            setLastFetch(new Date());
        } finally {
            setLoading(false);
        }
    }, []);

    // Poll elke 30 seconden
    const pinRef = useRef(pin);
    pinRef.current = pin;

    useEffect(() => {
        if (!pin) return;
        fetchBookings(pin);
        const id = setInterval(() => {
            if (pinRef.current) fetchBookings(pinRef.current);
        }, 30_000);
        return () => clearInterval(id);
    }, [pin, fetchBookings]);

    const handleAccepted = (id: number) => {
        setBookings((prev) =>
            prev.map((b) => b.id === id ? { ...b, status: "confirmed", driver_accepted_at: new Date().toISOString() } : b),
        );
    };

    if (!pin) return <PinLogin onLogin={setPin} />;

    const pending   = bookings.filter((b) => b.status === "pending");
    const confirmed = bookings.filter((b) => b.status === "confirmed");

    return (
        <div className="min-h-screen" style={{ background: "#0E0E0E", fontFamily: "Montserrat, sans-serif" }}>
            {/* Header */}
            <div className="border-b px-5 py-4 flex items-center justify-between" style={{ borderColor: "#1a1a1a" }}>
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,210,0,0.1)" }}>
                        <Car01 className="size-5" style={{ color: "rgb(255,210,0)" }} />
                    </div>
                    <span className="font-bold text-white">Chauffeursdashboard</span>
                </div>
                <div className="flex items-center gap-3">
                    {lastFetch && (
                        <span className="text-xs hidden sm:block" style={{ color: "#444" }}>
                            Bijgewerkt {lastFetch.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                    )}
                    <button
                        onClick={() => pin && fetchBookings(pin)}
                        disabled={loading}
                        className="rounded-lg border px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/5 disabled:opacity-50"
                        style={{ borderColor: "#2a2a2a" }}
                    >
                        {loading ? "…" : "Vernieuwen"}
                    </button>
                    <button
                        onClick={() => { localStorage.removeItem("driver_pin"); setPin(null); }}
                        className="rounded-lg border px-3 py-1.5 text-xs font-medium transition hover:bg-white/5"
                        style={{ borderColor: "#2a2a2a", color: "#555" }}
                    >
                        Uitloggen
                    </button>
                </div>
            </div>

            <div className="mx-auto max-w-2xl px-5 py-8 space-y-10">
                {/* Openstaande ritten */}
                <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: "rgb(255,210,0)" }}>
                        <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ background: "rgb(255,210,0)" }} />
                        Openstaand ({pending.length})
                    </h2>
                    {pending.length === 0 ? (
                        <p className="text-sm py-8 text-center rounded-2xl border" style={{ color: "#444", borderColor: "#1a1a1a" }}>
                            Geen openstaande ritten
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {pending.map((b) => (
                                <BookingCard key={b.id} booking={b} pin={pin} onAccepted={handleAccepted} />
                            ))}
                        </div>
                    )}
                </section>

                {/* Geaccepteerde ritten */}
                {confirmed.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#555" }}>
                            Geaccepteerd ({confirmed.length})
                        </h2>
                        <div className="space-y-4">
                            {confirmed.map((b) => (
                                <BookingCard key={b.id} booking={b} pin={pin} onAccepted={handleAccepted} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Chauffeur;
