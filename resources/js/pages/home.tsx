import {
    Car01,
    CheckCircle,
    Clock,
    CreditCard02,
    MarkerPin01,
    MessageChatCircle,
    Phone,
    Shield01,
    ThumbsUp,
    Wifi,
} from "@untitledui/icons";

import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { SectionDivider } from "@/components/shared-assets/section-divider";
import { YasFooter } from "@/components/yas-layout";
import { YasHero } from "@/components/yas-hero";

/* ─── 1–2. Hero + Trust (vervangen door YasHero) ─────────────── */

/* ─── 3. Diensten ────────────────────────────────────────────── */
const DIENSTEN = [
    {
        icon: Car01,
        title: "Luchthavenvervoer",
        text: "Stressvrij van deur tot gate. Wij rijden u naar Schiphol, Rotterdam The Hague Airport en meer, altijd op tijd.",
        href: "/airport-service",
        cta: "Bekijk tarieven",
    },
    {
        icon: Shield01,
        title: "Zakelijk vervoer",
        text: "Representatief vervoer voor zakenrelaties, congressen en vergaderingen. Discreet, punctueel en comfortabel.",
        href: "/diensten",
        cta: "Meer informatie",
    },
    {
        icon: MarkerPin01,
        title: "Regionaal vervoer",
        text: "Stations, ziekenhuizen, scholen, winkels of afspraken, snel en betrouwbaar door heel Gouda en de regio.",
        href: "/diensten",
        cta: "Meer informatie",
    },
    {
        icon: ThumbsUp,
        title: "Zorgvervoer",
        text: "Vervoer op maat voor mensen met een zorgvraag. Geduldig, hulpvaardig en met oog voor comfort.",
        href: "/diensten",
        cta: "Meer informatie",
    },
];

const DienstenSection = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="mx-auto max-w-container px-4 md:px-8">
            <div className="mb-12 flex flex-col items-center text-center md:mb-16">
                <span className="text-sm font-semibold text-brand-secondary md:text-md">Onze diensten</span>
                <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">
                    Altijd een rit voor u klaar
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {DIENSTEN.map((item) => (
                    <div
                        key={item.title}
                        className="flex flex-col gap-4 rounded-2xl border border-secondary bg-primary p-6 shadow-xs"
                    >
                        <FeaturedIcon icon={item.icon} size="md" color="brand" theme="light" />
                        <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
                            <p className="text-sm text-tertiary">{item.text}</p>
                        </div>
                        <Button color="link-color" size="sm" href={item.href} className="mt-auto w-fit">
                            {item.cta}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

/* ─── 4. Hoe het werkt ───────────────────────────────────────── */


/* ─── 6. Serviceregio ────────────────────────────────────────── */
const REGIO_PLAATSEN = [
    "Gouda", "Waddinxveen", "Reeuwijk", "Bodegraven",
    "Boskoop", "Woerden", "Alphen aan den Rijn", "Zoetermeer",
    "Schoonhoven", "Bergambacht", "Nieuwerkerk aan den IJssel", "Moordrecht",
];

const ServiceRegioSection = () => (
    <section className="bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-container px-4 md:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
                <div className="flex flex-col gap-6">
                    <span className="text-sm font-semibold text-brand-secondary md:text-md">Werkgebied</span>
                    <h2 className="text-display-sm font-semibold text-primary md:text-display-md">
                        Wij rijden door heel de regio
                    </h2>
                    <p className="text-lg text-tertiary">
                        YAS TaxiCentrale is gevestigd in Gouda en rijdt door de gehele regio. Van station tot
                        luchthaven, altijd dicht bij huis.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {REGIO_PLAATSEN.map((plaats) => (
                            <span
                                key={plaats}
                                className="rounded-full border border-secondary bg-primary px-3 py-1 text-sm font-medium text-secondary"
                            >
                                {plaats}
                            </span>
                        ))}
                    </div>
                    <p className="text-sm text-tertiary">
                        Ook buiten deze plaatsen? Neem contact op, wij rijden door heel Nederland.
                    </p>
                    <Button href="/contact" color="secondary" className="w-fit">
                        Contact opnemen
                    </Button>
                </div>

                <div className="relative flex items-center justify-center">
                    <img
                        src="/rijn en gouwe.png"
                        alt="Regio Rijn en Gouwe op de kaart"
                        className="h-[300px] w-full object-contain md:h-[400px]"
                        style={{ mixBlendMode: "multiply" }}
                    />
                    {/* Verberg Gemini-watermark rechtsonderin */}
                    <div
                        className="pointer-events-none absolute bottom-0 right-0 w-32 h-10"
                        style={{ background: "linear-gradient(to bottom, transparent, var(--color-bg-secondary))" }}
                    />
                </div>
            </div>
        </div>
    </section>
);


/* ─── 8. Contact ─────────────────────────────────────────────── */
/* ─── 9. (removed) ──────────────────────────────────────────── */

/* ─── 10. CTA ────────────────────────────────────────────────── */
const CtaSection = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="mx-auto max-w-container px-4 text-center md:px-8">
            <h2 className="text-display-sm font-semibold text-primary_on-brand md:text-display-md">
                Klaar om te rijden?
            </h2>
            <p className="mt-4 text-lg text-tertiary_on-brand md:mt-5 md:text-xl">
                Reserveer direct online of bel ons op{" "}
                <a
                    href="tel:+31852128302"
                    className="font-semibold text-white underline underline-offset-4"
                >
                    085 212 83 02
                </a>
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-12">
                <Button color="secondary" size="xl" href="/contact" className="shadow-xs! ring-0 !text-primary">
                    Neem contact op
                </Button>
                <Button size="xl" href="/reserveren">
                    Nu reserveren
                </Button>
            </div>
        </div>
    </section>
);

/* ─── Page ───────────────────────────────────────────────────── */
const Home = () => (
    <div className="bg-primary">
        <YasHero />
        <DienstenSection />
        <ServiceRegioSection />
        <CtaSection />
        <SectionDivider />
        <YasFooter />
    </div>
);

export default Home;
