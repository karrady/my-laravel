import { type FC, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Calendar, CheckCircle, Clock, Phone01 } from "@untitledui/icons";
import { AddressAutocomplete } from "@/components/address-autocomplete";
import { RouteMap, type RouteInfo } from "@/components/route-map";
import { YasHeader } from "@/components/yas-layout";

const YELLOW = "rgb(255, 210, 0)";
const DARK   = "#0E0E0E";
const CARD   = "#141414";
const LINE   = "#262626";
const WHATSAPP_NUMBER = "31852128302";

interface LatLng { lat: number; lng: number }

// ── Route-info banner (toont afstand + reistijd na berekening) ─
interface RouteInfoBarProps { info: RouteInfo }

const RouteInfoBar: FC<RouteInfoBarProps> = ({ info }) => {
    // +20% buffer voor verkeersdrukte
    const bufferedMin = Math.round(info.duration_min * 1.2);

    return (
        <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 rounded-xl border px-4 py-3 text-xs mt-3"
            style={{ background: "#0E0E0E", borderColor: "#2a2a2a" }}
        >
            {/* Afstand */}
            <div className="flex items-center gap-1.5">
                <span style={{ color: "#555" }}>Afstand</span>
                <span className="font-bold text-white">{info.distance_km} km</span>
            </div>

            <span style={{ color: "#333" }}>·</span>

            {/* Reistijd */}
            <div className="flex items-center gap-1.5">
                <span style={{ color: "#555" }}>Reistijd</span>
                <span className="font-bold text-white">
                    {info.duration_min}–{bufferedMin} min
                </span>
            </div>

            <span style={{ color: "#333" }}>·</span>

            {/* Verkeersdrukte melding */}
            <span style={{ color: "#666" }}>
                afhankelijk van verkeer
            </span>
        </motion.div>
    );
};

// ── Boekingsformulier ─────────────────────────────────────────
interface BookingFormProps {
    onOriginChange:      (addr: string, ll: LatLng | null) => void;
    onDestinationChange: (addr: string, ll: LatLng | null) => void;
    routeInfo:           RouteInfo | null;
    pickupAddress:       string;
    destinationAddress:  string;
    pickupLat:           number | null;
    pickupLng:           number | null;
    destinationLat:      number | null;
    destinationLng:      number | null;
}

