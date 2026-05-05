import {
    ArrowRight,
    Briefcase01,
    Calendar,
    Car01,
    CheckCircle,
    Heart,
    MarkerPin01,
    Moon01,
    Phone,
    PhoneCall02,
    Shield01,
    Users01,
} from "@untitledui/icons";

import { Button } from "@/components/base/buttons/button";
import { Eyebrow } from "@/components/shared-assets/eyebrow";
import { SectionDivider } from "@/components/shared-assets/section-divider";
import { YasFooter, YasHeader } from "@/components/yas-layout";

const YELLOW = "rgb(255,210,0)";
const DARK = "#0E0E0E";

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

        {/* Header binnen het donkere blok, geen harde cut */}
        <div className="relative z-30 w-full">
            <YasHeader dark />
        </div>

        <div className="relative z-10 mx-auto max-w-container px-4 pt-12 pb-20 md:px-8 md:pt-20 md:pb-28">
            <div className="flex max-w-3xl flex-col gap-6">
                <Eyebrow onDark>Diensten</Eyebrow>
                <h1 className="text-display-lg font-semibold leading-[1.05] tracking-tight text-white md:text-display-xl">
                    Vervoer voor elke
                    <br />
                    <span style={{ color: YELLOW }}>gelegenheid.</span>
                </h1>
                <p className="text-md text-white/60 md:text-lg">
                    Van een vroege vlucht tot een spoedrit naar het ziekenhuis. Wij rijden u
                    discreet, comfortabel en met vaste prijzen vooraf, door de hele Rijn en Gouwe regio.
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
            </div>
        </div>
    </section>
);

/* ─── Diensten, editöryel numaralı kartlar ─────────────────── */
type ServiceItem = {
    num: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
    primaryBtn?: { label: string; href: string };
};

const services: ServiceItem[] = [
    {
        num: "01",
        icon: Car01,
        title: "Airport Service",
        description:
            "Stressvrij van deur tot gate. Vaste tarieven naar Schiphol en Rotterdam The Hague Airport. Wij volgen uw vlucht en staan op tijd voor de deur.",
        primaryBtn: { label: "Bekijk tarieven", href: "/airport-service" },
    },
    {
        num: "02",
        icon: Briefcase01,
        title: "Zakelijk vervoer",
        description:
            "Representatief en punctueel vervoer voor vergaderingen, congressen en zakenreizen. Professionele chauffeurs die u op tijd brengen.",
    },
    {
        num: "03",
        icon: Users01,
        title: "Groepsvervoer",
        description:
            "Uitstapjes, bruiloften, vrijgezellenfeesten of een bedrijfsuitje, samen reizen in stijl. Vraag naar de mogelijkheden.",
    },
    {
        num: "04",
        icon: MarkerPin01,
        title: "Ritten op maat",
        description:
            "Ziekenhuis, treinstation, evenement of gewoon thuis, wij rijden u waar u naartoe wilt, door heel Nederland.",
        primaryBtn: { label: "Bekijk tarieven", href: "#ritten-tarieven" },
    },
    {
        num: "05",
        icon: Moon01,
        title: "Avond & nacht",
        description:
            "Veilig en comfortabel thuiskomen na een avondje uit. Dag en nacht beschikbaar, ook in het weekend en op feestdagen. Voor nachtritten kan een toeslag gelden.",
    },
    {
        num: "06",
        icon: Heart,
        title: "Zorgvervoer",
        description:
            "Speciaal voor mensen met een zorgvraag. Hulp bij instappen, rolstoelvervoer op aanvraag en alle tijd die u nodig heeft.",
    },
];

