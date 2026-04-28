import { Car01, CheckCircle, Clock, MarkerPin01, Phone, Shield01, Star01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { YasFooter, YasHeader } from "@/components/yas-layout";

const YELLOW = "rgb(255,210,0)";
const DARK   = "#0E0E0E";

const routes = [
    { from: "Gouda Centrum", price: "€ 75", popular: true },
    { from: "Gouda Station", price: "€ 73" },
    { from: "Waddinxveen", price: "€ 80" },
    { from: "Bodegraven", price: "€ 85" },
    { from: "Alphen aan den Rijn", price: "€ 90" },
    { from: "Reeuwijk", price: "€ 80" },
    { from: "Stolwijk", price: "€ 82" },
    { from: "Boskoop", price: "€ 88" },
];

const TaxiSchiphol = () => (
    <div className="bg-primary">
        <YasHeader />

        {/* Hero */}
        <section className="py-16 md:py-24" style={{ background: DARK }}>
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="max-w-3xl">
                    <span className="text-sm font-semibold" style={{ color: YELLOW }}>Taxi naar Schiphol</span>
                    <h1 className="mt-3 text-display-sm font-semibold text-white md:text-display-md">
                        Taxi Schiphol vanuit Gouda en omgeving — vaste prijs
                    </h1>
                    <p className="mt-4 text-lg md:mt-5 md:text-xl" style={{ color: "#999" }}>
                        YAS TaxiCentrale brengt u stressvrij van Gouda naar Amsterdam Schiphol Airport. Vaste prijs, vluchtvolging inbegrepen, gratis wachttijd tot 60 minuten bij vertraging.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button size="lg" href="/reserveren">Nu Reserveren</Button>
                        <Button size="lg" href="tel:+31852128302" className="!border-white/20 !text-white hover:!bg-white/10" color="secondary">
                            Bel direct
                        </Button>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-4 text-sm" style={{ color: "#777" }}>
                        {["Vluchtvolging inbegrepen", "Gratis wachttijd 60 min", "Vaste prijs — geen meter"].map((t) => (
                            <span key={t} className="flex items-center gap-1.5">
                                <CheckCircle className="size-4 shrink-0" style={{ color: YELLOW }} aria-hidden /> {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* Prijstabel */}
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <h2 className="text-display-xs font-semibold text-primary md:text-display-sm">Vaste prijzen naar Schiphol Airport</h2>
                <p className="mt-3 text-lg text-tertiary">Alle tarieven zijn per rit, inclusief BTW en parkeerkosten.</p>
                <div className="mt-8 overflow-hidden rounded-2xl border border-secondary">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-secondary">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Vertrekplaats</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Bestemming</th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-secondary">Vaste prijs</th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-secondary"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {routes.map((r, i) => (
                                <tr key={i} className="border-t border-secondary">
                                    <td className="px-6 py-4 text-md text-primary">
                                        {r.from}
                                        {r.popular && (
                                            <span className="ml-2 rounded-full px-2 py-0.5 text-xs font-semibold" style={{ background: "rgba(255,210,0,0.15)", color: YELLOW }}>
                                                Meest gevraagd
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-md text-secondary">Amsterdam Schiphol (AMS)</td>
                                    <td className="px-6 py-4 text-right text-lg font-semibold text-primary">{r.price}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Button size="sm" href="/reserveren">Boeken</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mt-3 text-sm text-quaternary">Retourrit? Boek heen- en terugreis en ontvang 5% korting.</p>
            </div>
        </section>

        {/* Inbegrepen */}
        <section className="bg-secondary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
                    <div>
                        <h2 className="text-display-xs font-semibold text-primary md:text-display-sm">Alles inbegrepen</h2>
                        <p className="mt-4 text-lg text-tertiary">Bij YAS TaxiCentrale betaalt u de vaste prijs — geen extra's achteraf.</p>
                        <ul className="mt-8 flex flex-col gap-4">
                            {[
                                "Vluchtvolging — wij weten wanneer u landt",
                                "Gratis wachttijd tot 60 minuten bij vertraging",
                                "Ruimte voor koffers en handbagage",
                                "Deur-tot-deur service — geen overstap",
                                "Kinderzitje op aanvraag",
                                "Stille rit of muziek naar keuze",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <CheckCircle className="mt-0.5 size-5 shrink-0 text-fg-success-primary" />
                                    <span className="text-md text-secondary">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-6">
                        {[
                            { icon: Clock, title: "Vluchtvolging", text: "Wij monitoren uw vlucht live en passen de ophaaltijd automatisch aan bij vertragingen." },
                            { icon: Shield01, title: "Vaste prijs garantie", text: "Geen taximeter, geen files-opslag. U betaalt nooit meer dan het afgesproken tarief." },
                            { icon: Star01, title: "4.9/5 beoordeeld", text: "Honderden klanten uit Gouda gingen u al voor. Lees de reviews op Google." },
                            { icon: MarkerPin01, title: "Deur-tot-deur", text: "Wij halen u op bij uw voordeur en brengen u direct tot aan de vertrekhal op Schiphol." },
                        ].map(({ icon, title, text }) => (
                            <div key={title} className="flex gap-4">
                                <FeaturedIcon icon={icon} size="md" color="brand" theme="light" className="shrink-0" />
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

        {/* CTA */}
        <section className="py-16 md:py-24" style={{ background: DARK }}>
            <div className="mx-auto max-w-container px-4 text-center md:px-8">
                <h2 className="text-display-xs font-semibold text-white md:text-display-sm">
                    Uw taxi naar Schiphol reserveren?
                </h2>
                <p className="mt-4 text-lg" style={{ color: "#999" }}>
                    Boek online in 2 minuten of bel ons. Wij zorgen dat u op tijd bent.
                </p>
                <div className="mt-8 flex justify-center gap-3">
                    <Button size="xl" href="/reserveren">Nu Reserveren</Button>
                    <Button size="xl" href="tel:+31852128302" color="secondary" className="!border-white/20 !text-white hover:!bg-white/10">
                        <Phone className="size-4" aria-hidden /> 085 212 83 02
                    </Button>
                </div>
            </div>
        </section>

        <YasFooter />
    </div>
);

export default TaxiSchiphol;
