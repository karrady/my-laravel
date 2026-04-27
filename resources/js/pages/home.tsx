import {
    Car01,
    CheckCircle,
    Clock,
    CreditCard02,
    MarkerPin01,
    MessageChatCircle,
    Phone,
    Shield01,
    Star01,
    ThumbsUp,
    Users01,
    Wifi,
} from "@untitledui/icons";

import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { StarIcon } from "@/components/foundations/rating-stars";
import { SectionDivider } from "@/components/shared-assets/section-divider";
import { YasFooter, YasHeader } from "@/components/yas-layout";

/* ─── 1. Hero ─────────────────────────────────────────────────── */
const Hero = () => (
    <div className="relative overflow-hidden bg-brand-section">
        <img
            alt=""
            aria-hidden="true"
            loading="lazy"
            src="https://www.untitledui.com/patterns/light/grid-dot-sm-desktop.svg"
            className="pointer-events-none absolute top-0 left-1/2 z-0 hidden max-w-none -translate-x-1/2 opacity-20 md:block"
        />
        <img
            alt=""
            aria-hidden="true"
            loading="lazy"
            src="https://www.untitledui.com/patterns/light/grid-dot-sm-mobile.svg"
            className="pointer-events-none absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 opacity-20 md:hidden"
        />

        <YasHeader dark />

        <section className="relative py-16 md:py-24">
            <div className="mx-auto w-full max-w-container px-4 md:px-8">
                <div className="flex max-w-5xl flex-col">
                    <span className="mb-4 w-fit rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-secondary_on-brand">
                        Gouda &amp; omgeving
                    </span>
                    <h1 className="text-display-md font-semibold text-primary_on-brand md:text-display-lg lg:text-display-xl">
                        Betrouwbaar{" "}
                        <span className="underline decoration-[3px] underline-offset-[0.218em] md:decoration-4">
                            taxivervoer
                        </span>{" "}
                        in de regio Gouda
                    </h1>
                    <p className="mt-4 max-w-(--breakpoint-sm) text-lg text-tertiary_on-brand md:mt-6 md:text-xl">
                        Altijd op tijd, dag en nacht. Van luchthaventransfers tot zakelijk vervoer — YAS
                        TaxiCentrale staat voor u klaar.
                    </p>
                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start md:mt-12">
                        <Button color="secondary" size="xl" href="/contact" className="shadow-xs! ring-0">
                            Neem contact op
                        </Button>
                        <Button size="xl" href="/reserveren">
                            Nu reserveren
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-16 w-full max-w-container px-4 md:px-8">
                <img
                    alt="YAS TaxiCentrale — professioneel taxivervoer in Gouda"
                    src="/vliegveld.jpg"
                    className="h-60 w-full rounded-2xl object-cover md:h-[360px] lg:h-129"
                />
            </div>
        </section>
    </div>
);

