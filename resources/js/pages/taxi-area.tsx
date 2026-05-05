import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Clock, MarkerPin01, Shield01 } from "@untitledui/icons";

import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { SectionDivider } from "@/components/shared-assets/section-divider";
import { YasFooter, YasHeader } from "@/components/yas-layout";
import { FaqsSection } from "@/components/faqs-section";
import { ReviewsSection } from "@/components/reviews-section";

interface PopularRoute {
    from: string;
    to: string;
    price_eur: number;
}

interface ServiceArea {
    id: number;
    name: string;
    slug: string;
    description_short?: string | null;
    description_nl?: string | null;
    lat?: number;
    lng?: number;
    meta_title?: string | null;
    meta_description?: string | null;
    hero_subtitle?: string | null;
    intro_html?: string | null;
    popular_routes?: PopularRoute[] | null;
    is_published?: boolean;
}

const fetchServiceArea = async (slug: string): Promise<ServiceArea> => {
    const res = await fetch(`/api/v1/service-areas/${slug}`, {
        headers: { Accept: "application/json" },
    });
    if (res.status === 404) {
        const err = new Error("Niet gevonden");
        (err as Error & { status?: number }).status = 404;
        throw err;
    }
    if (!res.ok) throw new Error("Servicegebied ophalen mislukt");
    return res.json();
};

const formatEur = (value: number) => {
    return value % 1 === 0 ? `€ ${value.toFixed(0)},-` : `€ ${value.toFixed(2).replace(".", ",")}`;
};

const canonicalFor = (slug: string) =>
    typeof window !== "undefined" ? `${window.location.origin}/taxi/${slug}` : `/taxi/${slug}`;

const USPS = [
    {
        icon: Clock,
        title: "Altijd op tijd",
        text: "Wij plannen ruim en staan altijd op tijd klaar.",
    },
    {
        icon: Shield01,
        title: "Vaste prijs",
        text: "Geen meter, geen verrassingen. U weet vooraf wat de rit kost.",
    },
    {
        icon: MarkerPin01,
        title: "Lokale kennis",
        text: "Onze chauffeurs kennen de regio op hun duimpje, ook bij omleidingen of files.",
    },
];

const NotFound = () => (
    <div className="bg-primary">
        <Helmet>
            <title>Servicegebied niet gevonden | YAS TaxiCentrale</title>
            <meta name="robots" content="noindex" />
        </Helmet>
        <YasHeader />
        <section className="py-24 md:py-32">
            <div className="mx-auto max-w-container px-4 md:px-8 text-center">
                <h1 className="text-display-sm font-semibold text-primary md:text-display-md">
                    Servicegebied niet gevonden
                </h1>
                <p className="mt-4 text-lg text-tertiary">
                    Dit servicegebied bestaat niet of is niet langer beschikbaar.
                </p>
                <div className="mt-8 flex justify-center gap-3">
                    <Button size="lg" href="/">Terug naar home</Button>
                    <Button color="secondary" size="lg" href="/contact">Neem contact op</Button>
                </div>
            </div>
        </section>
        <SectionDivider />
        <YasFooter />
    </div>
);

const Loading = () => (
    <div className="bg-primary">
        <YasHeader />
        <section className="py-24 md:py-32">
            <div className="mx-auto max-w-container px-4 md:px-8 text-center">
                <p className="text-md text-tertiary">Servicegebied laden...</p>
            </div>
        </section>
        <SectionDivider />
        <YasFooter />
    </div>
);

