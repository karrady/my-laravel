import { useState } from "react";
import { CheckCircle, Clock, MarkerPin01, Shield01 } from "@untitledui/icons";

import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { SectionDivider } from "@/components/shared-assets/section-divider";
import { YasFooter, YasHeader } from "@/components/yas-layout";


const airports = [
    {
        name: "Amsterdam Schiphol",
        code: "AMS",
        locations: [
            { place: "Ammerstol",                price: "€ 105,-" },
            { place: "Bergambacht",               price: "€ 95,-"  },
            { place: "Berkenwoude",               price: "€ 100,-" },
            { place: "Bodegraven",                price: "€ 75,-"  },
            { place: "Boskoop",                   price: "€ 75,-"  },
            { place: "Gouda",                     price: "€ 75,-",  popular: true },
            { place: "Gouderak",                  price: "€ 90,-"  },
            { place: "Haastrecht",                price: "€ 90,-"  },
            { place: "Krimpen a/d IJssel",        price: "€ 120,-" },
            { place: "Lekkerkerk",                price: "€ 120,-" },
            { place: "Moordrecht",                price: "€ 85,-"  },
            { place: "Nieuwerkerk a/d IJssel",    price: "€ 100,-" },
            { place: "Ouderkerk a/d IJssel",      price: "€ 110,-" },
            { place: "Oudewater",                 price: "€ 110,-" },
            { place: "Reeuwijk",                  price: "€ 75,-"  },
            { place: "Reeuwijk Sluipwijk",        price: "€ 85,-"  },
            { place: "Schoonhoven",               price: "€ 115,-" },
            { place: "Stolwijk",                  price: "€ 90,-"  },
            { place: "Vlist",                     price: "€ 100,-" },
            { place: "Waddinxveen",               price: "€ 75,-"  },
            { place: "Waddinxveen Zuidplas",      price: "€ 80,-"  },
            { place: "Zevenhuizen / Moerkapelle", price: "€ 100,-" },
        ],
    },
    {
        name: "Rotterdam The Hague",
        code: "RTM",
        locations: [
            { place: "Ammerstol",                price: "€ 90,-"  },
            { place: "Bergambacht",               price: "€ 85,-"  },
            { place: "Berkenwoude",               price: "€ 90,-"  },
            { place: "Bodegraven",                price: "€ 85,-"  },
            { place: "Boskoop",                   price: "€ 90,-"  },
            { place: "Gouda",                     price: "€ 65,-",  popular: true },
            { place: "Gouderak",                  price: "€ 75,-"  },
            { place: "Haastrecht",                price: "€ 75,-"  },
            { place: "Krimpen a/d IJssel",        price: "€ 90,-"  },
            { place: "Lekkerkerk",                price: "€ 90,-"  },
            { place: "Moerdrecht",                price: "€ 65,-"  },
            { place: "Moerkapelle",               price: "€ 85,-"  },
            { place: "Nieuwerkerk a/d IJssel",    price: "€ 65,-"  },
            { place: "Ouderkerk a/d IJssel",      price: "€ 90,-"  },
            { place: "Oudewater",                 price: "€ 105,-" },
            { place: "Reeuwijk",                  price: "€ 75,-"  },
            { place: "Reeuwijk Sluipwijk",        price: "€ 85,-"  },
            { place: "Schoonhoven",               price: "€ 105,-" },
            { place: "Stolwijk",                  price: "€ 80,-"  },
            { place: "Vlist",                     price: "€ 85,-"  },
            { place: "Waddinxveen",               price: "€ 75,-"  },
            { place: "Waddinxveen Noord",         price: "€ 80,-"  },
            { place: "Zevenhuizen",               price: "€ 80,-"  },
        ],
    },
];

const included = [
    "Vluchtvolging: wij weten wanneer u landt",
    "Aanpassing ophaaltijd bij vluchtvertraging",
    "Ruimte voor koffers en handbagage",
    "Kinder- of rolstoelvriendelijk op aanvraag",
    "Stille rit zonder ongewenste gesprekken",
    "Vaste prijs, geen meter, geen verrassing",
];


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
                            Vaste tarieven naar Schiphol en Rotterdam Airport. Staat uw locatie er niet bij, of wilt u naar een andere luchthaven? Vraag vrijblijvend naar de mogelijkheden.
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
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Opstapplaats</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Prijs (1–4 pers.)</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-secondary"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {airport.locations.map((loc, i) => (
                                    <tr key={i} className="border-t border-secondary">
                                        <td className="px-6 py-4 text-md text-primary">
                                            {loc.place}
                                            {loc.popular && (
                                                <Badge color="brand" type="pill-color" size="sm" className="ml-2">
                                                    Meest gevraagd
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-left text-lg font-semibold text-primary">{loc.price}</td>
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

                    {/* Other airports CTA */}
                    <div className="mt-8 rounded-2xl border border-secondary bg-secondary p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <p className="text-md font-semibold text-primary">Andere luchthaven of bestemming?</p>
                            <p className="mt-1 text-sm text-tertiary">Staat uw vertrekplaats of luchthaven er niet bij? Vraag vrijblijvend een offerte op.</p>
                        </div>
                        <div className="flex shrink-0 gap-3">
                            <Button color="secondary" size="md" href="/contact">
                                Offerte aanvragen
                            </Button>
                            <Button size="md" href="tel:+31852128302">
                                Bel ons
                            </Button>
                        </div>
                    </div>
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

            {/* Contact CTA */}
            <section className="bg-primary py-16 md:py-24">
                <div className="mx-auto max-w-container px-4 md:px-8">
                    <div className="mx-auto max-w-2xl rounded-2xl bg-secondary p-8 md:p-12 text-center">
                        <h2 className="text-display-xs font-semibold text-primary md:text-display-sm">Heeft u een vraag?</h2>
                        <p className="mt-3 text-lg text-tertiary">Neem direct contact op via WhatsApp of bel ons. Wij helpen u snel verder.</p>
                        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                            <Button size="lg" href="https://wa.me/31852128302" target="_blank" rel="noopener noreferrer">
                                WhatsApp
                            </Button>
                            <Button color="secondary" size="lg" href="tel:+31852128302">
                                085 212 83 02
                            </Button>
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
