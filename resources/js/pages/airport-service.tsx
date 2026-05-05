import {
    ArrowRight,
    CheckCircle,
    Clock,
    MarkerPin01,
    Phone,
    Plane,
    Shield01,
    Star01,
} from "@untitledui/icons";

import { Button } from "@/components/base/buttons/button";
import { Eyebrow } from "@/components/shared-assets/eyebrow";
import { SectionDivider } from "@/components/shared-assets/section-divider";
import { YasFooter, YasHeader } from "@/components/yas-layout";

const YELLOW = "rgb(255,210,0)";
const DARK = "#0E0E0E";

type Airport = {
    name: string;
    code: string;
    locations: { place: string; price: string; popular?: boolean }[];
};

const airports: Airport[] = [
    {
        name: "Amsterdam Schiphol",
        code: "AMS",
        locations: [
            { place: "Ammerstol", price: "€ 110,-" },
            { place: "Bergambacht", price: "€ 100,-" },
            { place: "Berkenwoude", price: "€ 105,-" },
            { place: "Bodegraven", price: "€ 80,-" },
            { place: "Boskoop", price: "€ 80,-" },
            { place: "Gouda", price: "€ 80,-", popular: true },
            { place: "Gouderak", price: "€ 95,-" },
            { place: "Haastrecht", price: "€ 95,-" },
            { place: "Krimpen a/d IJssel", price: "€ 125,-" },
            { place: "Lekkerkerk", price: "€ 125,-" },
            { place: "Moordrecht", price: "€ 90,-" },
            { place: "Nieuwerkerk a/d IJssel", price: "€ 105,-" },
            { place: "Ouderkerk a/d IJssel", price: "€ 115,-" },
            { place: "Oudewater", price: "€ 115,-" },
            { place: "Reeuwijk", price: "€ 80,-" },
            { place: "Reeuwijk Sluipwijk", price: "€ 90,-" },
            { place: "Schoonhoven", price: "€ 120,-" },
            { place: "Stolwijk", price: "€ 95,-" },
            { place: "Vlist", price: "€ 105,-" },
            { place: "Waddinxveen", price: "€ 80,-" },
            { place: "Waddinxveen Zuidplas", price: "€ 85,-" },
            { place: "Zevenhuizen / Moerkapelle", price: "€ 105,-" },
        ],
    },
    {
        name: "Rotterdam The Hague",
        code: "RTM",
        locations: [
            { place: "Ammerstol", price: "€ 95,-" },
            { place: "Bergambacht", price: "€ 90,-" },
            { place: "Berkenwoude", price: "€ 95,-" },
            { place: "Bodegraven", price: "€ 90,-" },
            { place: "Boskoop", price: "€ 95,-" },
            { place: "Gouda", price: "€ 70,-", popular: true },
            { place: "Gouderak", price: "€ 80,-" },
            { place: "Haastrecht", price: "€ 80,-" },
            { place: "Krimpen a/d IJssel", price: "€ 95,-" },
            { place: "Lekkerkerk", price: "€ 95,-" },
            { place: "Moerdrecht", price: "€ 70,-" },
            { place: "Moerkapelle", price: "€ 90,-" },
            { place: "Nieuwerkerk a/d IJssel", price: "€ 70,-" },
            { place: "Ouderkerk a/d IJssel", price: "€ 95,-" },
            { place: "Oudewater", price: "€ 110,-" },
            { place: "Reeuwijk", price: "€ 80,-" },
            { place: "Reeuwijk Sluipwijk", price: "€ 90,-" },
            { place: "Schoonhoven", price: "€ 110,-" },
            { place: "Stolwijk", price: "€ 85,-" },
            { place: "Vlist", price: "€ 90,-" },
            { place: "Waddinxveen", price: "€ 80,-" },
            { place: "Waddinxveen Noord", price: "€ 85,-" },
            { place: "Zevenhuizen", price: "€ 85,-" },
        ],
    },
];

