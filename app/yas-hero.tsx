import { type FC, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Calendar, Car01, CheckCircle, Clock, MarkerPin01, Phone01, Star01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

// ---------- brand tokens (hardcoded zo ze niet afhangen van CSS vars in SVG) ----------
const YELLOW = "rgb(255, 210, 0)";
const DARK = "#0E0E0E";
const CARD_BG = "#141414";
const BORDER = "#262626";

// ---------- SVG taxi car ----------
const TaxiCar: FC<{ width?: number }> = ({ width = 36 }) => {
    const h = Math.round(width * 0.5);
    return (
        <svg width={width} height={h} viewBox="0 0 36 18" fill="none" aria-hidden="true">
            <rect x="0" y="6" width="36" height="10" rx="2" fill={YELLOW} />
            <rect x="7" y="1" width="19" height="8" rx="2" fill={YELLOW} />
            <rect x="8" y="1.5" width="7" height="6" rx="1" fill="rgba(14,14,14,0.35)" />
            <rect x="18" y="1.5" width="7" height="6" rx="1" fill="rgba(14,14,14,0.35)" />
            <circle cx="8" cy="16" r="2.5" fill={DARK} />
            <circle cx="28" cy="16" r="2.5" fill={DARK} />
            <text x="18" y="13.5" textAnchor="middle" fill={DARK} fontSize="4.5" fontWeight="700" fontFamily="sans-serif">
                TAXI
            </text>
        </svg>
    );
};

// ---------- animatiepad (van linksonder naar rechtsboven) ----------
const PATH_D = "M 55 270 C 90 230 140 180 185 145 C 230 110 270 80 315 55";

// ---------- Radar + rijanimatie ----------
const TaxiRouteAnimation: FC = () => {
    return (
        <div className="relative w-full" style={{ height: 380 }}>
            <svg viewBox="0 0 370 310" className="w-full h-full" aria-hidden="true">
                {/* Radar ringen */}
                {[55, 95, 135, 175].map((r, i) => (
                    <motion.circle
                        key={r}
                        cx="185"
                        cy="155"
                        r={r}
                        fill="none"
                        stroke={BORDER}
                        strokeWidth="1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                    />
                ))}

                {/* Kruis-lijnen */}
                <line x1="185" y1="0" x2="185" y2="310" stroke={BORDER} strokeWidth="0.5" />
                <line x1="0" y1="155" x2="370" y2="155" stroke={BORDER} strokeWidth="0.5" />

                {/* Vaste route achtergrond (dim) */}
                <path d={PATH_D} fill="none" stroke="#333" strokeWidth="2" strokeDasharray="8 5" />

                {/* Geanimeerde gele streeplijn */}
                <motion.path
                    d={PATH_D}
                    fill="none"
                    stroke={YELLOW}
                    strokeWidth="2.5"
                    strokeDasharray="10 5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeOut", delay: 0.6 }}
                />

                {/* Punt A – vertrek */}
                <motion.g initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, type: "spring" }}>
                    <circle cx="55" cy="270" r="9" fill={YELLOW} />
                    <text x="55" y="274" textAnchor="middle" fill={DARK} fontSize="9" fontWeight="700" fontFamily="sans-serif">
                        A
                    </text>
                    <motion.circle
                        cx="55"
                        cy="270"
                        r="16"
                        fill="none"
                        stroke={YELLOW}
                        strokeWidth="1.5"
                        animate={{ r: [14, 26], opacity: [0.7, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    />
                    <text x="55" y="293" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="sans-serif">
                        Vertrek
                    </text>
                </motion.g>

                {/* Punt B – bestemming */}
                <motion.g initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.6, type: "spring" }}>
                    <circle cx="315" cy="55" r="9" fill="white" />
                    <text x="315" y="59" textAnchor="middle" fill={DARK} fontSize="9" fontWeight="700" fontFamily="sans-serif">
                        B
                    </text>
                    <motion.circle
                        cx="315"
                        cy="55"
                        r="16"
                        fill="none"
                        stroke="white"
                        strokeWidth="1.5"
                        animate={{ r: [14, 26], opacity: [0.7, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
                    />
                    <text x="315" y="36" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="sans-serif">
                        Bestemming
                    </text>
                </motion.g>

                {/* Rijdende taxi langs het pad */}
                <g>
                    {/* animateMotion volgt PATH_D */}
                    <animateMotion dur="5s" repeatCount="indefinite" begin="2.8s" rotate="auto" path={PATH_D} />
                    {/* Gele gloed */}
                    <circle r="20" fill="rgba(255,210,0,0.1)" />
                    {/* Taxi-auto (gecentreerd op origin) */}
                    <g transform="translate(-18, -9)">
                        <rect x="0" y="6" width="36" height="10" rx="2" fill={YELLOW} />
                        <rect x="7" y="1" width="19" height="8" rx="2" fill={YELLOW} />
                        <rect x="8" y="1.5" width="7" height="6" rx="1" fill="rgba(14,14,14,0.3)" />
                        <rect x="18" y="1.5" width="7" height="6" rx="1" fill="rgba(14,14,14,0.3)" />
                        <circle cx="8" cy="15" r="2.5" fill={DARK} />
                        <circle cx="28" cy="15" r="2.5" fill={DARK} />
                    </g>
                </g>
            </svg>
        </div>
    );
};

// ---------- Info-kaart (rechtsboven, zoals AviationStack's flight data) ----------
const RouteInfoCard: FC = () => (
    <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 0.6 }}
        className="absolute top-4 right-4 rounded-xl border text-white text-xs"
        style={{ background: "#181818", borderColor: BORDER, minWidth: 160, padding: "14px 16px" }}
    >
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-2" style={{ borderBottom: `1px solid ${BORDER}` }}>
            <span className="font-bold tracking-widest text-xs" style={{ color: YELLOW }}>
                AMS — SCH
            </span>
            <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
                <span style={{ color: "#22c55e" }}>Actief</span>
            </span>
        </div>

        {/* Locatie */}
        <div className="mb-2" style={{ borderBottom: `1px solid ${BORDER}`, paddingBottom: 8 }}>
            <div style={{ color: "#666", marginBottom: 2 }}>Locatie</div>
            <div className="font-semibold">
                Lat: <span style={{ color: YELLOW }}>52.3704</span>
            </div>
            <div className="font-semibold">
                Lon: <span style={{ color: YELLOW }}>4.8952</span>
            </div>
        </div>

        {/* Rit data */}
        <div className="mb-2" style={{ borderBottom: `1px solid ${BORDER}`, paddingBottom: 8 }}>
            <div style={{ color: "#666", marginBottom: 2 }}>Snelheid</div>
            <div className="font-semibold">Hor: 65 km/h</div>
            <div className="font-semibold">ETA: 23 min</div>
        </div>

        {/* Tijdtafel */}
        <div>
            <div style={{ color: "#666", marginBottom: 2 }}>Tijdtafel</div>
            <div className="font-semibold">
                Afst: <span style={{ color: "rgba(255,255,255,0.8)" }}>18.4 km</span>
            </div>
            <div className="font-semibold">
                Prijs: <span style={{ color: YELLOW }}>€ 24,50</span>
            </div>
        </div>

        <button
            className="mt-3 w-full rounded-md py-1.5 text-xs font-semibold text-center transition duration-100"
            style={{ background: YELLOW, color: DARK }}
        >
            Rit aanvragen
        </button>
    </motion.div>
);

