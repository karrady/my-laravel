import { useState } from "react";
import { CheckCircle, Clock, HelpCircle, MarkerPin01, Shield01, Star01, X } from "@untitledui/icons";

import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { SectionDivider } from "@/components/shared-assets/section-divider";
import { YasFooter, YasHeader } from "@/components/yas-layout";

interface PricingRowProps {
    from: string;
    to: string;
    price: string;
    note?: string;
    popular?: boolean;
}

const airports = [
    {
        name: "Amsterdam Schiphol",
        code: "AMS",
        image: "/vliegveld.jpg",
        routes: [
            { from: "Gouda Centrum", to: "Schiphol Airport", price: "€ 75", popular: true },
            { from: "Gouda Station", to: "Schiphol Airport", price: "€ 73" },
            { from: "Waddinxveen", to: "Schiphol Airport", price: "€ 80" },
            { from: "Bodegraven", to: "Schiphol Airport", price: "€ 85" },
            { from: "Alphen aan den Rijn", to: "Schiphol Airport", price: "€ 90" },
        ],
    },
    {
        name: "Rotterdam The Hague",
        code: "RTM",
        image: null,
        routes: [
            { from: "Gouda Centrum", to: "Rotterdam The Hague Airport", price: "€ 55", popular: true },
            { from: "Gouda Station", to: "Rotterdam The Hague Airport", price: "€ 53" },
            { from: "Waddinxveen", to: "Rotterdam The Hague Airport", price: "€ 60" },
            { from: "Bodegraven", to: "Rotterdam The Hague Airport", price: "€ 65" },
        ],
    },
    {
        name: "Eindhoven Airport",
        code: "EIN",
        image: null,
        routes: [
            { from: "Gouda Centrum", to: "Eindhoven Airport", price: "€ 130" },
            { from: "Gouda Station", to: "Eindhoven Airport", price: "€ 128" },
            { from: "Waddinxveen", to: "Eindhoven Airport", price: "€ 135" },
        ],
    },
];

const included = [
    "Vluchtvolging — wij weten wanneer u landt",
    "Gratis wachttijd tot 60 minuten bij vertragingen",
    "Ruimte voor koffers en handbagage",
    "Kinder- of rolstoelvriendelijk op aanvraag",
    "Stille rit — geen ongewenste gesprekken",
    "Vaste prijs, geen meter — geen verrassing",
];

const faqs: Array<{ question: string; answer: string }> = [
    {
        question: "Hoe ver van tevoren moet ik reserveren?",
        answer: "Wij adviseren minimaal 24 uur van tevoren te reserveren, maar ook last-minute boekingen zijn mogelijk afhankelijk van beschikbaarheid.",
    },
    {
        question: "Wat als mijn vlucht vertraging heeft?",
        answer: "Wij volgen uw vlucht live. Tot 60 minuten vertraging wachten wij kosteloos. Na 60 minuten geldt een wachtkosten van € 0,50 per minuut.",
    },
    {
        question: "Kan ik meerdere passagiers meenemen?",
        answer: "Ja, wij vervoeren tot 7 passagiers in onze grotere voertuigen. Geef het aantal passagiers op bij het reserveren.",
    },
    {
        question: "Zijn de prijzen inclusief BTW?",
        answer: "Ja, alle vermelde tarieven zijn inclusief BTW en inclusief eventuele parkeer- of tolgelden.",
    },
    {
        question: "Kan ik ook terugboeken?",
        answer: "Absoluut! U kunt zowel een heenreis als terugrit (of beide) bij ons reserveren. Wij halen u op bij de aankomsthal.",
    },
    {
        question: "Zijn er kinderzitjes beschikbaar?",
        answer: "Ja, kinderzitjes zijn beschikbaar op aanvraag. Vermeld de leeftijd en/of gewicht van uw kind bij het reserveren.",
    },
];

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-secondary py-6">
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-start justify-between gap-4 text-left"
                aria-expanded={open}
            >
                <span className="text-md font-semibold text-primary">{question}</span>
                {open ? (
                    <X className="mt-0.5 size-5 shrink-0 text-fg-quaternary" />
                ) : (
                    <HelpCircle className="mt-0.5 size-5 shrink-0 text-fg-quaternary" />
                )}
            </button>
            {open && <p className="mt-3 text-md text-tertiary">{answer}</p>}
        </div>
    );
};