const ServiceCard = ({ num, icon: Icon, title, description, primaryBtn }: ServiceItem) => (
    <div className="group relative flex flex-col gap-6 px-2 py-8 transition duration-200 sm:px-6 hover:bg-secondary lg:px-8 lg:py-10">
        <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
            style={{ background: YELLOW }}
        />

        <div className="flex items-baseline justify-between">
            <span className="font-mono text-sm font-medium tracking-widest text-quaternary">
                {num}
            </span>
            <Icon className="size-6 text-secondary" aria-hidden />
        </div>

        <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold tracking-tight text-primary">{title}</h3>
            <p className="text-sm leading-relaxed text-tertiary">{description}</p>
        </div>

        <div className="mt-auto pt-2">
            {primaryBtn ? (
                <a
                    href={primaryBtn.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors duration-200 group-hover:text-secondary_hover"
                >
                    {primaryBtn.label}
                    <ArrowRight
                        className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden
                    />
                </a>
            ) : (
                <a
                    href="tel:+31852128302"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-tertiary transition-colors duration-200 hover:text-primary"
                >
                    <PhoneCall02 className="size-4" aria-hidden />
                    Op aanvraag · Bel ons
                </a>
            )}
        </div>
    </div>
);

const DienstenGridSection = () => (
    <section className="bg-primary py-20 md:py-28">
        <div className="mx-auto max-w-container px-4 md:px-8">
            <div className="mb-14 flex flex-col gap-5 md:mb-20 md:max-w-2xl">
                <Eyebrow>Wat wij bieden</Eyebrow>
                <h2 className="text-display-md font-semibold tracking-tight text-primary md:text-display-lg">
                    Zes manieren om met YAS te rijden.
                </h2>
                <p className="text-md text-tertiary md:text-lg">
                    Voor airport service en ritten op maat publiceren we vaste tarieven. Voor de
                    overige diensten bellen wij u graag voor een prijs op maat.
                </p>
            </div>

            <div className="grid grid-cols-1 divide-y border-y border-secondary sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-3">
                {services.map((s, i) => (
                    <div
                        key={s.title}
                        style={{
                            borderLeft:
                                i % 3 !== 0
                                    ? "1px solid var(--color-border-secondary)"
                                    : undefined,
                        }}
                    >
                        <ServiceCard {...s} />
                    </div>
                ))}
            </div>
        </div>
    </section>
);

/* ─── Tarieven, gegroepeerd per zone ─────────────────────────── */
type Route = { route: string; price: string };
type Zone = { label: string; subtitle: string; routes: Route[] };

const ZONES: Zone[] = [
    {
        label: "Lokaal",
        subtitle: "Binnen Gouda en directe omgeving",
        routes: [
            { route: "Gouda – Gouda", price: "€ 10,-" },
            { route: "Gouda – Gouderak", price: "€ 17,50" },
            { route: "Gouda – Moordrecht", price: "€ 17,50" },
            { route: "Gouda – Reeuwijk", price: "€ 17,50" },
            { route: "Gouda – Stolwijk", price: "€ 17,50" },
            { route: "Gouda – Waddinxveen", price: "€ 17,50" },
            { route: "Gouda – Haastrecht", price: "€ 20,-" },
            { route: "Gouda – Reeuwijk Brug", price: "€ 20,-" },
            { route: "Gouda – Bergambacht", price: "€ 25,-" },
            { route: "Gouda – Driebruggen", price: "€ 25,-" },
        ],
    },
    {
        label: "Regio",
        subtitle: "Rijn & Gouwe en omliggende gemeenten",
        routes: [
            { route: "Gouda – Boskoop", price: "€ 27,50" },
            { route: "Gouda – Nieuwerbrug", price: "€ 27,50" },
            { route: "Gouda – Moerkapelle", price: "€ 30,-" },
            { route: "Gouda – Bodegraven", price: "€ 32,50" },
            { route: "Gouda – Nieuwerkerk a/d IJssel", price: "€ 35,-" },
            { route: "Gouda – Ouderkerk a/d IJssel", price: "€ 35,-" },
            { route: "Gouda – Oudewater", price: "€ 35,-" },
            { route: "Gouda – Zoetermeer", price: "€ 37,50" },
            { route: "Gouda – Lekkerkerk", price: "€ 40,-" },
            { route: "Gouda – Schoonhoven", price: "€ 40,-" },
            { route: "Gouda – Cappelle a/d IJssel", price: "€ 40,-" },
            { route: "Gouda – Krimpen a/d IJssel", price: "€ 42,50" },
            { route: "Gouda – Montfoort", price: "€ 42,50" },
            { route: "Gouda – Alphen a/d Rijn", price: "€ 45,-" },
        ],
    },
    {
        label: "Steden & Luchthavens",
        subtitle: "Rotterdam, Den Haag, Schiphol, Utrecht en verder",
        routes: [
            { route: "Gouda – Rotterdam Alexander", price: "€ 47,50" },
            { route: "Gouda – Woerden", price: "€ 50,-" },
            { route: "Gouda – Rotterdam Centraal", price: "€ 52,50" },
            { route: "Gouda – Rotterdam Zuid", price: "€ 62,50" },
            { route: "Gouda – Rotterdam Airport", price: "€ 65,-" },
            { route: "Gouda – Den Haag Centraal", price: "€ 70,-" },
            { route: "Gouda – Schiphol", price: "€ 75,-" },
            { route: "Gouda – Utrecht Centraal", price: "€ 75,-" },
            { route: "Gouda – Amsterdam Centraal", price: "€ 110,-" },
            { route: "Gouda – Antwerpen", price: "€ 175,-" },
        ],
    },
];

const ZoneTable = ({ zone }: { zone: Zone }) => (
    <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-quaternary">
                {zone.label}
            </span>
            <p className="text-md font-semibold text-primary">{zone.subtitle}</p>
        </div>

        <div className="border-y border-secondary">
            {zone.routes.map((r) => (
                <a
                    key={r.route}
                    href="/reserveren"
                    className="group flex items-center justify-between gap-4 border-b border-secondary px-1 py-3.5 last:border-b-0 transition-colors duration-150 hover:bg-secondary/50"
                >
                    <span className="text-sm font-medium text-primary">{r.route}</span>
                    <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-semibold tracking-tight text-primary tabular-nums">
                            {r.price}
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
    <section id="ritten-tarieven" className="bg-secondary py-20 md:py-28">
        <div className="mx-auto max-w-container px-4 md:px-8">
            <div className="mb-14 flex flex-col gap-5 md:mb-20 md:max-w-2xl">
                <Eyebrow>Tarieven</Eyebrow>
                <h2 className="text-display-md font-semibold tracking-tight text-primary md:text-display-lg">
                    Vaste prijzen, vooraf bekend.
                </h2>
                <p className="text-md text-tertiary md:text-lg">
                    Alle tarieven gelden voor een rit met 1 t/m 4 personen, inclusief BTW. Klik
                    op een route om direct te reserveren.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-10">
                {ZONES.map((zone) => (
                    <ZoneTable key={zone.label} zone={zone} />
                ))}
            </div>

            <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-secondary pt-6 md:flex-row md:items-center">
                <p className="text-sm text-tertiary">
                    * Voor nachtritten kan een nachttoeslag gelden. Andere bestemming?{" "}
                    <a
                        href="tel:+31852128302"
                        className="font-semibold text-primary underline-offset-4 hover:underline"
                    >
                        Bel ons voor een prijs op maat
                    </a>
                    .
                </p>
                <Button href="/reserveren" iconTrailing={ArrowRight}>
                    Direct reserveren
                </Button>
            </div>
        </div>
    </section>
);

/* ─── Hoe het werkt, 3 stappen ──────────────────────────────── */
const STAPPEN = [
    {
        num: "01",
        icon: Calendar,
        title: "Boek uw rit",
        text: "Online in minder dan een minuut, via WhatsApp of telefonisch. U geeft adres, datum en tijd op.",
    },
    {
        num: "02",
        icon: CheckCircle,
        title: "Wij bevestigen",
        text: "U ontvangt direct een bevestiging met de chauffeur en de geschatte aankomsttijd.",
    },
    {
        num: "03",
        icon: Shield01,
        title: "Stap in & rijd",
        text: "De chauffeur staat op tijd voor de deur. U rijdt comfortabel met een vooraf bekende prijs.",
    },
];

const HoeHetWerktSection = () => (
    <section className="bg-primary py-20 md:py-28">
        <div className="mx-auto max-w-container px-4 md:px-8">
            <div className="mb-14 flex flex-col gap-5 md:mb-20 md:max-w-2xl">
                <Eyebrow>Hoe het werkt</Eyebrow>
                <h2 className="text-display-md font-semibold tracking-tight text-primary md:text-display-lg">
                    Van boeking tot bestemming, in drie stappen.
                </h2>
            </div>

            <div className="relative grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-12">
                {/* Verbindingslijn op desktop */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px md:block"
                    style={{ background: "var(--color-border-secondary)" }}
                />

                {STAPPEN.map((stap) => {
                    const Icon = stap.icon;
                    return (
                        <div key={stap.num} className="relative flex flex-col gap-5">
                            <div className="flex items-center gap-4">
                                <span
                                    className="flex size-12 shrink-0 items-center justify-center rounded-sm border bg-primary"
                                    style={{ borderColor: "var(--color-border-secondary)" }}
                                >
                                    <Icon className="size-5 text-primary" aria-hidden />
                                </span>
                                <span className="font-mono text-sm font-medium tracking-widest text-quaternary">
                                    {stap.num}
                                </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-semibold tracking-tight text-primary">
                                    {stap.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-tertiary">{stap.text}</p>
                            </div>
                        </div>
                    );
                })}
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
                <Eyebrow onDark>Vragen of speciale rit?</Eyebrow>
                <h2 className="text-display-lg font-semibold leading-[1.05] tracking-tight text-white md:text-display-xl">
                    Bel direct.
                    <br />
                    <span style={{ color: YELLOW }}>Wij denken mee.</span>
                </h2>
                <p className="text-md text-white/60 md:text-lg">
                    Een speciale rit, een groep, of een bestemming buiten onze tarievenlijst?
                    Wij zijn 24/7 bereikbaar en helpen u graag verder.
                </p>
            </div>

            <div className="flex flex-col gap-4 md:items-end">
                <Button size="xl" href="tel:+31852128302" iconLeading={Phone}>
                    085 212 83 02
                </Button>
                <a
                    href="/contact"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition duration-100 hover:text-white"
                >
                    Of stuur een bericht
                    <ArrowRight
                        className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden
                    />
                </a>
            </div>
        </div>
    </section>
);

/* ─── Page ───────────────────────────────────────────────────── */
const Diensten = () => (
    <div className="bg-primary">
        <HeroSection />
        <DienstenGridSection />
        <TarievenSection />
        <HoeHetWerktSection />
        <CtaSection />
        <SectionDivider />
        <YasFooter />
    </div>
);

export default Diensten;