// ---------- Boekingsformulier ----------
const BookingForm: FC = () => {
    const [van, setVan] = useState("");
    const [naar, setNaar] = useState("");
    const [datum, setDatum] = useState("");
    const [tijd, setTijd] = useState("");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="rounded-2xl border mt-8 md:mt-10"
            style={{ background: CARD_BG, borderColor: BORDER, padding: "24px 28px" }}
        >
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: YELLOW }}>
                Snel een rit aanvragen
            </p>

            {/* Van / Naar */}
            <div className="relative mb-3 flex flex-col gap-3">
                <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium" style={{ color: "#888" }}>
                        Ophaaladres
                    </span>
                    <div className="flex items-center gap-2 rounded-lg border px-3 py-2.5" style={{ background: "#0E0E0E", borderColor: "#333" }}>
                        <MarkerPin01 className="size-4 shrink-0" style={{ color: YELLOW }} aria-hidden="true" />
                        <input
                            type="text"
                            placeholder="Adres, stad of luchthaven…"
                            value={van}
                            onChange={(e) => setVan(e.target.value)}
                            className="flex-1 bg-transparent text-sm text-white placeholder:text-neutral-600 outline-none"
                        />
                    </div>
                </label>

                {/* Swap indicator */}
                <div
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full border w-6 h-6"
                    style={{ background: CARD_BG, borderColor: "#444", color: "#888" }}
                    aria-hidden="true"
                >
                    <svg viewBox="0 0 12 16" className="w-2.5 h-3" fill="none">
                        <path d="M6 0v16M2 12l4 4 4-4M2 4l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium" style={{ color: "#888" }}>
                        Bestemming
                    </span>
                    <div className="flex items-center gap-2 rounded-lg border px-3 py-2.5" style={{ background: "#0E0E0E", borderColor: "#333" }}>
                        <MarkerPin01 className="size-4 shrink-0" style={{ color: "rgba(255,255,255,0.4)" }} aria-hidden="true" />
                        <input
                            type="text"
                            placeholder="Bestemming…"
                            value={naar}
                            onChange={(e) => setNaar(e.target.value)}
                            className="flex-1 bg-transparent text-sm text-white placeholder:text-neutral-600 outline-none"
                        />
                    </div>
                </label>
            </div>

            {/* Datum + Tijd */}
            <div className="grid grid-cols-2 gap-3 mb-5">
                <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium" style={{ color: "#888" }}>
                        Datum
                    </span>
                    <div className="flex items-center gap-2 rounded-lg border px-3 py-2.5" style={{ background: "#0E0E0E", borderColor: "#333" }}>
                        <Calendar className="size-4 shrink-0" style={{ color: "#888" }} aria-hidden="true" />
                        <input
                            type="date"
                            value={datum}
                            onChange={(e) => setDatum(e.target.value)}
                            className="flex-1 bg-transparent text-sm text-white placeholder:text-neutral-600 outline-none [color-scheme:dark]"
                        />
                    </div>
                </label>

                <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium" style={{ color: "#888" }}>
                        Tijd
                    </span>
                    <div className="flex items-center gap-2 rounded-lg border px-3 py-2.5" style={{ background: "#0E0E0E", borderColor: "#333" }}>
                        <Clock className="size-4 shrink-0" style={{ color: "#888" }} aria-hidden="true" />
                        <input
                            type="time"
                            value={tijd}
                            onChange={(e) => setTijd(e.target.value)}
                            className="flex-1 bg-transparent text-sm text-white placeholder:text-neutral-600 outline-none [color-scheme:dark]"
                        />
                    </div>
                </label>
            </div>

            {/* CTA */}
            <button
                className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold tracking-wide transition duration-100 hover:brightness-90 active:scale-[0.98]"
                style={{ background: YELLOW, color: DARK }}
            >
                Rit aanvragen
                <ArrowRight className="size-4" aria-hidden="true" />
            </button>
        </motion.div>
    );
};

