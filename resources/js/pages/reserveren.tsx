import { ArrowRight, Car01, CheckCircle, Clock, MarkerPin01, Phone } from "@untitledui/icons";

import { Eyebrow } from "@/components/shared-assets/eyebrow";
import { SectionDivider } from "@/components/shared-assets/section-divider";
import { YasFooter, YasHeader } from "@/components/yas-layout";
import { Step1Rit } from "@/components/booking/step-1-rit";
import { Step2Voertuig } from "@/components/booking/step-2-voertuig";
import { Step3Contact } from "@/components/booking/step-3-contact";
import { Step4Bevestiging } from "@/components/booking/step-4-bevestiging";
import { StepIndicator } from "@/components/booking/step-indicator";
import { useBookingStore } from "@/stores/booking-store";

const YELLOW = "rgb(255,210,0)";
const DARK = "#0E0E0E";

const USP_ITEMS = [
    {
        num: "01",
        icon: CheckCircle,
        title: "Gratis annuleren",
        text: "Tot 2 uur voor de rit kosteloos annuleren — geen vragen.",
    },
    {
        num: "02",
        icon: Clock,
        title: "Directe bevestiging",
        text: "Online boeken en direct uw bevestiging met chauffeur en aankomsttijd.",
    },
    {
        num: "03",
        icon: Car01,
        title: "Vaste prijs",
        text: "De prijs staat vast voordat u instapt. Geen taxameter, geen verrassingen.",
    },
    {
        num: "04",
        icon: MarkerPin01,
        title: "Deur-tot-deur",
        text: "Wij halen u op bij uw voordeur en brengen u tot exact aan uw bestemming.",
    },
];

/* ─── Hero — twee-koloms wizard layout ───────────────────────── */
const ReserverenHero = () => {
    const { step, setStep } = useBookingStore();

    return (
        <section className="relative overflow-hidden" style={{ background: DARK }}>
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage: `radial-gradient(circle, ${YELLOW} 1px, transparent 1px)`,
                    backgroundSize: "32px 32px",
                }}
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full blur-3xl"
                style={{ background: YELLOW, opacity: 0.06 }}
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-32 -right-32 h-[420px] w-[420px] rounded-full blur-3xl"
                style={{ background: YELLOW, opacity: 0.04 }}
            />

            <div className="relative z-30 w-full">
                <YasHeader dark />
            </div>

            <div className="relative z-10 mx-auto max-w-container px-4 pt-12 pb-20 md:px-8 md:pt-16 md:pb-28">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                    {/* Left: editorial intro + USPs */}
                    <div className="flex flex-col gap-10 lg:col-span-5">
                        <div className="flex flex-col gap-5">
                            <Eyebrow onDark>Reserveren</Eyebrow>
                            <h1 className="text-display-lg font-semibold leading-[1.05] tracking-tight text-white md:text-display-xl">
                                Boek uw rit
                                <br />
                                <span style={{ color: YELLOW }}>in vier stappen.</span>
                            </h1>
                            <p className="text-md text-white/60 md:text-lg">
                                Vaste prijs, direct bevestigd. Liever bellen?{" "}
                                <a
                                    href="tel:+31852128302"
                                    className="font-semibold underline underline-offset-4"
                                    style={{ color: YELLOW }}
                                >
                                    085 212 83 02
                                </a>
                            </p>
                        </div>

                        <div
                            className="grid grid-cols-1 gap-px border-y sm:grid-cols-2"
                            style={{
                                borderColor: "rgba(255,255,255,0.08)",
                                background: "rgba(255,255,255,0.08)",
                            }}
                        >
                            {USP_ITEMS.map(({ num, icon: Icon, title, text }) => (
                                <div
                                    key={num}
                                    className="flex flex-col gap-3 p-6"
                                    style={{ background: DARK }}
                                >
                                    <div className="flex items-baseline justify-between">
                                        <span
                                            className="flex size-9 items-center justify-center rounded-sm border"
                                            style={{ borderColor: "rgba(255,255,255,0.12)" }}
                                        >
                                            <Icon className="size-4" style={{ color: YELLOW }} aria-hidden />
                                        </span>
                                        <span className="font-mono text-xs tracking-widest text-white/30">
                                            {num}
                                        </span>
                                    </div>
                                    <h3 className="text-sm font-semibold text-white">{title}</h3>
                                    <p className="text-xs leading-relaxed text-white/55">{text}</p>
                                </div>
                            ))}
                        </div>

                        {/* Spoed callout */}
                        <a
                            href="tel:+31852128302"
                            className="group flex items-center justify-between gap-4 border px-5 py-4 transition duration-200 hover:bg-white/[0.03]"
                            style={{ borderColor: "rgba(255,255,255,0.12)" }}
                        >
                            <div className="flex items-center gap-4">
                                <span
                                    className="flex size-10 items-center justify-center rounded-full border"
                                    style={{ borderColor: "rgba(255,255,255,0.18)" }}
                                >
                                    <Phone className="size-4" style={{ color: YELLOW }} aria-hidden />
                                </span>
                                <div className="flex flex-col leading-tight">
                                    <span className="text-[11px] font-medium uppercase tracking-widest text-white/40">
                                        Spoed of vraag
                                    </span>
                                    <span className="text-base font-semibold tracking-wide text-white">
                                        085 212 83 02
                                    </span>
                                </div>
                            </div>
                            <ArrowRight
                                className="size-4 text-white/40 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white"
                                aria-hidden
                            />
                        </a>
                    </div>

                    {/* Right: wizard card */}
                    <div className="lg:col-span-7">
                        <div
                            className="relative flex flex-col gap-8 border bg-primary p-6 shadow-2xl md:p-10"
                            style={{ borderColor: "rgba(255,255,255,0.08)" }}
                        >
                            {/* Sarı top accent */}
                            <span
                                aria-hidden
                                className="absolute inset-x-0 top-0 h-[3px]"
                                style={{ background: YELLOW }}
                            />

                            <StepIndicator currentStep={step} />

                            {step === 1 && <Step1Rit onNext={() => setStep(2)} />}
                            {step === 2 && (
                                <Step2Voertuig onNext={() => setStep(3)} onBack={() => setStep(1)} />
                            )}
                            {step === 3 && (
                                <Step3Contact onNext={() => setStep(4)} onBack={() => setStep(2)} />
                            )}
                            {step === 4 && <Step4Bevestiging />}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

/* ─── Page ───────────────────────────────────────────────────── */
const Reserveren = () => (
    <div className="bg-primary">
        <ReserverenHero />
        <SectionDivider />
        <YasFooter />
    </div>
);

export default Reserveren;