/* ─── Hero ───────────────────────────────────────────────────── */
const HeroSection = () => (
    <section className="relative overflow-hidden" style={{ background: DARK }}>
        <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
                backgroundImage: `radial-gradient(circle, ${YELLOW} 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
            }}
        />
        <div
            aria-hidden
            className="pointer-events-none absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full blur-3xl"
            style={{ background: YELLOW, opacity: 0.06 }}
        />

        <div className="relative z-30 w-full">
            <YasHeader dark />
        </div>

        <div className="relative z-10 mx-auto max-w-container px-4 pt-12 pb-20 md:px-8 md:pt-20 md:pb-28">
            <div className="flex max-w-3xl flex-col gap-6">
                <Eyebrow onDark>Luchthavenvervoer</Eyebrow>
                <h1 className="text-display-lg font-semibold leading-[1.05] tracking-tight text-white md:text-display-xl">
                    Stressvrij naar het
                    <br />
                    <span style={{ color: YELLOW }}>vliegveld.</span>
                </h1>
                <p className="text-md text-white/60 md:text-lg">
                    Vaste tarieven naar Schiphol en Rotterdam The Hague Airport. Staat uw locatie er niet bij, of wilt u naar een andere luchthaven? Vraag vrijblijvend naar de mogelijkheden.
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Button size="lg" href="/reserveren" iconTrailing={ArrowRight}>
                        Direct reserveren
                    </Button>
                    <a
                        href="tel:+31852128302"
                        className="group inline-flex items-center gap-3 text-sm font-semibold text-white/80 transition duration-100 hover:text-white"
                    >
                        <span
                            className="flex size-9 items-center justify-center rounded-full border transition duration-100 group-hover:border-white/40"
                            style={{ borderColor: "rgba(255,255,255,0.18)" }}
                        >
                            <Phone className="size-4" style={{ color: YELLOW }} aria-hidden />
                        </span>
                        <span className="flex flex-col leading-tight text-left">
                            <span className="text-[11px] font-medium uppercase tracking-widest text-white/40">
                                Spoed of vraag
                            </span>
                            <span className="text-base font-semibold tracking-wide">085 212 83 02</span>
                        </span>
                    </a>
                </div>

                {/* Trust badges */}
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/55">
                    {[
                        "Vaste prijs vooraf",
                        "Deur-tot-deur service",
                        "24/7 beschikbaar",
                    ].map((label) => (
                        <span key={label} className="inline-flex items-center gap-1.5">
                            <CheckCircle className="size-3.5" style={{ color: YELLOW }} aria-hidden />
                            {label}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

/* ─── Tarieven, twee parallelle airport-tabellen ────────────── */
const AirportColumn = ({ airport }: { airport: Airport }) => (
    <div className="flex flex-col gap-5">
        <div className="flex items-baseline justify-between gap-4 border-b border-secondary pb-4">
            <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-quaternary">
                    {airport.code}
                </span>
                <h3 className="text-xl font-semibold tracking-tight text-primary">
                    {airport.name}
                </h3>
            </div>
            <Plane className="size-6 text-secondary" aria-hidden />
        </div>

        <div>
            {airport.locations.map((loc, i) => (
                <a
                    key={loc.place + i}
                    href="/reserveren"
                    className="group relative flex items-center justify-between gap-4 border-b border-secondary px-1 py-3.5 last:border-b-0 transition-colors duration-150 hover:bg-secondary/60"
                >
                    {/* Sarı sol kenar, alleen voor "popular" */}
                    {loc.popular && (
                        <span
                            aria-hidden
                            className="absolute inset-y-0 left-0 w-[2px]"
                            style={{ background: YELLOW }}
                        />
                    )}

                    <span className="flex items-center gap-2 pl-1.5 text-sm font-medium text-primary">
                        {loc.place}
                        {loc.popular && (
                            <span
                                className="inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                                style={{ background: "rgba(255,210,0,0.12)", color: DARK }}
                            >
                                <Star01 className="size-3" style={{ color: YELLOW }} aria-hidden />
                                Meest gevraagd
                            </span>
                        )}
                    </span>

                    <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-semibold tracking-tight text-primary tabular-nums">
                            {loc.price}
                        </span>
                        <ArrowRight
                            className="size-4 text-quaternary opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                            aria-hidden
                        />
                    </div>
                </a>
            ))}
        </div>
    </div>
);

const TarievenSection = () => (
    <section className="bg-primary py-20 md:py-28">
        <div className="mx-auto max-w-container px-4 md:px-8">
            <div className="mb-14 flex flex-col gap-5 md:mb-20 md:max-w-2xl">
                <Eyebrow>Tarieven</Eyebrow>
                <h2 className="text-display-md font-semibold tracking-tight text-primary md:text-display-lg">
                    Vaste luchthavenprijzen.
                </h2>
                <p className="text-md text-tertiary md:text-lg">
                    Alle prijzen gelden voor 1 t/m 4 personen, inclusief BTW.
                    Klik op een opstapplaats om direct te reserveren.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
                {airports.map((airport) => (
                    <AirportColumn key={airport.code} airport={airport} />
                ))}
            </div>

            {/* Andere luchthaven, refined card */}
            <div
                className="mt-14 flex flex-col items-start justify-between gap-6 border-y px-6 py-8 md:mt-20 md:flex-row md:items-center md:gap-12 md:px-10"
                style={{ borderColor: "var(--color-border-secondary)", background: "var(--color-bg-secondary)" }}
            >
                <div className="flex flex-col gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-quaternary">
                        Andere bestemming
                    </span>
                    <p className="text-lg font-semibold tracking-tight text-primary">
                        Eindhoven, Brussel, Düsseldorf of een andere luchthaven?
                    </p>
                    <p className="text-sm text-tertiary">
                        Staat uw vertrekplaats of luchthaven er niet bij? Vraag vrijblijvend een prijs op maat.
                    </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-3">
                    <Button color="secondary" size="md" href="/contact" iconTrailing={ArrowRight}>
                        Offerte aanvragen
                    </Button>
                    <Button size="md" href="tel:+31852128302" iconLeading={Phone}>
                        Bel ons
                    </Button>
                </div>
            </div>
        </div>
    </section>
);

/* ─── Inbegrepen, checklist + 3 highlights ──────────────────── */
const INBEGREPEN = [
    "Ruimte voor koffers en handbagage",
    "Kinder- of rolstoelvriendelijk op aanvraag",
    "Stille rit, zonder ongewenste gesprekken",
    "Vaste prijs, geen meter, geen verrassing",
];

const HIGHLIGHTS = [
    {
        num: "01",
        icon: Shield01,
        title: "Vaste prijs",
        text: "U betaalt nooit meer dan het afgesproken tarief, ook bij files of omleidingen.",
    },
    {
        num: "02",
        icon: MarkerPin01,
        title: "Deur-tot-deur",
        text: "Wij halen u op bij uw voordeur en brengen u tot direct aan de vertrekhal.",
    },
];

const InbegrepenSection = () => (
    <section className="bg-secondary py-20 md:py-28">
        <div className="mx-auto max-w-container px-4 md:px-8">
            <div className="mb-14 flex flex-col gap-5 md:mb-20 md:max-w-2xl">
                <Eyebrow>Inbegrepen in elke prijs</Eyebrow>
                <h2 className="text-display-md font-semibold tracking-tight text-primary md:text-display-lg">
                    Wat u ziet, is wat u betaalt.
                </h2>
                <p className="text-md text-tertiary md:text-lg">
                    Bij YAS TaxiCentrale zijn er geen verborgen kosten. Gewoon de prijs die u vooraf afspreekt.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
                {/* Checklist links */}
                <div className="lg:col-span-5">
                    <ul className="flex flex-col border-y border-secondary">
                        {INBEGREPEN.map((item) => (
                            <li
                                key={item}
                                className="flex items-start gap-3 border-b border-secondary py-4 last:border-b-0"
                            >
                                <CheckCircle
                                    className="mt-0.5 size-4 shrink-0"
                                    style={{ color: YELLOW }}
                                    aria-hidden
                                />
                                <span className="text-sm font-medium leading-relaxed text-secondary">
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Highlights rechts */}
                <div className="lg:col-span-7">
                    <div className="grid grid-cols-1 gap-px sm:grid-cols-2" style={{ background: "var(--color-border-secondary)" }}>
                        {HIGHLIGHTS.map(({ num, icon: Icon, title, text }) => (
                            <div
                                key={num}
                                className="flex flex-col gap-4 bg-primary p-6"
                            >
                                <div className="flex items-baseline justify-between">
                                    <span
                                        className="flex size-10 items-center justify-center rounded-sm border"
                                        style={{ borderColor: "var(--color-border-secondary)" }}
                                    >
                                        <Icon className="size-5 text-primary" aria-hidden />
                                    </span>
                                    <span className="font-mono text-xs tracking-widest text-quaternary">
                                        {num}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <h3 className="text-md font-semibold text-primary">{title}</h3>
                                    <p className="text-sm leading-relaxed text-tertiary">{text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
);

/* ─── CTA ────────────────────────────────────────────────────── */
const CtaSection = () => (
    <section className="relative overflow-hidden" style={{ background: DARK }}>
        <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full blur-3xl"
            style={{ background: YELLOW, opacity: 0.06 }}
        />
        <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
                backgroundImage: `radial-gradient(circle, ${YELLOW} 1px, transparent 1px)`,
                backgroundSize: "36px 36px",
            }}
        />

        <div className="relative mx-auto flex max-w-container flex-col gap-10 px-4 py-20 md:flex-row md:items-end md:justify-between md:gap-16 md:px-8 md:py-28">
            <div className="flex max-w-2xl flex-col gap-5">
                <Eyebrow onDark>Klaar voor uw vlucht?</Eyebrow>
                <h2 className="text-display-lg font-semibold leading-[1.05] tracking-tight text-white md:text-display-xl">
                    Reserveer nu.
                    <br />
                    <span style={{ color: YELLOW }}>Wij staan klaar.</span>
                </h2>
                <p className="text-md text-white/60 md:text-lg">
                    Boek uw luchthaventransfer online in minder dan een minuut, of bel ons direct.
                    Wij bevestigen uw rit met chauffeur en aankomsttijd.
                </p>
            </div>

            <div className="flex flex-col gap-4 md:items-end">
                <Button size="xl" href="/reserveren" iconTrailing={ArrowRight}>
                    Nu reserveren
                </Button>
                <a
                    href="tel:+31852128302"
                    className="group inline-flex items-center gap-3 text-sm font-semibold text-white/80 transition duration-100 hover:text-white"
                >
                    <span
                        className="flex size-9 items-center justify-center rounded-full border transition duration-100 group-hover:border-white/40"
                        style={{ borderColor: "rgba(255,255,255,0.18)" }}
                    >
                        <Phone className="size-4" style={{ color: YELLOW }} aria-hidden />
                    </span>
                    <span className="flex flex-col leading-tight">
                        <span className="text-[11px] font-medium uppercase tracking-widest text-white/40">
                            Direct bellen
                        </span>
                        <span className="text-base font-semibold tracking-wide">085 212 83 02</span>
                    </span>
                </a>
            </div>
        </div>
    </section>
);

/* ─── Page ───────────────────────────────────────────────────── */
const AirportService = () => (
    <div className="bg-primary">
        <HeroSection />
        <TarievenSection />
        <InbegrepenSection />
        <CtaSection />
        <SectionDivider />
        <YasFooter />
    </div>
);

export default AirportService;