// ---------- Navigatie ----------
const YasNav: FC = () => (
    <nav className="flex items-center justify-between w-full py-5">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
            <div
                className="flex items-center justify-center rounded-xl w-9 h-9 shrink-0"
                style={{ background: YELLOW }}
            >
                <Car01 className="size-5" style={{ color: DARK }} aria-hidden="true" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-white leading-none">
                YAS<span style={{ color: YELLOW }}>.</span>
            </span>
        </a>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-7 text-sm font-medium" style={{ color: "#999" }}>
            {["Diensten", "Schiphol", "Prijzen", "Over ons"].map((item) => (
                <li key={item}>
                    <a href="#" className="hover:text-white transition duration-100">
                        {item}
                    </a>
                </li>
            ))}
        </ul>

        {/* CTA */}
        <div className="flex items-center gap-3">
            <a href="tel:+31701234567" className="hidden sm:flex items-center gap-2 text-sm font-medium text-white hover:opacity-80 transition duration-100">
                <Phone01 className="size-4" style={{ color: YELLOW }} aria-hidden="true" />
                <span>070 123 45 67</span>
            </a>
            <button
                className="rounded-lg px-4 py-2.5 text-sm font-bold transition duration-100 hover:brightness-90"
                style={{ background: YELLOW, color: DARK }}
            >
                Nu boeken
            </button>
        </div>
    </nav>
);

