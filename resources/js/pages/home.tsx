import {
    ArrowRight,
    Car01,
    Clock,
    CreditCard02,
    Diamond01,
    MarkerPin01,
    Phone,
    Route,
    Shield01,
    ShieldTick,
    ThumbsUp,
} from "@untitledui/icons";

import { Button } from "@/components/base/buttons/button";
import { Eyebrow } from "@/components/shared-assets/eyebrow";
import { SectionDivider } from "@/components/shared-assets/section-divider";
import { YasFooter } from "@/components/yas-layout";
import { YasHero } from "@/components/yas-hero";

const YELLOW = "rgb(255,210,0)";
const DARK = "#0E0E0E";

/* ─── Diensten, editorial numbered cards ────────────────────── */
const DIENSTEN = [
    {
        num: "01",
        icon: Car01,
        title: "Luchthavenvervoer",
        text: "Stressvrij van deur tot gate. Wij rijden u naar Schiphol, Rotterdam The Hague Airport en meer, altijd op tijd.",
        href: "/airport-service",
        cta: "Bekijk tarieven",
    },
    {
        num: "02",
        icon: Shield01,
        title: "Zakelijk vervoer",
        text: "Representatief vervoer voor zakenrelaties, congressen en vergaderingen. Discreet, punctueel en comfortabel.",
        href: "/diensten",
        cta: "Meer informatie",
    },
    {
        num: "03",
        icon: MarkerPin01,
        title: "Regionaal vervoer",
        text: "Stations, ziekenhuizen, scholen of afspraken, snel en betrouwbaar door heel Gouda en de regio.",
        href: "/diensten",
        cta: "Meer informatie",
    },
    {
        num: "04",
        icon: ThumbsUp,
        title: "Zorgvervoer",
        text: "Vervoer op maat voor mensen met een zorgvraag. Geduldig, hulpvaardig en met oog voor comfort.",
        href: "/diensten",
        cta: "Meer informatie",
    },
];

const DienstenSection = () => (
    <section className="bg-primary py-20 md:py-28">
        <div className="mx-auto max-w-container px-4 md:px-8">
            <div className="mb-14 flex flex-col gap-5 md:mb-20 md:max-w-2xl">
                <Eyebrow>Onze diensten</Eyebrow>
                <h2 className="text-display-md font-semibold tracking-tight text-primary md:text-display-lg">
                    Een rit voor elke gelegenheid.
                </h2>
                <p className="text-md text-tertiary md:text-lg">
                    Of het nu gaat om een luchthaventransfer, een zakelijke afspraak of een rit door de regio, wij staan voor u klaar met comfortabel vervoer tegen vaste prijzen.
                </p>
            </div>

            <div className="grid grid-cols-1 divide-y border-y border-secondary sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
                {DIENSTEN.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <a
                            key={item.title}
                            href={item.href}
                            className="group relative flex flex-col gap-6 px-2 py-8 transition duration-200 sm:px-6 lg:px-8 lg:py-10 hover:bg-secondary"
                            style={{
                                borderLeft:
                                    i === 0
                                        ? "1px solid var(--color-border-secondary)"
                                        : undefined,
                            }}
                        >
                            {/* Top accent, fills yellow on hover */}
                            <span
                                aria-hidden
                                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                                style={{ background: YELLOW }}
                            />

                            <div className="flex items-baseline justify-between">
                                <span
                                    className="font-mono text-sm font-medium tracking-widest text-quaternary"
                                >
                                    {item.num}
                                </span>
                                <Icon className="size-6 text-secondary" aria-hidden />
                            </div>

                            <div className="flex flex-col gap-3">
                                <h3 className="text-xl font-semibold tracking-tight text-primary">
                                    {item.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-tertiary">{item.text}</p>
                            </div>

                            <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors duration-200 group-hover:text-secondary_hover">
                                {item.cta}
                                <ArrowRight
                                    className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                                    aria-hidden
                                />
                            </span>
                        </a>
                    );
                })}
            </div>
        </div>
    </section>
);

/* ─── Waarom YAS, credibility grid op donker ────────────────── */
const REDENEN = [
    {
        icon: CreditCard02,
        title: "Vaste prijs vooraf",
        text: "Geen verrassingen. U weet de ritprijs voordat u instapt.",
    },
    {
        icon: Clock,
        title: "24/7 beschikbaar",
        text: "Dag en nacht, doordeweeks of in het weekend, wij staan voor u klaar.",
    },
    {
        icon: ShieldTick,
        title: "Ervaren chauffeurs",
        text: "Lokale chauffeurs met routekennis, een verzorgd voorkomen en oog voor service.",
    },
    {
        icon: Route,
        title: "Slimme routering",
        text: "Live verkeersinformatie en rustige routes, zodat u nooit te laat aankomt.",
    },
    {
        icon: Diamond01,
        title: "Comfortabele wagens",
        text: "Schone, ruime voertuigen met airco, wifi en oplaadpunten voor uw apparaat.",
    },
    {
        icon: Phone,
        title: "Persoonlijk contact",
        text: "Een vast aanspreekpunt, boekt u één keer, dan kennen wij u de volgende keer.",
    },
];

