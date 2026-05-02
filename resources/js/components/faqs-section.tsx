import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { ChevronDown } from "@untitledui/icons";

import { cx } from "@/utils/cx";

interface FaqItem {
    id: number;
    question_nl: string;
    answer_nl: string;
    question_en?: string | null;
    answer_en?: string | null;
    sort_order?: number;
    is_published?: boolean;
}

interface FaqsSectionProps {
    limit?: number;
    className?: string;
}

const fetchFaqs = async (): Promise<FaqItem[]> => {
    const res = await fetch("/api/v1/faqs", { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error("FAQ ophalen mislukt");
    return res.json();
};

export const FaqsSection = ({ limit, className }: FaqsSectionProps) => {
    const { data, isLoading } = useQuery<FaqItem[]>({
        queryKey: ["public-faqs"],
        queryFn: fetchFaqs,
    });

    const items = (data ?? []).slice(0, limit);

    const ldJson = items.length > 0
        ? {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: items.map((f) => ({
                  "@type": "Question",
                  name: f.question_nl,
                  acceptedAnswer: {
                      "@type": "Answer",
                      text: f.answer_nl,
                  },
              })),
          }
        : null;

    return (
        <section className={cx("bg-primary py-16 md:py-24", className)}>
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="mb-12 flex flex-col items-center text-center md:mb-16">
                    <span className="text-sm font-semibold text-brand-secondary md:text-md">FAQ</span>
                    <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">
                        Veelgestelde vragen
                    </h2>
                    <p className="mt-4 max-w-2xl text-lg text-tertiary">
                        Antwoorden op de meest gestelde vragen over onze taxiservice.
                    </p>
                </div>

                {isLoading && (
                    <p className="text-center text-md text-tertiary">Vragen laden...</p>
                )}

                {!isLoading && items.length === 0 && (
                    <p className="text-center text-md text-tertiary">Geen vragen beschikbaar.</p>
                )}

                {items.length > 0 && (
                    <div className="mx-auto max-w-3xl divide-y divide-secondary rounded-2xl border border-secondary bg-primary">
                        {items.map((faq) => (
                            <details key={faq.id} className="group px-6 py-5">
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-md font-semibold text-primary [&::-webkit-details-marker]:hidden">
                                    <span>{faq.question_nl}</span>
                                    <ChevronDown
                                        className="size-5 shrink-0 text-fg-quaternary transition-transform duration-200 group-open:rotate-180"
                                        aria-hidden
                                    />
                                </summary>
                                <p className="mt-3 text-md text-tertiary">{faq.answer_nl}</p>
                            </details>
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

export default FaqsSection;