const BookingForm: FC<BookingFormProps> = ({
    onOriginChange,
    onDestinationChange,
    routeInfo,
    pickupAddress,
    destinationAddress,
    pickupLat,
    pickupLng,
    destinationLat,
    destinationLng,
}) => {
    const [datum,  setDatum]  = useState("");
    const [tijd,   setTijd]   = useState("");
    const [phone,  setPhone]  = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
    const [bookingNumber, setBookingNumber] = useState("");

    const canSubmit = pickupAddress.trim() && destinationAddress.trim() && datum && tijd;

    const handleSubmit = async () => {
        if (!canSubmit || status === "loading") return;
        setStatus("loading");

        const pickupAt = `${datum}T${tijd}:00`;

        try {
            // 1. Maak rit aan in backend
            const res = await fetch("/api/v1/quick-requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    pickup_address:      pickupAddress,
                    pickup_lat:          pickupLat,
                    pickup_lng:          pickupLng,
                    destination_address: destinationAddress,
                    destination_lat:     destinationLat,
                    destination_lng:     destinationLng,
                    pickup_at:           pickupAt,
                    customer_phone:      phone,
                    distance_km:         routeInfo?.distance_km ?? null,
                    duration_min:        routeInfo?.duration_min ?? null,
                }),
            });

            if (!res.ok) throw new Error("API fout");

            const data = await res.json();
            setBookingNumber(data.booking_number);
            setStatus("done");

            // 2. Open WhatsApp met vooraf ingevulde tekst
            const bufferedMin = routeInfo ? Math.round(routeInfo.duration_min * 1.2) : "?";
            const message = [
                `🚕 *Ritaanvraag YAS TaxiCentrale*`,
                ``,
                `📍 *Van:* ${pickupAddress}`,
                `🏁 *Naar:* ${destinationAddress}`,
                `📅 *Datum:* ${datum}`,
                `🕐 *Tijd:* ${tijd}`,
                routeInfo ? `📏 *Afstand:* ${routeInfo.distance_km} km` : "",
                routeInfo ? `⏱️ *Reistijd:* ${routeInfo.duration_min}–${bufferedMin} min (excl. verkeer)` : "",
                phone ? `📞 *Mijn nummer:* ${phone}` : "",
                ``,
                `Boekingsnr: *${data.booking_number}*`,
            ].filter(Boolean).join("\n");

            const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
            window.open(waUrl, "_blank", "noopener,noreferrer");

        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    if (status === "done") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-5 rounded-2xl border flex flex-col items-center text-center gap-3 py-8 px-6"
                style={{ background: CARD, borderColor: LINE }}
            >
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(34,197,94,0.15)" }}>
                    <CheckCircle className="size-6" style={{ color: "#22c55e" }} />
                </div>
                <p className="font-bold text-white text-sm">Aanvraag verstuurd!</p>
                <p className="text-xs" style={{ color: "#666" }}>
                    Boekingsnr <span className="text-white font-mono">{bookingNumber}</span><br />
                    WhatsApp is geopend. Wij bevestigen zo snel mogelijk.
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.55 }}
            className="mt-5 rounded-2xl border"
            style={{ background: CARD, borderColor: LINE, padding: "18px 20px" }}
        >
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: YELLOW }}>
                Rit aanvragen
            </p>

            {/* Van / Naar */}
            <div className="flex flex-col gap-2.5 mb-3">
                <AddressAutocomplete
                    dark
                    label="Ophaaladres"
                    placeholder="Adres, stad of luchthaven…"
                    value={pickupAddress}
                    onChange={(addr, lat, lng) =>
                        onOriginChange(addr, lat && lng ? { lat, lng } : null)
                    }
                />
                <AddressAutocomplete
                    dark
                    label="Bestemming"
                    placeholder="Bestemming…"
                    value={destinationAddress}
                    onChange={(addr, lat, lng) =>
                        onDestinationChange(addr, lat && lng ? { lat, lng } : null)
                    }
                />
            </div>

            {/* Datum + Tijd + Telefoon */}
            <div className="grid grid-cols-2 gap-2.5 mb-2.5">
                <label className="flex flex-col gap-1">
                    <span className="text-xs font-medium" style={{ color: "#666" }}>Datum</span>
                    <div className="flex items-center gap-2 rounded-lg border px-3 py-2" style={{ background: DARK, borderColor: "#333" }}>
                        <Calendar className="size-3.5 shrink-0" style={{ color: "#555" }} aria-hidden="true" />
                        <input
                            type="date"
                            value={datum}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => setDatum(e.target.value)}
                            className="flex-1 bg-transparent text-xs text-white outline-none [color-scheme:dark]"
                        />
                    </div>
                </label>
                <label className="flex flex-col gap-1">
                    <span className="text-xs font-medium" style={{ color: "#666" }}>Tijd</span>
                    <div className="flex items-center gap-2 rounded-lg border px-3 py-2" style={{ background: DARK, borderColor: "#333" }}>
                        <Clock className="size-3.5 shrink-0" style={{ color: "#555" }} aria-hidden="true" />
                        <input
                            type="time"
                            value={tijd}
                            onChange={(e) => setTijd(e.target.value)}
                            className="flex-1 bg-transparent text-xs text-white outline-none [color-scheme:dark]"
                        />
                    </div>
                </label>
            </div>

            <label className="flex flex-col gap-1 mb-4">
                <span className="text-xs font-medium" style={{ color: "#666" }}>
                    Telefoonnummer <span style={{ color: "#444" }}>(optioneel)</span>
                </span>
                <div className="flex items-center gap-2 rounded-lg border px-3 py-2" style={{ background: DARK, borderColor: "#333" }}>
                    <Phone01 className="size-3.5 shrink-0" style={{ color: "#555" }} aria-hidden="true" />
                    <input
                        type="tel"
                        value={phone}
                        placeholder="06 12 34 56 78"
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1 bg-transparent text-xs text-white placeholder:text-neutral-600 outline-none"
                    />
                </div>
            </label>

            {/* CTA */}
            <button
                onClick={handleSubmit}
                disabled={!canSubmit || status === "loading"}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold tracking-wide transition duration-100 hover:brightness-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: YELLOW, color: DARK }}
            >
                {status === "loading" ? (
                    <span className="flex items-center gap-2">
                        <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent inline-block" />
                        Aanvraag versturen…
                    </span>
                ) : (
                    <>
                        Rit aanvragen via WhatsApp
                        <ArrowRight className="size-4" aria-hidden="true" />
                    </>
                )}
            </button>
            {status === "error" && (
                <p className="text-xs text-center mt-2" style={{ color: "#f87171" }}>
                    Er ging iets mis. Probeer opnieuw of bel ons.
                </p>
            )}
        </motion.div>
    );
};