// ---------- Trust badges ----------
const TrustBadges: FC = () => {
    const items = [
        { icon: CheckCircle, label: "Vaste prijs, geen verrassingen" },
        { icon: Clock, label: "24/7 beschikbaar" },
        { icon: Star01, label: "4.9 ★ op 500+ ritten" },
    ];
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-wrap gap-4 mt-6"
        >
            {items.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm" style={{ color: "#999" }}>
                    <Icon className="size-4 shrink-0" style={{ color: YELLOW }} aria-hidden="true" />
                    <span>{label}</span>
                </div>
            ))}
        </motion.div>
    );
};

// ---------- Statistieken balk ----------
const StatsBar: FC = () => {
    const stats = [
        { value: "15+", label: "jaar ervaring" },
        { value: "50.000+", label: "ritten gereden" },
        { value: "4.9 ★", label: "gemiddelde beoordeling" },
        { value: "24/7", label: "dag en nacht bereikbaar" },
    ];
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="border-t mt-16 pt-8 grid grid-cols-2 md:grid-cols-4 gap-6"
            style={{ borderColor: BORDER }}
        >
            {stats.map(({ value, label }) => (
                <div key={label}>
                    <p className="text-2xl font-extrabold tracking-tight text-white">{value}</p>
                    <p className="text-sm mt-0.5" style={{ color: "#666" }}>
                        {label}
                    </p>
                </div>
            ))}
        </motion.div>
    );
};

// ---------- Hoofd hero component ----------
export const YasHero: FC = () => {
    return (
        <section
            className="relative min-h-screen w-full overflow-hidden"
            style={{ background: DARK, fontFamily: "Montserrat, system-ui, sans-serif" }}
        >
            {/* Stippelraster achtergrond */}
            <div
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(255,210,0,0.08) 1px, transparent 1px)`,
                    backgroundSize: "36px 36px",
                }}
            />

            {/* Gele gloed linksboven */}
            <div
                className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-10"
                aria-hidden="true"
                style={{ background: YELLOW }}
            />

            <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-10">
                <YasNav />

                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 mt-8 lg:mt-12 pb-16">
                    {/* ---------- Links: tekst + form ---------- */}
                    <div className="flex-1 max-w-xl">
                        {/* Badge */}
                        <motion.span
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold mb-6"
                            style={{ borderColor: "#333", color: YELLOW, background: "rgba(255,210,0,0.07)" }}
                        >
                            <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ background: YELLOW }} />
                            Schiphol Taxi Specialist
                        </motion.span>

                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.6 }}
                            className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-[1.08] tracking-tight text-white"
                        >
                            Snel van{" "}
                            <span
                                className="relative inline-block"
                                style={{ color: YELLOW }}
                            >
                                A
                            </span>
                            {" "}naar{" "}
                            <span style={{ color: YELLOW }}>B</span>
                            <br />
                            <span className="text-white">— altijd op tijd.</span>
                        </motion.h1>

                        {/* Subtitel */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="mt-4 text-base md:text-lg leading-relaxed"
                            style={{ color: "#888" }}
                        >
                            Betrouwbaar taxivervoer in de regio Rijn en Gouwe.
                            Vaste prijs, professionele chauffeurs, altijd op tijd.
                        </motion.p>

                        <TrustBadges />
                        <BookingForm />
                    </div>

                    {/* ---------- Rechts: animatie ---------- */}
                    <div className="w-full lg:w-[480px] xl:w-[520px] relative mt-4 lg:mt-0 shrink-0">
                        <TaxiRouteAnimation />
                        <RouteInfoCard />
                    </div>
                </div>

                <StatsBar />
            </div>
        </section>
    );
};

export default YasHero;