const WaaromSection = () => (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: DARK }}>
        {/* subtiel patroon */}
        <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
                backgroundImage: `radial-gradient(circle, ${YELLOW} 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
            }}
        />

        <div className="relative mx-auto max-w-container px-4 md:px-8">
            <div className="mb-14 flex flex-col gap-5 md:mb-20 md:max-w-2xl">
                <Eyebrow onDark>Waarom YAS</Eyebrow>
                <h2 className="text-display-md font-semibold tracking-tight text-white md:text-display-lg">
                    Vervoer waar u op kunt rekenen.
                </h2>
                <p className="text-md text-white/60 md:text-lg">
                    Zes kleine maar belangrijke verschillen die ervoor zorgen dat onze klanten
                    blijven terugkeren.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-px border-y sm:grid-cols-2 lg:grid-cols-3" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.08)" }}>
                {REDENEN.map((reden, i) => {
                    const Icon = reden.icon;
                    return (
                        <div
                            key={reden.title}
                            className="group flex flex-col gap-4 p-8 transition duration-200 hover:bg-white/[0.03]"
                            style={{ background: DARK }}
                        >
                            <div className="flex items-baseline justify-between">
                                <span
                                    className="flex size-10 items-center justify-center rounded-sm border"
                                    style={{ borderColor: "rgba(255,255,255,0.12)" }}
                                >
                                    <Icon className="size-5" style={{ color: YELLOW }} aria-hidden />
                                </span>
                                <span className="font-mono text-xs tracking-widest text-white/30">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-white">{reden.title}</h3>
                            <p className="text-sm leading-relaxed text-white/55">{reden.text}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
);

/* ─── Service-regio ──────────────────────────────────────────── */
const REGIO_PLAATSEN = [
    "Gouda",
    "Waddinxveen",
    "Reeuwijk",
    "Bodegraven",
    "Boskoop",
    "Woerden",
    "Alphen aan den Rijn",
    "Zoetermeer",
    "Schoonhoven",
    "Bergambacht",
    "Nieuwerkerk a/d IJssel",
    "Moordrecht",
];

const ServiceRegioSection = () => (
    <section className="bg-secondary py-20 md:py-28">
        <div className="mx-auto max-w-container px-4 md:px-8">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
                <div className="flex flex-col gap-6 lg:col-span-5">
                    <Eyebrow>Werkgebied</Eyebrow>
                    <h2 className="text-display-md font-semibold tracking-tight text-primary md:text-display-lg">
                        Door heel de regio Rijn en Gouwe.
                    </h2>
                    <p className="text-md text-tertiary md:text-lg">
                        YAS TaxiCentrale is gevestigd in Gouda en rijdt door de gehele regio.
                        Van station tot luchthaven, altijd dichtbij.
                    </p>
                    <p className="text-sm text-tertiary">
                        Buiten deze plaatsen? Neem contact op, wij rijden door heel Nederland.
                    </p>
                    <div className="mt-2 flex flex-wrap gap-3">
                        <Button href="/contact" color="secondary" iconTrailing={ArrowRight}>
                            Contact opnemen
                        </Button>
                        <Button href="/airport-service" color="link-color" iconTrailing={ArrowRight}>
                            Bekijk luchthaventarieven
                        </Button>
                    </div>
                </div>

                <div className="lg:col-span-7">
                    {/* Regio-grid in editoriale stijl */}
                    <div className="grid grid-cols-2 border-y border-secondary sm:grid-cols-3">
                        {REGIO_PLAATSEN.map((plaats, i) => (
                            <div
                                key={plaats}
                                className="flex items-center gap-3 border-b border-secondary px-1 py-4 last:border-b-0 sm:px-4"
                                style={{
                                    borderRightWidth: i % 3 !== 2 ? "1px" : undefined,
                                    borderRightColor: "var(--color-border-secondary)",
                                }}
                            >
                                <span
                                    className="font-mono text-[10px] tracking-widest text-quaternary"
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="text-sm font-medium text-primary">{plaats}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
);

/* ─── CTA, premium dark closer ──────────────────────────────── */
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
                <Eyebrow onDark>Klaar om te rijden</Eyebrow>
                <h2 className="text-display-lg font-semibold leading-[1.05] tracking-tight text-white md:text-display-xl">
                    Boek nu uw rit.
                    <br />
                    <span style={{ color: YELLOW }}>Wij rijden voor.</span>
                </h2>
                <p className="text-md text-white/60 md:text-lg">
                    Reserveer online in minder dan een minuut, of bel ons direct. Een chauffeur
                    is meestal binnen vijftien minuten ter plaatse.
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
const Home = () => (
    <div className="bg-primary">
        <YasHero />
        <DienstenSection />
        <WaaromSection />
        <ServiceRegioSection />
        <CtaSection />
        <SectionDivider />
        <YasFooter />
    </div>
);

export default Home;