const TaxiArea = () => {
    const { slug } = useParams<{ slug: string }>();

    const { data: area, isLoading, error } = useQuery<ServiceArea>({
        queryKey: ["public-service-area", slug],
        queryFn: () => fetchServiceArea(slug!),
        enabled: Boolean(slug),
        retry: false,
    });

    if (isLoading) return <Loading />;
    if (error || !area) return <NotFound />;

    const title = area.meta_title || `Taxi ${area.name} | YAS TaxiCentrale`;
    const description =
        area.meta_description ||
        `Betrouwbaar taxivervoer in ${area.name} met vaste tarieven. Boek online of bel 085 212 83 02. 24/7 beschikbaar.`;
    const heroSubtitle =
        area.hero_subtitle || `Uw vaste taxi in ${area.name} - 24/7 beschikbaar met vaste tarieven.`;

    const placeLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `https://yastaxicentrale.nl/taxi/${area.slug}#localbusiness`,
        name: `YAS TaxiCentrale - Taxi ${area.name}`,
        description,
        url: canonicalFor(area.slug),
        telephone: "+31852128302",
        priceRange: "€€",
        address: {
            "@type": "PostalAddress",
            addressLocality: area.name,
            addressCountry: "NL",
        },
        ...(area.lat && area.lng
            ? {
                  geo: {
                      "@type": "GeoCoordinates",
                      latitude: area.lat,
                      longitude: area.lng,
                  },
              }
            : {}),
        areaServed: { "@type": "City", name: area.name },
    };

    return (
        <div className="bg-primary">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={canonicalFor(area.slug)} />
                <script type="application/ld+json">{JSON.stringify(placeLd)}</script>
            </Helmet>

            <YasHeader />

            {/* Hero */}
            <section className="py-16 md:py-24" style={{ background: "#0E0E0E" }}>
                <div className="mx-auto max-w-container px-4 md:px-8">
                    <div className="max-w-3xl">
                        <span className="text-sm font-semibold md:text-md" style={{ color: "rgb(255,210,0)" }}>
                            Taxi {area.name}
                        </span>
                        <h1 className="mt-3 text-display-sm font-semibold text-white md:text-display-md">
                            Taxi in {area.name}
                        </h1>
                        <p className="mt-4 text-lg md:mt-5 md:text-xl" style={{ color: "#999" }}>
                            {heroSubtitle}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Button size="lg" href={`/reserveren?from=${encodeURIComponent(area.slug)}`}>
                                Reserveer een taxi
                            </Button>
                            <Button
                                size="lg"
                                color="secondary"
                                href="tel:+31852128302"
                                className="!border-white/20 !text-white hover:!bg-white/10"
                            >
                                085 212 83 02
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Intro */}
            {area.intro_html && (
                <section className="bg-primary py-16 md:py-24">
                    <div className="mx-auto max-w-container px-4 md:px-8">
                        <div
                            className="prose prose-lg max-w-3xl text-lg text-tertiary [&_p]:mt-4 [&_strong]:font-semibold [&_strong]:text-primary"
                            dangerouslySetInnerHTML={{ __html: area.intro_html }}
                        />
                    </div>
                </section>
            )}

            {/* Populaire routes */}
            {area.popular_routes && area.popular_routes.length > 0 && (
                <section className="bg-secondary py-16 md:py-24">
                    <div className="mx-auto max-w-container px-4 md:px-8">
                        <h2 className="text-display-xs font-semibold text-primary md:text-display-sm">
                            Populaire routes vanuit {area.name}
                        </h2>
                        <p className="mt-3 text-lg text-tertiary">
                            Vaste tarieven voor de meest geboekte ritten. Inclusief BTW.
                        </p>
                        <div className="mt-8 overflow-x-auto rounded-2xl border border-secondary bg-primary">
                            <table className="w-full min-w-[480px]">
                                <thead>
                                    <tr className="bg-secondary">
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Vanaf</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Bestemming</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Vanaf</th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-secondary"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {area.popular_routes.map((r, i) => (
                                        <tr key={i} className="border-t border-secondary">
                                            <td className="px-6 py-4 text-md text-primary">{r.from}</td>
                                            <td className="px-6 py-4 text-md text-primary">{r.to}</td>
                                            <td className="px-6 py-4 text-md font-semibold text-primary">
                                                {formatEur(r.price_eur)}
                                            </td>
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
            )}

            {/* USPs */}
            <section className="bg-primary py-16 md:py-24">
                <div className="mx-auto max-w-container px-4 md:px-8">
                    <div className="text-center">
                        <h2 className="text-display-xs font-semibold text-primary md:text-display-sm">
                            Waarom YAS TaxiCentrale in {area.name}?
                        </h2>
                        <p className="mt-4 text-lg text-tertiary">
                            Wij combineren lokale kennis met vaste prijzen en 24/7 service.
                        </p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                        {USPS.map(({ icon, title, text }) => (
                            <div key={title} className="flex gap-4 rounded-2xl border border-secondary bg-primary p-6">
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

            <FaqsSection />
            <ReviewsSection />
            <SectionDivider />
            <YasFooter />
        </div>
    );
};

export default TaxiArea;