/* ─── 2. Trust bar ───────────────────────────────────────────── */
const TrustBar = () => (
    <section className="bg-brand-section pb-16 md:pb-24">
        <div className="mx-auto max-w-container px-4 md:px-8">
            <div className="flex flex-col gap-8">
                <p className="text-center text-md font-medium text-tertiary_on-brand">
                    Vertrouwd door honderden tevreden klanten in de regio
                </p>
                <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
                    {[
                        { icon: Shield01, label: "Volledig verzekerd" },
                        { icon: Clock, label: "24/7 beschikbaar" },
                        { icon: Star01, label: "4.9/5 gemiddeld" },
                        { icon: MarkerPin01, label: "Regio Gouda" },
                        { icon: ThumbsUp, label: "Vaste prijzen" },
                    ].map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-2 text-secondary_on-brand">
                            <Icon className="size-5 text-fg-white opacity-70" aria-hidden />
                            <span className="text-sm font-medium">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

/* ─── 3. Diensten ────────────────────────────────────────────── */
const DIENSTEN = [
    {
        icon: Car01,
        title: "Luchthavenvervoer",
        text: "Stressvrij van deur tot gate. Wij rijden u naar Schiphol, Rotterdam The Hague Airport en meer — altijd op tijd.",
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
        text: "Stations, ziekenhuizen, winkels of afspraken — snel en betrouwbaar door heel Gouda en de regio.",
        href: "/diensten",
        cta: "Meer informatie",
    },
    {
        icon: ThumbsUp,
        title: "Zorgvervoer",
        text: "Vervoer op maat voor mensen met een beperking of zorgvraag. Geduldig, hulpvaardig en met oog voor comfort.",
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
                    Vervoer voor elk moment
                </h2>
                <p className="mt-4 max-w-xl text-lg text-tertiary">
                    Van luchthaventransfers tot zorgvervoer — wij bieden betrouwbaar vervoer voor alle
                    gelegenheden.
                </p>
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
const HOE_STAPPEN = [
    {
        number: "01",
        title: "Vul uw rit in",
        text: "Geef uw ophaaladres, bestemming, datum en tijd op via ons boekingsformulier.",
    },
    {
        number: "02",
        title: "Kies uw voertuig",
        text: "Zie direct de vaste prijs en kies uit onze sedan, business class of taxibus.",
    },
    {
        number: "03",
        title: "Bevestig en ontvang",
        text: "Vul uw gegevens in — uw boeking is direct bevestigd. De chauffeur staat voor u klaar.",
    },
];

const HoeHetWerkt = () => (
    <section className="bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-container px-4 md:px-8">
            <div className="mb-12 flex flex-col items-center text-center md:mb-16">
                <span className="text-sm font-semibold text-brand-secondary md:text-md">Zo eenvoudig</span>
                <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">
                    Online boeken in 3 stappen
                </h2>
                <p className="mt-4 max-w-xl text-lg text-tertiary">
                    In minder dan 2 minuten is uw rit geboekt — vaste prijs, direct bevestigd.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {HOE_STAPPEN.map((stap) => (
                    <div key={stap.number} className="flex flex-col items-center gap-4 text-center">
                        <div className="flex size-14 items-center justify-center rounded-full bg-brand-solid text-2xl font-bold text-white">
                            {stap.number}
                        </div>
                        <h3 className="text-lg font-semibold text-primary">{stap.title}</h3>
                        <p className="text-sm text-tertiary">{stap.text}</p>
                    </div>
                ))}
            </div>

            <div className="mt-12 flex justify-center">
                <Button size="xl" href="/reserveren">
                    Boek nu uw rit
                </Button>
            </div>
        </div>
    </section>
);

/* ─── 5. Voertuigen ──────────────────────────────────────────── */
const VOERTUIGEN = [
    {
        type: "sedan",
        name: "Comfort Sedan",
        description: "Comfortabele sedan voor dagelijkse ritten",
        maxPassengers: 4,
        startPrice: 15,
        features: ["Airconditioning", "Gratis wifi", "USB oplaadpunt"],
    },
    {
        type: "business",
        name: "Business Class",
        description: "Luxe vervoer voor de veeleisende zakenreiziger",
        maxPassengers: 3,
        startPrice: 20,
        features: ["Premium interieur", "Gratis wifi", "Water & snoep", "USB oplaadpunt"],
        highlight: true,
    },
    {
        type: "taxibus",
        name: "Taxi Bus",
        description: "Ruim vervoer voor groepen en grote bagage",
        maxPassengers: 8,
        startPrice: 25,
        features: ["8 passagiers", "Veel bagageruimte", "Airconditioning"],
    },
];

const VoertuigenSection = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="mx-auto max-w-container px-4 md:px-8">
            <div className="mb-12 flex flex-col items-center text-center md:mb-16">
                <span className="text-sm font-semibold text-brand-secondary md:text-md">Onze vloot</span>
                <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">
                    Kies uw voertuig
                </h2>
                <p className="mt-4 max-w-xl text-lg text-tertiary">
                    Voor elke rit het juiste voertuig — van comfortabele sedan tot ruime taxibus.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {VOERTUIGEN.map((v) => (
                    <div
                        key={v.type}
                        className={`relative flex flex-col gap-6 rounded-2xl border-2 p-6 shadow-xs ${
                            v.highlight
                                ? "border-brand bg-brand-primary"
                                : "border-secondary bg-primary"
                        }`}
                    >
                        {v.highlight && (
                            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-solid px-3 py-1 text-xs font-semibold text-white">
                                Meest gekozen
                            </span>
                        )}
                        <div>
                            <h3 className="text-xl font-bold text-primary">{v.name}</h3>
                            <p className="mt-1 text-sm text-tertiary">{v.description}</p>
                        </div>
                        <div className="flex items-end gap-1">
                            <span className="text-3xl font-bold text-primary">v.a. €{v.startPrice}</span>
                            <span className="pb-1 text-sm text-tertiary">/ rit</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-secondary">
                            <Users01 className="size-4" aria-hidden />
                            <span>Max. {v.maxPassengers} passagiers</span>
                        </div>
                        <ul className="flex flex-col gap-2">
                            {v.features.map((f) => (
                                <li key={f} className="flex items-center gap-2 text-sm text-secondary">
                                    <CheckCircle className="size-4 shrink-0 text-success-secondary" aria-hidden />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <Button
                            href="/reserveren"
                            color={v.highlight ? "primary" : "secondary"}
                            className="mt-auto w-full"
                        >
                            Selecteer
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

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
                        luchthaven — altijd dicht bij huis.
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
                        Ook buiten deze plaatsen? Neem contact op — wij rijden door heel Nederland.
                    </p>
                    <Button href="/contact" color="secondary" className="w-fit">
                        Contact opnemen
                    </Button>
                </div>

                <div className="flex items-center justify-center">
                    <img
                        src="/gouda stad.png"
                        alt="Regio Gouda op de kaart"
                        className="h-[300px] w-full rounded-2xl object-cover md:h-[400px]"
                    />
                </div>
            </div>
        </div>
    </section>
);

/* ─── 7. Reviews ─────────────────────────────────────────────── */
const REVIEWS = [
    {
        name: "Ahmed El Mansouri",
        location: "Gouda",
        rating: 5,
        content:
            "Uitstekende service! De chauffeur was op tijd en zeer vriendelijk. De auto was schoon en comfortabel. Zeker een aanrader voor luchthavenvervoer.",
    },
    {
        name: "Petra van der Berg",
        location: "Waddinxveen",
        rating: 5,
        content:
            "Al meerdere keren gebruik gemaakt van YAS TaxiCentrale. Altijd stipt op tijd, vriendelijke chauffeurs en een eerlijke prijs. Mijn vaste taxi voor Schiphol!",
    },
    {
        name: "Mark Janssen",
        location: "Gouda",
        rating: 5,
        content:
            "Zakelijk gebruik ik YAS regelmatig voor klantbezoeken. Professioneel, betrouwbaar en de business class is echt top.",
    },
];

const ReviewsSection = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="mx-auto max-w-container px-4 md:px-8">
            <div className="mb-12 flex flex-col items-center text-center md:mb-16">
                <span className="text-sm font-semibold text-brand-secondary md:text-md">Wat klanten zeggen</span>
                <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">
                    Beoordeeld met 4.9 sterren
                </h2>
                <p className="mt-4 max-w-xl text-lg text-tertiary">
                    Onze klanten waarderen onze betrouwbaarheid, punctualiteit en vriendelijke service.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {REVIEWS.map((r) => (
                    <figure
                        key={r.name}
                        className="flex flex-col gap-5 rounded-2xl border border-secondary bg-primary p-6 shadow-xs"
                    >
                        <div aria-label={`${r.rating} van 5 sterren`} className="flex gap-1">
                            {Array.from({ length: r.rating }).map((_, i) => (
                                <StarIcon key={i} />
                            ))}
                        </div>
                        <blockquote className="flex-1 text-md text-primary">"{r.content}"</blockquote>
                        <figcaption>
                            <p className="font-semibold text-primary">{r.name}</p>
                            <cite className="text-sm text-tertiary not-italic">{r.location}</cite>
                        </figcaption>
                    </figure>
                ))}
            </div>
        </div>
    </section>
);

/* ─── 8. FAQ ─────────────────────────────────────────────────── */
const FAQ_ITEMS = [
    {
        q: "Hoe ver van tevoren moet ik boeken?",
        a: "Minimaal 2 uur van tevoren. Voor luchthaventritten raden wij 24 uur aan. Spoedritten? Bel ons direct.",
    },
    {
        q: "Hoe betaal ik?",
        a: "U betaalt achteraf in de taxi, contant of met pin. Geen online betaling vooraf. U ontvangt een factuur per e-mail.",
    },
    {
        q: "Wat als mijn vlucht vertraging heeft?",
        a: "Wij volgen uw vlucht via het vluchtnummer. Bij vertraging passen wij de ophaaltijd automatisch aan — zonder extra kosten.",
    },
    {
        q: "Rijden jullie ook 's nachts?",
        a: "Ja, 7 dagen per week, 24 uur per dag — inclusief feestdagen. Voor ritten vóór 6:00 of na 23:00 kan een nachttoeslag gelden.",
    },
    {
        q: "Zijn de prijzen inclusief btw?",
        a: "Ja, alle getoonde prijzen zijn inclusief 21% btw. Geen verborgen kosten.",
    },
    {
        q: "Kan ik annuleren?",
        a: "Kosteloos tot 2 uur voor de geplande ophaaltijd. Annuleer altijd telefonisch.",
    },
];

const FaqSection = () => (
    <section className="bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-container px-4 md:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
                <div className="flex flex-col gap-6">
                    <span className="text-sm font-semibold text-brand-secondary md:text-md">FAQ</span>
                    <h2 className="text-display-sm font-semibold text-primary md:text-display-md">
                        Veelgestelde vragen
                    </h2>
                    <p className="text-lg text-tertiary">
                        Staat uw vraag er niet bij? Wij helpen u graag via telefoon.
                    </p>
                    <a
                        href="tel:+31852128302"
                        className="flex w-fit items-center gap-2 font-semibold text-brand-secondary hover:text-brand-secondary_hover"
                    >
                        <Phone className="size-5" aria-hidden />
                        085 212 83 02
                    </a>
                </div>

                <dl className="flex flex-col gap-0 divide-y divide-secondary">
                    {FAQ_ITEMS.map((item) => (
                        <div key={item.q} className="py-5">
                            <dt className="font-semibold text-primary">{item.q}</dt>
                            <dd className="mt-2 text-sm text-tertiary">{item.a}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    </section>
);

/* ─── 9. Metrics ─────────────────────────────────────────────── */
const MetricsSection = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="mx-auto max-w-container px-4 md:px-8">
            <dl className="grid gap-x-4 gap-y-8 border-secondary md:grid-cols-2 md:border-y md:py-16 lg:grid-cols-4">
                {[
                    { value: "10+", label: "Jaar ervaring" },
                    { value: "98%", label: "Op tijd score" },
                    { value: "5000+", label: "Ritten per jaar" },
                    { value: "4.9★", label: "Klanttevredenheid" },
                ].map((item) => (
                    <div key={item.value} className="flex flex-1 flex-col-reverse gap-3 text-center">
                        <dt className="text-lg font-semibold text-primary">{item.label}</dt>
                        <dd className="text-display-lg font-semibold text-brand-secondary md:text-display-xl">
                            {item.value}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    </section>
);

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
                <Button color="secondary" size="xl" href="/contact" className="shadow-xs! ring-0">
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
        <Hero />
        <TrustBar />
        <DienstenSection />
        <HoeHetWerkt />
        <VoertuigenSection />
        <ServiceRegioSection />
        <ReviewsSection />
        <FaqSection />
        <MetricsSection />
        <CtaSection />
        <SectionDivider />
        <YasFooter />
    </div>
);

export default Home;
