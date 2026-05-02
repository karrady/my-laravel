import {
    ArrowRight,
    Heart,
    MarkerPin01,
    Phone,
    Shield01,
    Star01,
} from "@untitledui/icons";

import { Button } from "@/components/base/buttons/button";
import { Eyebrow } from "@/components/shared-assets/eyebrow";
import { SectionDivider } from "@/components/shared-assets/section-divider";
import { YasFooter, YasHeader } from "@/components/yas-layout";

const YELLOW = "rgb(255,210,0)";
const DARK = "#0E0E0E";

const waarden = [
    {
        num: "01",
        icon: Shield01,
        title: "Betrouwbaarheid",
        text: "Een afspraak is een afspraak. Wij staan altijd op tijd klaar en communiceren proactief bij onverwachte omstandigheden.",
    },
    {
        num: "02",
        icon: Heart,
        title: "Klantgerichtheid",
        text: "Uw comfort en veiligheid staan voorop. Wij luisteren naar uw wensen en passen onze service daarop aan.",
    },
    {
        num: "03",
        icon: Star01,
        title: "Kwaliteit",
        text: "Schone voertuigen, vriendelijke chauffeurs en een vlekkeloze rit — dat is onze standaard, niet de uitzondering.",
    },
    {
        num: "04",
        icon: MarkerPin01,
        title: "Lokale betrokkenheid",
        text: "Als Gouds bedrijf kennen wij de regio als geen ander en investeren wij in de lokale gemeenschap.",
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
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="flex flex-col gap-6 lg:col-span-7">
                    <Eyebrow onDark>Over ons</Eyebrow>
                    <h1 className="text-display-lg font-semibold leading-[1.05] tracking-tight text-white md:text-display-xl">
                        Meer dan een taxi.
                        <br />
                        <span style={{ color: YELLOW }}>Uw vaste reispartner.</span>
                    </h1>
                    <p className="text-md text-white/60 md:text-lg">
                        YAS TaxiCentrale is opgericht vanuit een persoonlijke passie voor service
                        en betrouwbaarheid. Wij geloven dat goed vervoer meer is dan van A naar B
                        komen — het gaat om de ervaring onderweg.
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
                                    Direct bellen
                                </span>
                                <span className="text-base font-semibold tracking-wide">085 212 83 02</span>
                            </span>
                        </a>
                    </div>
                </div>

                <div className="lg:col-span-5">
                    <div
                        className="relative overflow-hidden border"
                        style={{ borderColor: "rgba(255,255,255,0.08)" }}
                    >
                        <img
                            src="/Gemini_Generated_Image_y6uy9qy6uy9qy6uy.png"
                            alt="YAS TaxiCentrale voertuig"
                            className="h-[320px] w-full object-cover md:h-[420px]"
                        />
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0"
                            style={{
                                background: `linear-gradient(180deg, transparent 60%, ${DARK})`,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
);

/* ─── Verhaal — editöryel layout ─────────────────────────────── */
const VerhaalSection = () => (
    <section className="bg-primary py-20 md:py-28">
        <div className="mx-auto max-w-container px-4 md:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="flex flex-col gap-5 lg:col-span-4">
                    <Eyebrow>Ons verhaal</Eyebrow>
                    <h2 className="text-display-md font-semibold tracking-tight text-primary md:text-display-lg">
                        Eerlijk en persoonlijk taxivervoer.
                    </h2>
                </div>

                <div className="lg:col-span-8">
                    <div className="flex flex-col gap-6 border-l-2 pl-8" style={{ borderColor: YELLOW }}>
                        <p className="text-lg leading-relaxed text-secondary md:text-xl">
                            YAS TaxiCentrale staat voor eerlijk en persoonlijk taxivervoer in
                            Gouda en omstreken. Geen verrassingen aan de meter, geen anonieme app —
                            gewoon een vaste prijs en een chauffeur die de regio kent.
                        </p>
                        <p className="text-md leading-relaxed text-tertiary">
                            Als Gouwenaar weet ik hoe belangrijk goede service is. Daarom werken
                            wij met vaste prijzen, vertrouwde chauffeurs en direct contact via
                            telefoon of WhatsApp. Voor elke rit, dichtbij of ver weg.
                        </p>
                        <p className="text-md leading-relaxed text-tertiary">
                            Wij rijden voor particulieren, zakelijke klanten en zorginstellingen.
                            Voor regelmatig vervoer hebben wij speciale tarieven.
                        </p>
                        <p className="text-md leading-relaxed text-tertiary">
                            Een rit nodig? Vraag 'm aan via onze website, of bel of app ons.
                            Wij regelen het voor u.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

/* ─── Waarden — donker, numaralı grid ───────────────────────── */
const WaardenSection = () => (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: DARK }}>
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
                <Eyebrow onDark>Onze waarden</Eyebrow>
                <h2 className="text-display-md font-semibold tracking-tight text-white md:text-display-lg">
                    De principes achter elke rit.
                </h2>
                <p className="text-md text-white/60 md:text-lg">
                    Vier overtuigingen die elke beslissing — van planning tot rijden — sturen.
                </p>
            </div>

            <div
                className="grid grid-cols-1 gap-px border-y sm:grid-cols-2 lg:grid-cols-4"
                style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.08)" }}
            >
                {waarden.map(({ num, icon: Icon, title, text }) => (
                    <div
                        key={num}
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
                                {num}
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold text-white">{title}</h3>
                        <p className="text-sm leading-relaxed text-white/55">{text}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

/* ─── CTA ────────────────────────────────────────────────────── */
const CtaSection = () => (
    <section className="bg-primary py-20 md:py-28">
        <div className="mx-auto max-w-container px-4 md:px-8">
            <div className="flex flex-col gap-10 border-y border-secondary py-12 md:flex-row md:items-end md:justify-between md:gap-16 md:py-16">
                <div className="flex max-w-2xl flex-col gap-5">
                    <Eyebrow>Klaar om te rijden?</Eyebrow>
                    <h2 className="text-display-md font-semibold tracking-tight text-primary md:text-display-lg">
                        Vraag uw rit aan,
                        <br />
                        <span style={{ color: "rgb(180,140,0)" }}>wij regelen de rest.</span>
                    </h2>
                    <p className="text-md text-tertiary md:text-lg">
                        Vragen of een speciale rit? Stuur een bericht of bel ons direct —
                        wij denken graag met u mee.
                    </p>
                </div>

                <div className="flex flex-col gap-4 md:items-end">
                    <div className="flex flex-wrap gap-3">
                        <Button size="xl" href="/reserveren" iconTrailing={ArrowRight}>
                            Nu reserveren
                        </Button>
                        <Button size="xl" color="secondary" href="/contact">
                            Neem contact op
                        </Button>
                    </div>
                    <a
                        href="tel:+31852128302"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-tertiary transition-colors duration-200 hover:text-primary"
                    >
                        <Phone className="size-4" aria-hidden />
                        Of bel direct: 085 212 83 02
                    </a>
                </div>
            </div>
        </div>
    </section>
);

/* ─── Page ───────────────────────────────────────────────────── */
const OverOns = () => (
    <div className="bg-primary">
        <HeroSection />
        <VerhaalSection />
        <WaardenSection />
        <CtaSection />
        <SectionDivider />
        <YasFooter />
    </div>
);

export default OverOns;
