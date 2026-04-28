import { CheckCircle, Clock, MarkerPin01, Phone, Shield01, Star01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { YasFooter, YasHeader } from "@/components/yas-layout";

const YELLOW = "rgb(255,210,0)";
const DARK   = "#0E0E0E";

const routes = [
    { from: "Gouda Centrum", price: "€ 55", popular: true },
    { from: "Gouda Station", price: "€ 53" },
    { from: "Waddinxveen", price: "€ 60" },
    { from: "Bodegraven", price: "€ 65" },
    { from: "Alphen aan den Rijn", price: "€ 70" },
    { from: "Reeuwijk", price: "€ 58" },
];

const TaxiRotterdamAirport = () => (
    <div className="bg-primary">
        <YasHeader />

        {/* Hero */}
        <section className="py-16 md:py-24" style={{ background: DARK }}>
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="max-w-3xl">
                    <span className="text-sm font-semibold" style={{ color: YELLOW }}>Taxi Rotterdam Airport</span>
                    <h1 className="mt-3 text-display-sm font-semibold text-white md:text-display-md">
                        Taxi Rotterdam The Hague Airport — vaste prijs vanuit Gouda
                    </h1>
                    <p className="mt-4 text-lg md:mt-5 md:text-xl" style={{ color: "#999" }}>
                        Betrouwbaar taxivervoer van Gouda en omstreken naar Rotterdam The Hague Airport (RTM). Sneller dan Schiphol, vaste prijs, vluchtvolging inbegrepen.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button size="lg" href="/reserveren">Nu Reserveren</Button>
                        <Button size="lg" href="tel:+31852128302" className="!border-white/20 !text-white hover:!bg-white/10" color="secondary">
                            Bel direct
                        </Button>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-4 text-sm" style={{ color: "#777" }}>
                        {["Vluchtvolging inbegrepen", "Gratis wachttijd 60 min", "Dichtstbijzijnde luchthaven"].map((t) => (
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
                <h2 className="text-display-xs font-semibold text-primary md:text-display-sm">Vaste prijzen naar Rotterdam The Hague Airport</h2>
                <p className="mt-3 text-lg text-tertiary">Inclusief BTW, parkeerkosten en wachttijd tot 60 minuten.</p>
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
                                    <td className="px-6 py-4 text-md text-secondary">Rotterdam The Hague Airport (RTM)</td>
                                    <td className="px-6 py-4 text-right text-lg font-semibold text-primary">{r.price}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Button size="sm" href="/reserveren">Boeken</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        {/* Voordelen */}
        <section className="bg-secondary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <h2 className="text-display-xs font-semibold text-primary md:text-display-sm">Voordelen Rotterdam Airport boven Schiphol</h2>
                <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
                    {[
                        { icon: Clock, title: "Kortere reistijd", text: "Rotterdam Airport ligt dichter bij Gouda dan Schiphol — u bent sneller ter plaatse en heeft minder stress." },
                        { icon: Shield01, title: "Rustigere terminal", text: "Rotterdam heeft kortere wachtrijen bij security en bij bagageafhandeling." },
                        { icon: Star01, title: "Lagere prijs", text: "Taxi naar Rotterdam Airport is goedkoper dan naar Schiphol — bespaar op uw reiskosten." },
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
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24" style={{ background: DARK }}>
            <div className="mx-auto max-w-container px-4 text-center md:px-8">
                <h2 className="text-display-xs font-semibold text-white md:text-display-sm">
                    Taxi Rotterdam Airport reserveren?
                </h2>
                <p className="mt-4 text-lg" style={{ color: "#999" }}>
                    Boek online of bel ons direct. Wij zorgen dat u op tijd bij Rotterdam Airport aankomt.
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

export default TaxiRotterdamAirport;
