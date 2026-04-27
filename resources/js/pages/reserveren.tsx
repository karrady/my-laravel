import { Car01, CheckCircle, Clock, MarkerPin01 } from "@untitledui/icons";

import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { SectionDivider } from "@/components/shared-assets/section-divider";
import { YasFooter, YasHeader } from "@/components/yas-layout";
import { Step1Rit } from "@/components/booking/step-1-rit";
import { Step2Voertuig } from "@/components/booking/step-2-voertuig";
import { Step3Contact } from "@/components/booking/step-3-contact";
import { Step4Bevestiging } from "@/components/booking/step-4-bevestiging";
import { StepIndicator } from "@/components/booking/step-indicator";
import { useBookingStore } from "@/stores/booking-store";

const USP_ITEMS = [
    { icon: CheckCircle, title: "Gratis annuleren", text: "Tot 2 uur voor de rit kosteloos annuleren." },
    { icon: Clock, title: "Directe bevestiging", text: "Online boeken en direct uw bevestiging ontvangen." },
    { icon: Car01, title: "Vaste prijs", text: "De prijs staat vast — geen verrassingen achteraf." },
    { icon: MarkerPin01, title: "Deur-tot-deur", text: "Wij halen u op bij uw voordeur en brengen u direct naar uw bestemming." },
];

const Reserveren = () => {
    const { step, setStep } = useBookingStore();

    return (
        <div className="bg-primary">
            <YasHeader />

            <section className="bg-secondary py-16 md:py-24">
                <div className="mx-auto max-w-container px-4 md:px-8">
                    <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                        {/* Left: info */}
                        <div className="flex flex-col gap-8">
                            <div>
                                <span className="text-sm font-semibold text-brand-secondary">Reserveren</span>
                                <h1 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">
                                    Boek uw rit
                                </h1>
                                <p className="mt-4 text-lg text-tertiary">
                                    Boek uw taxi online in 4 eenvoudige stappen. Vaste prijs, direct bevestigd.
                                    Liever bellen?{" "}
                                    <a
                                        href="tel:+31182123456"
                                        className="font-semibold text-brand-primary underline underline-offset-4"
                                    >
                                        +31 (0)182 12 34 56
                                    </a>
                                </p>
                            </div>

                            <div className="flex flex-col gap-6">
                                {USP_ITEMS.map(({ icon, title, text }) => (
                                    <div key={title} className="flex gap-4">
                                        <FeaturedIcon icon={icon} size="sm" color="brand" theme="light" className="shrink-0" />
                                        <div>
                                            <p className="text-md font-semibold text-primary">{title}</p>
                                            <p className="text-sm text-tertiary">{text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: wizard */}
                        <div className="flex flex-col gap-8 rounded-2xl border border-secondary bg-primary p-8">
                            <StepIndicator currentStep={step} />

                            {step === 1 && (
                                <Step1Rit onNext={() => setStep(2)} />
                            )}
                            {step === 2 && (
                                <Step2Voertuig
                                    onNext={() => setStep(3)}
                                    onBack={() => setStep(1)}
                                />
                            )}
                            {step === 3 && (
                                <Step3Contact
                                    onNext={() => setStep(4)}
                                    onBack={() => setStep(2)}
                                />
                            )}
                            {step === 4 && (
                                <Step4Bevestiging />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <SectionDivider />
            <YasFooter />
        </div>
    );
};

export default Reserveren;
