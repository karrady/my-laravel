import { Car01, CheckCircle, Clock, Heart, MarkerPin01, Shield01, ThumbsUp, Zap } from "@untitledui/icons";

import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { SectionDivider } from "@/components/shared-assets/section-divider";
import { YasFooter, YasHeader } from "@/components/yas-layout";

const services = [
    {
        icon: Car01,
        title: "Luchthavenvervoer",
        description:
            "Wij verzorgen transfers naar alle grote luchthavens: Schiphol, Rotterdam The Hague Airport en Eindhoven Airport. U geeft ons uw vluchtgegevens en wij zorgen dat u altijd op tijd aankomt. Terugkeerservice met vluchtvolging inbegrepen.",
        features: [
            "Schiphol, Rotterdam & Eindhoven",
            "Vluchtvolging inbegrepen",
            "Gratis wacht bij vertraging",
            "Vaste prijzen zonder verrassingen",
        ],
        href: "/airport-service",
        cta: "Bekijk luchthavenprijzen",
        color: "brand" as const,
    },
    {
        icon: Shield01,
        title: "Zakelijk Vervoer",
        description:
            "Representatief en punctueel vervoer voor zakenrelaties, vergaderingen en congressen. Wij bieden maandelijkse facturatie voor vaste zakelijke klanten en zorgen voor een professionele indruk bij elke gelegenheid.",
        features: [
            "Maandelijkse facturatie beschikbaar",
            "Vaste chauffeur op aanvraag",
            "Representatieve voertuigen",
            "Discreet en betrouwbaar",
        ],
        href: "/reserveren",
        cta: "Zakelijk reserveren",
        color: "gray" as const,
    },
    {
        icon: MarkerPin01,
        title: "Regionaal Vervoer",
        description:
            "Van station naar huis, van arts naar apotheek — wij rijden u veilig en comfortabel door de hele regio Gouda. Ook voor boodschappen, uitstapjes of afspraken die u zelf niet kunt bereiken.",
        features: [
            "Heel Gouda en omstreken",
            "Stations en ziekenhuizen",
            "Avond- en nachtritten",
            "Telefonisch reserveren mogelijk",
        ],
        href: "/reserveren",
        cta: "Rit reserveren",
        color: "gray" as const,
    },
    {
        icon: Heart,
        title: "Zorgvervoer",
        description:
            "Speciaal voor mensen met een beperking of zorgvraag. Wij bieden hulp bij instappen, vervoer met rolstoel op aanvraag en nemen de tijd die u nodig heeft. Uw comfort en veiligheid staan centraal.",
        features: [
            "Hulp bij in- en uitstappen",
            "Rolstoelvervoer op aanvraag",
            "Geduldig en zorgzaam",
            "WMO-indicatie geaccepteerd",
        ],
        href: "/reserveren",
        cta: "Zorgrit plannen",
        color: "gray" as const,
    },
];

const PageHero = () => (
    <section className="py-16 md:py-24" style={{ background: "#0E0E0E" }}>
        <div className="mx-auto max-w-container px-4 md:px-8">
            <div className="max-w-3xl">
                <span className="text-sm font-semibold md:text-md" style={{ color: "rgb(255,210,0)" }}>Onze diensten</span>
                <h1 className="mt-3 text-display-sm font-semibold text-white md:text-display-md">
                    Vervoer voor elk moment en elke gelegenheid
                </h1>
                <p className="mt-4 text-lg md:mt-5 md:text-xl" style={{ color: "#999" }}>
                    YAS TaxiCentrale biedt betrouwbaar taxivervoer in Gouda en omstreken. Of het nu gaat om een luchthaventransfer, zakelijk vervoer of zorgrit — wij staan voor u klaar.
                </p>
                <div className="mt-8 flex gap-3">
                    <Button size="lg" href="/reserveren">
                        Nu Reserveren
                    </Button>
                    <Button color="secondary" size="lg" href="/contact" className="!border-white/20 !text-white hover:!bg-white/10">
                        Vraag & Antwoord
                    </Button>
                </div>
            </div>
        </div>
    </section>
);

const ServiceCard = ({
    icon,
    title,
    description,
    features,
    href,
    cta,
    color,
}: (typeof services)[number]) => (
    <div className="flex flex-col gap-6 rounded-2xl border border-secondary bg-primary p-8">
        <FeaturedIcon icon={icon} size="lg" color={color} theme={color === "brand" ? "light" : "modern"} />
        <div>
            <h2 className="text-xl font-semibold text-primary">{title}</h2>
            <p className="mt-2 text-md text-tertiary">{description}</p>
        </div>
        <ul className="flex flex-col gap-2">
            {features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-md text-secondary">
                    <CheckCircle className="size-4 shrink-0 text-fg-success-primary" />
                    {f}
                </li>
            ))}
        </ul>
        <Button color="primary" size="md" href={href} className="mt-auto w-fit">
            {cta}
        </Button>
    </div>
);

const WhyYas = () => (
    <section className="bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-container px-4 md:px-8">
            <div className="text-center">
                <h2 className="text-display-sm font-semibold text-primary md:text-display-md">Waarom YAS TaxiCentrale?</h2>
                <p className="mt-4 text-lg text-tertiary">Wij onderscheiden ons door kwaliteit, betrouwbaarheid en persoonlijke service.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[
                    { icon: Clock, title: "Altijd op tijd", text: "Wij volgen uw vlucht of planning en zijn er voordat u vertrekken moet." },
                    { icon: Shield01, title: "Volledig verzekerd", text: "Al onze chauffeurs en voertuigen zijn volledig verzekerd voor uw gemoedsrust." },
                    { icon: Zap, title: "Vaste prijzen", text: "Geen verrassingen achteraf. Alle tarieven zijn transparant en vooraf bekend." },
                    { icon: ThumbsUp, title: "Vriendelijke service", text: "Onze chauffeurs zijn gastvrij, behulpzaam en altijd bereid een stapje extra te zetten." },
                    { icon: Car01, title: "Schone voertuigen", text: "Comfortabele, goed onderhouden taxi's voor een prettige reis." },
                    { icon: MarkerPin01, title: "Lokale kennis", text: "Als lokaal bedrijf kennen wij de regio Gouda als geen ander." },
                ].map(({ icon: Icon, title, text }) => (
                    <div key={title} className="flex gap-4">
                        <FeaturedIcon icon={Icon} size="md" color="gray" theme="modern" className="shrink-0" />
                        <div>
                            <h3 className="text-md font-semibold text-primary">{title}</h3>
                            <p className="mt-1 text-sm text-tertiary">{text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const Diensten = () => (
    <div className="bg-primary">
        <YasHeader />
        <PageHero />
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {services.map((s) => (
                        <ServiceCard key={s.title} {...s} />
                    ))}
                </div>
            </div>
        </section>
        <WhyYas />
        <SectionDivider />
        <YasFooter />
    </div>
);

export default Diensten;
