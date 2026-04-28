import { CheckCircle, Heart, MarkerPin01, Shield01, Star01, ThumbsUp } from "@untitledui/icons";

import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { SectionDivider } from "@/components/shared-assets/section-divider";
import { YasFooter, YasHeader } from "@/components/yas-layout";

const waarden = [
    {
        icon: Shield01,
        title: "Betrouwbaarheid",
        text: "Een afspraak is een afspraak. Wij staan altijd op tijd klaar en communiceren proactief bij onverwachte omstandigheden.",
    },
    {
        icon: Heart,
        title: "Klantgerichtheid",
        text: "Uw comfort en veiligheid staan voorop. Wij luisteren naar uw wensen en passen onze service daar op aan.",
    },
    {
        icon: Star01,
        title: "Kwaliteit",
        text: "Schone voertuigen, vriendelijke chauffeurs en een vlekkeloze rit — dat is onze standaard, niet de uitzondering.",
    },
    {
        icon: MarkerPin01,
        title: "Lokale betrokkenheid",
        text: "Als Gouds bedrijf kennen wij de regio als geen ander en investeren wij in de lokale gemeenschap.",
    },
];

const team = [
    {
        name: "Yassine A.",
        role: "Oprichter & Directeur",
        initials: "YA",
        bio: "Met meer dan 10 jaar ervaring in de taxibranche richtte Yassine YAS TaxiCentrale op met één doel: betrouwbaar en betaalbaar vervoer voor iedereen in de regio Gouda.",
    },
];

const OverOns = () => (
    <div className="bg-primary">
        <YasHeader />

        {/* Hero */}
        <section className="py-16 md:py-24" style={{ background: "#0E0E0E" }}>
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
                    <div className="flex flex-col justify-center">
                        <span className="text-sm font-semibold md:text-md" style={{ color: "rgb(255,210,0)" }}>Over ons</span>
                        <h1 className="mt-3 text-display-sm font-semibold text-white md:text-display-md">
                            Meer dan een taxi — uw vertrouwde reispartner
                        </h1>
                        <p className="mt-4 text-lg md:mt-5 md:text-xl" style={{ color: "#999" }}>
                            YAS TaxiCentrale is opgericht vanuit een persoonlijke passie voor service en betrouwbaarheid. Wij geloven dat goed vervoer meer is dan van A naar B komen — het gaat om de ervaring onderweg.
                        </p>
                        <div className="mt-8 flex gap-3">
                            <Button size="lg" href="/reserveren">
                                Nu Reserveren
                            </Button>
                            <Button color="secondary" size="lg" href="/contact" className="!border-white/20 !text-white hover:!bg-white/10">
                                Neem contact op
                            </Button>
                        </div>
                    </div>
                    <div>
                        <img
                            src="/Gemini_Generated_Image_y6uy9qy6uy9qy6uy.png"
                            alt="YAS TaxiCentrale voertuig"
                            className="h-[400px] w-full rounded-2xl object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>

        {/* Metrics */}
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <dl className="grid gap-x-4 gap-y-8 md:grid-cols-2 md:border-y md:border-secondary md:py-16 lg:grid-cols-4">
                    {[
                        { value: "2014", label: "Opgericht" },
                        { value: "10+", label: "Jaar actief" },
                        { value: "5000+", label: "Ritten per jaar" },
                        { value: "4.9★", label: "Google rating" },
                    ].map((item) => (
                        <div key={item.value} className="flex flex-1 flex-col-reverse gap-3 text-center">
                            <dt className="text-lg font-semibold text-primary">{item.label}</dt>
                            <dd className="text-display-lg font-semibold text-primary md:text-display-xl">{item.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>

        {/* Verhaal */}
        <section className="bg-secondary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="mx-auto max-w-3xl">
                    <span className="text-sm font-semibold text-brand-secondary md:text-md">Ons verhaal</span>
                    <h2 className="mt-3 text-display-xs font-semibold text-primary md:text-display-sm">
                        Geboren uit een passie voor service
                    </h2>
                    <div className="mt-6 space-y-4 text-lg text-tertiary">
                        <p>
                            YAS TaxiCentrale werd in 2014 opgericht door Yassine — een Goudenaar met een diepe overtuiging dat klanten meer verdienen dan een gewone taxirit. Vanuit een eenmanszaak groeide het bedrijf uit tot een vertrouwde naam in de regio.
                        </p>
                        <p>
                            Wat begon met luchthaventransfers is uitgegroeid tot een volledig dienstenpakket: van zakelijk vervoer tot zorgritten. Elk jaar bedienen wij duizenden klanten die terugkeren vanwege onze betrouwbaarheid en persoonlijke aanpak.
                        </p>
                        <p>
                            Als lokaal bedrijf investeren wij ook in de gemeenschap. Wij werken samen met lokale zorginstanties en bieden speciale tarieven aan voor regelmatige zorgritten.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* Waarden */}
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="text-center">
                    <h2 className="text-display-xs font-semibold text-primary md:text-display-sm">Onze waarden</h2>
                    <p className="mt-4 text-lg text-tertiary">Dit zijn de principes die elke rit bij YAS TaxiCentrale sturen.</p>
                </div>
                <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
                    {waarden.map(({ icon, title, text }) => (
                        <div key={title} className="flex gap-4 rounded-2xl border border-secondary p-6">
                            <FeaturedIcon icon={icon} size="md" color="brand" theme="light" className="shrink-0" />
                            <div>
                                <h3 className="text-lg font-semibold text-primary">{title}</h3>
                                <p className="mt-2 text-md text-tertiary">{text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Google Reviews — widget te koppelen via Google Business Profile */}
        <section className="bg-secondary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <h2 className="text-display-xs font-semibold text-primary md:text-display-sm">Wat onze klanten zeggen</h2>
                <div id="google-reviews-widget" className="mt-12 w-full" />
            </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-section py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 text-center md:px-8">
                <h2 className="text-display-xs font-semibold text-primary_on-brand md:text-display-sm">
                    Maak kennis met ons team
                </h2>
                <p className="mt-4 text-lg text-tertiary_on-brand">
                    Heeft u vragen of wilt u meer weten over onze diensten? Wij staan voor u klaar.
                </p>
                <div className="mt-8 flex justify-center gap-3">
                    <Button color="secondary" size="xl" href="/contact" className="shadow-xs! ring-0">
                        Neem contact op
                    </Button>
                    <Button size="xl" href="/reserveren">
                        Nu Reserveren
                    </Button>
                </div>
            </div>
        </section>

        <SectionDivider />
        <YasFooter />
    </div>
);

export default OverOns;
