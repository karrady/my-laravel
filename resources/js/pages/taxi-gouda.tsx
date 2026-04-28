import { Car01, CheckCircle, Clock, MarkerPin01, Phone, Shield01, Star01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { YasFooter, YasHeader } from "@/components/yas-layout";

const YELLOW = "rgb(255,210,0)";
const DARK   = "#0E0E0E";

const routes = [
    { from: "Gouda Centrum", to: "Amsterdam", price: "€ 95" },
    { from: "Gouda Station", to: "Schiphol Airport", price: "€ 73" },
    { from: "Gouda", to: "Rotterdam", price: "€ 45" },
    { from: "Gouda", to: "Den Haag", price: "€ 55" },
    { from: "Gouda", to: "Utrecht", price: "€ 50" },
    { from: "Waddinxveen", to: "Schiphol Airport", price: "€ 80" },
];

const TaxiGouda = () => (
    <div className="bg-primary">
        <YasHeader />

        {/* Hero */}
        <section className="py-16 md:py-24" style={{ background: DARK }}>
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="max-w-3xl">
                    <span className="text-sm font-semibold" style={{ color: YELLOW }}>Taxi Gouda</span>
                    <h1 className="mt-3 text-display-sm font-semibold text-white md:text-display-md">
                        Uw persoonlijke vervoerspartner in Gouda en omgeving
                    </h1>
                    <p className="mt-4 text-lg md:mt-5 md:text-xl" style={{ color: "#999" }}>
                        YAS TaxiCentrale is uw betrouwbare taxibedrijf in Gouda. Van luchthaventransfers tot dagelijkse ritten in de regio — altijd op tijd, vaste prijs, 24/7 beschikbaar.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button size="lg" href="/reserveren">Nu Reserveren</Button>
                        <Button size="lg" href="tel:+31852128302" className="!border-white/20 !text-white hover:!bg-white/10" color="secondary">
                            085 212 83 02
                        </Button>
                    </div>
                </div>
            </div>
        </section>

        {/* Vaste tarieven */}
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <h2 className="text-display-xs font-semibold text-primary md:text-display-sm">Vaste tarieven vanuit Gouda</h2>
                <p className="mt-3 text-lg text-tertiary">Geen taximeter, geen verrassingen. De prijs staat van tevoren vast.</p>
                <div className="mt-8 overflow-hidden rounded-2xl border border-secondary">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-secondary">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Van</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Naar</th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-secondary">Vaste prijs</th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-secondary"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {routes.map((r, i) => (
                                <tr key={i} className="border-t border-secondary">
                                    <td className="px-6 py-4 text-md text-primary">{r.from}</td>
                                    <td className="px-6 py-4 text-md text-primary">{r.to}</td>
                                    <td className="px-6 py-4 text-right text-lg font-semibold text-primary">{r.price}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Button size="sm" href="/reserveren">Boeken</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mt-3 text-sm text-quaternary">Prijzen zijn inclusief BTW. Retourrit? Vraag naar onze retourkorting.</p>
            </div>
        </section>

        {/* USPs */}
        <section className="bg-secondary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <h2 className="text-display-xs font-semibold text-primary md:text-display-sm">Waarom YAS TaxiCentrale in Gouda?</h2>
                <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        { icon: Clock, title: "24/7 beschikbaar", text: "Vroege vlucht of late nachtrit — wij staan altijd voor u klaar in heel Gouda en omstreken." },
                        { icon: Shield01, title: "Vaste prijs garantie", text: "Geen taximeter. U weet van tevoren exact wat u betaalt. Geen verborgen kosten." },
                        { icon: Star01, title: "4.9 ★ Google rating", text: "Honderden tevreden klanten uit Gouda gaan u voor. Lees onze reviews." },
                        { icon: Car01, title: "Ruime voertuigen", text: "Comfortabele, schone taxi's met ruimte voor bagage. Tot 7 passagiers mogelijk." },
                        { icon: MarkerPin01, title: "Lokale kennis", text: "Als Gouds taxibedrijf kennen wij elke straat, elk ziekenhuis en elk station." },
                        { icon: CheckCircle, title: "Direct bevestigd", text: "Online boeken en direct uw bevestiging per e-mail ontvangen." },
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

        {/* Werkgebied */}
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="max-w-3xl">
                    <h2 className="text-display-xs font-semibold text-primary md:text-display-sm">Werkgebied — Gouda en de regio Midden-Holland</h2>
                    <p className="mt-4 text-lg text-tertiary">
                        Wij rijden vanuit Gouda door heel de regio Midden-Holland en Rijn en Gouwe. Onze standplaats is Gouda, maar wij komen ook naar u toe in:
                    </p>
                    <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 text-md text-secondary">
                        {["Waddinxveen", "Bodegraven", "Reeuwijk", "Stolwijk", "Moordrecht", "Zevenhuizen", "Boskoop", "Alphen aan den Rijn", "Ouderkerk aan den IJssel"].map((place) => (
                            <li key={place} className="flex items-center gap-2">
                                <MarkerPin01 className="size-4 shrink-0" style={{ color: YELLOW }} aria-hidden />
                                {place}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24" style={{ background: DARK }}>
            <div className="mx-auto max-w-container px-4 text-center md:px-8">
                <h2 className="text-display-xs font-semibold text-white md:text-display-sm">
                    Klaar om te boeken?
                </h2>
                <p className="mt-4 text-lg" style={{ color: "#999" }}>
                    Reserveer online of bel ons direct. Wij staan 7 dagen per week voor u klaar.
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

export default TaxiGouda;