// ── Vertrouwensbadges ─────────────────────────────────────────
const TrustBadges: FC = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex flex-wrap gap-x-4 gap-y-2 mt-4"
    >
        {[
            { icon: CheckCircle, label: "Vaste prijs" },
            { icon: Clock,       label: "24/7 beschikbaar" },
        ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-xs" style={{ color: "#777" }}>
                <Icon className="size-3.5 shrink-0" style={{ color: YELLOW }} aria-hidden="true" />
                {label}
            </div>
        ))}
    </motion.div>
);

// ── Hoofd-export ──────────────────────────────────────────────
export const YasHero: FC = () => {
    const [origin,             setOrigin]             = useState<LatLng | null>(null);
    const [destination,        setDestination]        = useState<LatLng | null>(null);
    const [pickupAddress,      setPickupAddress]      = useState("");
    const [destinationAddress, setDestinationAddress] = useState("");
    const [routeInfo,          setRouteInfo]          = useState<RouteInfo | null>(null);

    const handleOriginChange = (addr: string, ll: LatLng | null) => {
        setPickupAddress(addr);
        setOrigin(ll);
        if (!ll) setRouteInfo(null);
    };

    const handleDestinationChange = (addr: string, ll: LatLng | null) => {
        setDestinationAddress(addr);
        setDestination(ll);
        if (!ll) setRouteInfo(null);
    };

    return (
        <section
            className="relative flex min-h-svh flex-col overflow-hidden"
            style={{ background: DARK }}
        >
            {/* Stippelraster */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(255,210,0,0.065) 1px, transparent 1px)`,
                    backgroundSize: "36px 36px",
                }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full blur-3xl"
                style={{ background: YELLOW, opacity: 0.055 }}
            />

            {/* Navigatie — staat boven hero-content zodat het mobiele menu nooit doorschijnt */}
            <div className="relative z-30 w-full">
                <YasHeader dark />
            </div>

            {/* Content — vult resterende viewport */}
            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-5 pt-6 pb-[calc(1.5rem+72px+env(safe-area-inset-bottom))] md:px-10 md:pb-6">
                <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8 xl:gap-12">

                    {/* Links: tekst + formulier */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <motion.span
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45 }}
                            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4 w-fit"
                            style={{ borderColor: "#2a2a2a", color: YELLOW, background: "rgba(255,210,0,0.07)" }}
                        >
                            <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: YELLOW }} />
                            🚕 Vertrouwd vervoer dag en nacht
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.12, duration: 0.55 }}
                            className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl xl:text-5xl"
                        >
                            Snel van{" "}
                            <span style={{ color: YELLOW }}>A</span>
                            {" "}naar{" "}
                            <span style={{ color: YELLOW }}>B</span>
                            {" "}altijd op tijd.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.25, duration: 0.55 }}
                            className="mt-2 text-sm leading-relaxed sm:text-base"
                            style={{ color: "#777" }}
                        >
                            Betrouwbaar taxivervoer in de regio Rijn en Gouwe.
                            Vaste prijs, professionele chauffeurs en altijd op tijd.
                        </motion.p>

                        <TrustBadges />

                        {/* Route-info (zichtbaar zodra route berekend) */}
                        {routeInfo && <RouteInfoBar info={routeInfo} />}

                        <BookingForm
                            onOriginChange={handleOriginChange}
                            onDestinationChange={handleDestinationChange}
                            routeInfo={routeInfo}
                            pickupAddress={pickupAddress}
                            destinationAddress={destinationAddress}
                            pickupLat={origin?.lat ?? null}
                            pickupLng={origin?.lng ?? null}
                            destinationLat={destination?.lat ?? null}
                            destinationLng={destination?.lng ?? null}
                        />
                    </div>

                    {/* Rechts: live routekaart */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="hidden lg:block shrink-0 rounded-2xl overflow-hidden border"
                        style={{ width: 480, borderColor: LINE }}
                    >
                        <RouteMap
                            origin={origin}
                            destination={destination}
                            onRouteCalculated={setRouteInfo}
                            onRouteClear={() => setRouteInfo(null)}
                            className="w-full h-full"
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
