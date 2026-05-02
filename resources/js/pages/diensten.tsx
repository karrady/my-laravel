import { Briefcase01, Car01, Clock, Heart, MarkerPin01, Moon01, PhoneCall02, Shield01, ThumbsUp, Users01, Zap } from "@untitledui/icons";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { SectionDivider } from "@/components/shared-assets/section-divider";
import { YasFooter, YasHeader } from "@/components/yas-layout";
import { FaqsSection } from "@/components/faqs-section";

interface FixedPrice {
    id: number;
    from_label: string;
    to_label: string;
    sedan_cents: number;
    business_cents: number;
    taxibus_cents: number;
    is_active: boolean;
    category: "airport" | "local";
}

interface FixedPricesResponse {
    airport: FixedPrice[];
    local: FixedPrice[];
}

const fetchFixedPrices = async (): Promise<FixedPricesResponse> => {
    const res = await fetch("/api/v1/fixed-prices", { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error("Tarieven ophalen mislukt");
    return res.json();
};

const formatEur = (cents: number) => {
    const eur = cents / 100;
    return eur % 1 === 0 ? `€ ${eur.toFixed(0)},-` : `€ ${eur.toFixed(2).replace(".", ",")}`;
};

type ServiceItem = {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
    primaryBtn?: { label: string; href: string };
    secondaryBtn?: { label: string; href: string };
};

const services: ServiceItem[] = [
    {
        icon: Car01,
        title: "Airport Service",
        description:
            "Stressvrij van deur tot gate. Vaste tarieven naar Schiphol en Rotterdam The Hague Airport. Wij volgen uw vlucht en staan op tijd voor de deur.",
        primaryBtn: { label: "Bekijk tarieven", href: "/airport-service" },
        secondaryBtn: { label: "Direct reserveren", href: "/reserveren" },
    },
    {
        icon: Briefcase01,
        title: "Zakelijk Vervoer",
        description:
            "Representatief en punctueel vervoer voor vergaderingen, congressen en zakenreizen. Professionele chauffeurs die u op tijd brengen.",
    },
    {
        icon: Users01,
        title: "Groepsvervoer",
        description:
            "Uitstapjes, bruiloften, vrijgezellenfeesten of een bedrijfsuitje, samen reizen in stijl. Vraag naar de mogelijkheden.",
    },
    {
        icon: MarkerPin01,
        title: "Ritten op Maat",
        description:
            "Ziekenhuis, treinstation, evenement of gewoon thuis, wij rijden u waar u naartoe wilt, door heel Nederland.",
        primaryBtn: { label: "Bekijk tarieven", href: "#ritten-tarieven" },
    },
    {
        icon: Moon01,
        title: "Avond & Nacht",
        description:
            "Veilig en comfortabel thuiskomen na een avondje uit. Wij zijn dag en nacht beschikbaar, ook in het weekend en op feestdagen. Houd er rekening mee dat voor nachtritten een nachttoeslag in rekening kan worden gebracht.",
    },
    {
        icon: Heart,
        title: "Zorgvervoer",
        description:
            "Speciaal voor mensen met een zorgvraag. Hulp bij instappen, rolstoelvervoer op aanvraag en alle tijd die u nodig heeft.",
    },
];

const ServiceCard = ({ icon, title, description, primaryBtn, secondaryBtn }: ServiceItem) => (
    <div className="flex flex-col rounded-2xl border border-secondary bg-primary p-8 shadow-sm">
        <FeaturedIcon icon={icon} size="md" color="brand" theme="light" className="mb-5" />
        <h3 className="mb-3 text-xl font-bold text-primary">{title}</h3>
        <p className="mb-6 flex-grow text-sm leading-relaxed text-tertiary">{description}</p>
        {primaryBtn ? (
            <div className="flex flex-col gap-2">
                <Button size="md" href={primaryBtn.href} className="w-full justify-center">
                    {primaryBtn.label}
                </Button>
                {secondaryBtn && (
                    <Button color="secondary" size="md" href={secondaryBtn.href} className="w-full justify-center">
                        {secondaryBtn.label}
                    </Button>
                )}
            </div>
        ) : (
            <a
                href="tel:+31852128302"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-secondary hover:text-brand-secondary_hover transition duration-100 ease-linear"
            >
                <PhoneCall02 className="size-4" />
                Op aanvraag — bel ons
            </a>
        )}
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
                    { icon: Clock,      title: "Altijd op tijd",       text: "Wij volgen uw vlucht of planning en zijn er voordat u moet vertrekken." },
                    { icon: Zap,        title: "Vaste prijzen",        text: "Geen verrassingen achteraf. Alle tarieven zijn transparant en vooraf bekend." },
                    { icon: ThumbsUp,   title: "Vriendelijke service", text: "Onze chauffeurs zijn gastvrij, behulpzaam en altijd bereid een stapje extra te zetten." },
                    { icon: Car01,      title: "Schone voertuigen",    text: "Comfortabele, goed onderhouden taxi's voor een prettige reis." },
                    { icon: MarkerPin01,title: "Lokale kennis",        text: "Als lokaal bedrijf kennen wij de regio Gouda als geen ander." },
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

const RittenTarievenSection = () => {
    const { data, isLoading } = useQuery<FixedPricesResponse>({
        queryKey: ["public-fixed-prices"],
        queryFn: fetchFixedPrices,
    });

    const local = data?.local ?? [];

    return (
        <section id="ritten-tarieven" className="bg-secondary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <h2 className="text-display-xs font-semibold text-primary md:text-display-sm">Tarieven Ritten op Maat</h2>
                <p className="mt-3 text-lg text-tertiary">Vaste prijzen per rit, inclusief BTW. Sedan voor 1–4 personen, business class voor zakelijk vervoer en taxibus voor groepen.</p>

                {isLoading && (
                    <p className="mt-8 text-md text-tertiary">Tarieven laden...</p>
                )}

                {!isLoading && local.length === 0 && (
                    <p className="mt-8 text-md text-tertiary">Geen tarieven beschikbaar.</p>
                )}

                {local.length > 0 && (
                    <div className="mt-8 overflow-x-auto rounded-2xl border border-secondary bg-primary">
                        <table className="w-full min-w-[640px]">
                            <thead>
                                <tr className="bg-secondary">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Route</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Sedan</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Business</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Taxibus</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-secondary"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {local.map((row) => (
                                    <tr key={row.id} className="border-t border-secondary">
                                        <td className="px-6 py-4 text-md text-primary">
                                            {row.from_label} – {row.to_label}
                                        </td>
                                        <td className="px-6 py-4 text-left text-md font-semibold text-primary">
                                            {formatEur(row.sedan_cents)}
                                        </td>
                                        <td className="px-6 py-4 text-left text-md text-tertiary">
                                            {formatEur(row.business_cents)}
                                        </td>
                                        <td className="px-6 py-4 text-left text-md text-tertiary">
                                            {formatEur(row.taxibus_cents)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button size="sm" href="/reserveren">Boeken</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <p className="mt-3 text-sm text-quaternary">* Voor nachtritten kan een nachttoeslag in rekening worden gebracht. Andere bestemming? Bel ons voor een prijs op maat.</p>
            </div>
        </section>
    );
};

const canonical = (path: string) =>
    typeof window !== "undefined" ? `${window.location.origin}${path}` : path;

const Diensten = () => (
    <div className="bg-primary">
        <Helmet>
            <title>Diensten — YAS TaxiCentrale</title>
            <meta
                name="description"
                content="Onze taxidiensten: airport service, zakelijk vervoer, groepsvervoer, ritten op maat, avond- en nachtritten en zorgvervoer. Vaste tarieven, 24/7 beschikbaar in Gouda en omgeving."
            />
            <link rel="canonical" href={canonical("/diensten")} />
        </Helmet>
        <YasHeader />

        {/* Hero */}
        <section className="py-16 md:py-24" style={{ background: "#0E0E0E" }}>
            <div className="mx-auto max-w-container px-4 md:px-8 text-center">
                <span className="text-sm font-semibold md:text-md" style={{ color: "rgb(255,210,0)" }}>Wat wij bieden</span>
                <h1 className="mt-3 text-display-sm font-semibold text-white md:text-display-md">Onze Diensten</h1>
                <p className="mt-4 mx-auto max-w-2xl text-lg md:mt-5 md:text-xl" style={{ color: "#999" }}>
                    Airport service en ritten op maat met vaste tarieven. Overige ritten op aanvraag.{" "}
                    <a href="tel:+31852128302" style={{ color: "rgb(255,210,0)", fontWeight: 600 }} className="hover:underline">Spoed? Bel ons direct 🚕</a>
                </p>
            </div>
        </section>

        {/* Service cards */}
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((s) => (
                        <ServiceCard key={s.title} {...s} />
                    ))}
                </div>
            </div>
        </section>

        {/* Ritten op Maat tarieven */}
        <RittenTarievenSection />

        {/* Bottom CTA */}
        <section className="bg-secondary py-16">
            <div className="mx-auto max-w-container px-4 md:px-8 text-center">
                <h2 className="text-display-xs font-semibold text-primary md:text-display-sm">Vragen of een speciale rit?</h2>
                <p className="mt-3 text-lg text-tertiary">Bel ons direct, wij zijn 24/7 bereikbaar en helpen u graag verder.</p>
                <div className="mt-8 flex justify-center gap-3">
                    <Button size="lg" href="tel:+31852128302">
                        085 212 83 02
                    </Button>
                    <Button color="secondary" size="lg" href="/contact">
                        Stuur een bericht
                    </Button>
                </div>
            </div>
        </section>

        <WhyYas />
        <FaqsSection />
        <SectionDivider />
        <YasFooter />
    </div>
);

export default Diensten;