const AirportService = () => {
    const [activeAirport, setActiveAirport] = useState(0);
    const airport = airports[activeAirport];

    return (
        <div className="bg-primary">
            <YasHeader />

            {/* Hero */}
            <section className="py-16 md:py-24" style={{ background: "#0E0E0E" }}>
                <div className="mx-auto max-w-container px-4 md:px-8">
                    <div className="max-w-3xl">
                        <span className="text-sm font-semibold md:text-md" style={{ color: "rgb(255,210,0)" }}>Luchthavenvervoer</span>
                        <h1 className="mt-3 text-display-sm font-semibold text-white md:text-display-md">
                            Stressvrij naar het vliegveld
                        </h1>
                        <p className="mt-4 text-lg md:mt-5 md:text-xl" style={{ color: "#999" }}>
                            Vaste tarieven van Gouda en omstreken naar alle grote Nederlandse luchthavens. Wij volgen uw vlucht en wachten gratis bij vertragingen.
                        </p>
                        <Button size="lg" href="/reserveren" className="mt-8">
                            Nu Reserveren
                        </Button>
                    </div>
                </div>
            </section>

            {/* Pricing tables */}
            <section className="bg-primary py-16 md:py-24">
                <div className="mx-auto max-w-container px-4 md:px-8">
                    <h2 className="text-display-xs font-semibold text-primary md:text-display-sm">Vaste luchthavenprijzen</h2>
                    <p className="mt-3 text-lg text-tertiary">Alle prijzen zijn per rit, inclusief BTW en wachtkosten tot 60 minuten.</p>

                    {/* Airport tabs */}
                    <div className="mt-8 flex gap-2 overflow-x-auto">
                        {airports.map((a, i) => (
                            <button
                                key={a.code}
                                onClick={() => setActiveAirport(i)}
                                className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition duration-100 ease-linear ${
                                    activeAirport === i
                                        ? "bg-brand-solid text-white"
                                        : "bg-secondary text-secondary hover:bg-secondary_hover"
                                }`}
                            >
                                {a.name}
                            </button>
                        ))}
                    </div>

                    {/* Pricing rows */}
                    <div className="mt-6 overflow-hidden rounded-2xl border border-secondary">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-secondary">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Van</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Naar</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-secondary">Prijs</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-secondary"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {airport.routes.map((route, i) => (
                                    <tr key={i} className="border-t border-secondary">
                                        <td className="px-6 py-4 text-md text-primary">{route.from}</td>
                                        <td className="px-6 py-4 text-md text-primary">
                                            {route.to}
                                            {route.popular && (
                                                <Badge color="brand" type="pill-color" size="sm" className="ml-2">
                                                    Meest gevraagd
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right text-lg font-semibold text-primary">{route.price}</td>
                                        <td className="px-6 py-4 text-right">
                                            <Button size="sm" href="/reserveren">
                                                Boeken
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-3 text-sm text-quaternary">* Retourrit? Boek beide ritten en ontvang 5% korting.</p>
                </div>
            </section>

            {/* What's included */}
            <section className="bg-secondary py-16 md:py-24">
                <div className="mx-auto max-w-container px-4 md:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
                        <div>
                            <h2 className="text-display-xs font-semibold text-primary md:text-display-sm">
                                Alles inbegrepen in de prijs
                            </h2>
                            <p className="mt-4 text-lg text-tertiary">
                                Bij YAS TaxiCentrale zijn er geen verborgen kosten. Wat u ziet is wat u betaalt.
                            </p>
                            <ul className="mt-8 flex flex-col gap-4">
                                {included.map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <CheckCircle className="mt-0.5 size-5 shrink-0 text-fg-success-primary" />
                                        <span className="text-md text-secondary">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-6">
                            {[
                                { icon: Clock, title: "Vluchtvolging", text: "Wij monitoren uw vlucht en passen de ophaaltijd automatisch aan bij vertragingen." },
                                { icon: Shield01, title: "Vaste prijs garantie", text: "U betaalt nooit meer dan het afgesproken tarief, ook bij files of omleidingen." },
                                { icon: Star01, title: "4.9/5 beoordeeld", text: "Honderden tevreden klanten gaan u voor. Lees onze reviews op Google." },
                                { icon: MarkerPin01, title: "Deur-tot-deur service", text: "Wij halen u op bij uw voordeur en brengen u direct tot aan de vertrekhal." },
                            ].map(({ icon: Icon, title, text }) => (
                                <div key={title} className="flex gap-4">
                                    <FeaturedIcon icon={Icon} size="md" color="brand" theme="light" className="shrink-0" />
                                    <div>
                                        <h3 className="text-md font-semibold text-primary">{title}</h3>
                                        <p className="mt-1 text-sm text-tertiary">{text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-primary py-16 md:py-24">
                <div className="mx-auto max-w-container px-4 md:px-8">
                    <div className="mx-auto max-w-3xl">
                        <h2 className="text-display-xs font-semibold text-primary md:text-display-sm">Veelgestelde vragen</h2>
                        <div className="mt-8">
                            {faqs.map((faq) => (
                                <FaqItem key={faq.question} {...faq} />
                            ))}
                        </div>
                        <div className="mt-12 rounded-2xl bg-secondary p-8 text-center">
                            <h3 className="text-lg font-semibold text-primary">Andere vraag?</h3>
                            <p className="mt-2 text-md text-tertiary">Neem gerust contact op — wij helpen u graag verder.</p>
                            <div className="mt-6 flex justify-center gap-3">
                                <Button color="secondary" size="md" href="/contact">
                                    Stuur een bericht
                                </Button>
                                <Button size="md" href="tel:+31852128302">
                                    Bel ons direct
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <SectionDivider />
            <YasFooter />
        </div>
    );
};

export default AirportService;
