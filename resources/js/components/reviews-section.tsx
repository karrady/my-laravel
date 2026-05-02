import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Star01 } from "@untitledui/icons";

import { cx } from "@/utils/cx";

interface ReviewItem {
    id: number;
    author_name: string;
    author_location?: string | null;
    rating: number;
    content: string;
    source?: string | null;
    created_at?: string;
    is_published?: boolean;
}

interface ReviewsSectionProps {
    limit?: number;
    className?: string;
}

const fetchReviews = async (): Promise<ReviewItem[]> => {
    const res = await fetch("/api/v1/reviews", { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error("Reviews ophalen mislukt");
    return res.json();
};

const formatDate = (iso?: string) => {
    if (!iso) return "";
    try {
        return new Date(iso).toLocaleDateString("nl-NL", {
            year: "numeric",
            month: "long",
        });
    } catch {
        return "";
    }
};

const Stars = ({ rating }: { rating: number }) => {
    const clamped = Math.max(0, Math.min(5, Math.round(rating)));
    return (
        <div className="flex items-center gap-0.5" aria-label={`${clamped} van de 5 sterren`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <Star01
                    key={i}
                    className={cx(
                        "size-4",
                        i < clamped ? "fill-current text-warning-primary" : "text-fg-quaternary",
                    )}
                    aria-hidden
                />
            ))}
        </div>
    );
};

export const ReviewsSection = ({ limit = 6, className }: ReviewsSectionProps) => {
    const { data, isLoading } = useQuery<ReviewItem[]>({
        queryKey: ["public-reviews"],
        queryFn: fetchReviews,
    });

    const items = (data ?? []).slice(0, limit);

    const aggregate = (() => {
        if (!data || data.length === 0) return null;
        const total = data.reduce((sum, r) => sum + Number(r.rating || 0), 0);
        const avg = total / data.length;
        return {
            ratingValue: Math.round(avg * 10) / 10,
            reviewCount: data.length,
        };
    })();

    const ldJson = aggregate
        ? {
              "@context": "https://schema.org",
              "@type": "TaxiService",
              name: "YAS TaxiCentrale",
              aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: aggregate.ratingValue,
                  reviewCount: aggregate.reviewCount,
                  bestRating: 5,
                  worstRating: 1,
              },
              review: items.map((r) => ({
                  "@type": "Review",
                  author: { "@type": "Person", name: r.author_name },
                  reviewRating: {
                      "@type": "Rating",
                      ratingValue: r.rating,
                      bestRating: 5,
                      worstRating: 1,
                  },
                  reviewBody: r.content,
              })),
          }
        : null;

    return (
        <section className={cx("bg-secondary py-16 md:py-24", className)}>
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="mb-12 flex flex-col items-center text-center md:mb-16">
                    <span className="text-sm font-semibold text-brand-secondary md:text-md">Reviews</span>
                    <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">
                        Wat onze klanten zeggen
                    </h2>
                    {aggregate && (
                        <div className="mt-4 flex items-center gap-3">
                            <Stars rating={aggregate.ratingValue} />
                            <p className="text-md text-tertiary">
                                <span className="font-semibold text-primary">{aggregate.ratingValue.toFixed(1)}</span>{" "}
                                gemiddeld uit {aggregate.reviewCount} reviews
                            </p>
                        </div>
                    )}
                </div>

                {isLoading && (
                    <p className="text-center text-md text-tertiary">Reviews laden...</p>
                )}

                {!isLoading && items.length === 0 && (
                    <p className="text-center text-md text-tertiary">Geen reviews beschikbaar.</p>
                )}

                {items.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {items.map((r) => (
                            <article
                                key={r.id}
                                className="flex flex-col gap-4 rounded-2xl border border-secondary bg-primary p-6 shadow-xs"
                            >
                                <Stars rating={r.rating} />
                                <p className="text-md text-tertiary">{r.content}</p>
                                <div className="mt-auto flex flex-col gap-0.5">
                                    <p className="text-sm font-semibold text-primary">{r.author_name}</p>
                                    <p className="text-xs text-quaternary">
                                        {[r.author_location, formatDate(r.created_at)].filter(Boolean).join(" · ")}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>

            {ldJson && (
                <Helmet>
                    <script type="application/ld+json">{JSON.stringify(ldJson)}</script>
                </Helmet>
            )}
        </section>
    );
};

export default ReviewsSection;
