import { useState } from "react";
import { ArrowRight, CheckCircle, Clock, Mail01, MarkerPin01, MessageChatCircle, Phone } from "@untitledui/icons";

import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Form } from "@/components/base/form/form";
import { Input, InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { NativeSelect } from "@/components/base/select/select-native";
import { TextArea } from "@/components/base/textarea/textarea";
import { Eyebrow } from "@/components/shared-assets/eyebrow";
import { SectionDivider } from "@/components/shared-assets/section-divider";
import { YasFooter, YasHeader } from "@/components/yas-layout";
import countries, { phoneCodeOptions } from "@/utils/countries";

const YELLOW = "rgb(255,210,0)";
const DARK = "#0E0E0E";

/* ─── Hero ───────────────────────────────────────────────────── */
const HeroSection = () => (
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

        <div className="relative z-30 w-full">
            <YasHeader dark />
        </div>

        <div className="relative z-10 mx-auto max-w-container px-4 pt-12 pb-16 md:px-8 md:pt-20 md:pb-24">
            <div className="flex max-w-3xl flex-col gap-6">
                <Eyebrow onDark>Contact</Eyebrow>
                <h1 className="text-display-lg font-semibold leading-[1.05] tracking-tight text-white md:text-display-xl">
                    Wij staan voor u
                    <br />
                    <span style={{ color: YELLOW }}>klaar.</span>
                </h1>
                <p className="text-md text-white/60 md:text-lg">
                    Heeft u een vraag of wilt u een rit bespreken? Stuur een bericht via het
                    formulier, of kies een directe lijn, wij reageren snel.
                </p>
            </div>
        </div>
    </section>
);

/* ─── Quick channels, 3 directe lijnen ──────────────────────── */
const CHANNELS = [
    {
        num: "01",
        icon: Phone,
        label: "Bellen",
        value: "085 212 83 02",
        sub: "24/7 bereikbaar",
        href: "tel:+31852128302",
    },
    {
        num: "02",
        icon: MessageChatCircle,
        label: "WhatsApp",
        value: "Stuur een bericht",
        sub: "Snel antwoord, ook 's avonds",
        href: "https://wa.me/31852128302",
        external: true,
    },
    {
        num: "03",
        icon: Mail01,
        label: "Contactformulier",
        value: "Stuur een bericht",
        sub: "Voor offertes en zakelijke vragen",
        href: "#formulier",
    },
];

const ChannelsSection = () => (
    <section className="bg-primary">
        <div className="mx-auto max-w-container px-4 md:px-8">
            <div className="grid grid-cols-1 divide-y border-y border-secondary md:grid-cols-3 md:divide-y-0">
                {CHANNELS.map((c, i) => {
                    const Icon = c.icon;
                    return (
                        <a
                            key={c.label}
                            href={c.href}
                            {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="group relative flex flex-col gap-5 px-2 py-8 transition duration-200 hover:bg-secondary md:px-8 md:py-10"
                            style={{
                                borderLeft:
                                    i > 0
                                        ? "1px solid var(--color-border-secondary)"
                                        : undefined,
                            }}
                        >
                            <span
                                aria-hidden
                                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                                style={{ background: YELLOW }}
                            />

                            <div className="flex items-baseline justify-between">
                                <span className="font-mono text-sm font-medium tracking-widest text-quaternary">
                                    {c.num}
                                </span>
                                <Icon className="size-6 text-secondary" aria-hidden />
                            </div>

                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold uppercase tracking-[0.18em] text-quaternary">
                                    {c.label}
                                </span>
                                <span className="text-xl font-semibold tracking-tight text-primary">
                                    {c.value}
                                </span>
                                <span className="text-sm text-tertiary">{c.sub}</span>
                            </div>

                            <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold text-primary">
                                Open
                                <ArrowRight
                                    className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                                    aria-hidden
                                />
                            </span>
                        </a>
                    );
                })}
            </div>
        </div>
    </section>
);

/* ─── Formulier + sidebar ────────────────────────────────────── */
const SIDEBAR_INFO = [
    {
        icon: Clock,
        title: "Openingstijden",
        value: "24/7 bereikbaar",
        sub: "7 dagen per week, dag en nacht",
    },
    {
        icon: MarkerPin01,
        title: "Werkgebied",
        value: "Gouda & omstreken",
        sub: "Waddinxveen, Bodegraven, Alphen a/d Rijn e.o.",
    },
];

const ContactFormSection = () => {
    const [countryCode, setCountryCode] = useState("NL");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <section id="formulier" className="bg-primary py-20 md:py-28">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="mb-14 flex flex-col gap-5 md:mb-20 md:max-w-2xl">
                    <Eyebrow>Stuur een bericht</Eyebrow>
                    <h2 className="text-display-md font-semibold tracking-tight text-primary md:text-display-lg">
                        Liever uitgebreid? Vul het formulier in.
                    </h2>
                    <p className="text-md text-tertiary md:text-lg">
                        Voor offertes, zakelijke aanvragen of een complexe rit. Wij nemen binnen
                        één werkdag contact met u op, vaak veel sneller.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                    {/* Form */}
                    <div className="lg:col-span-7">
                        {submitted ? (
                            <div
                                className="flex flex-col gap-3 border p-10 text-center"
                                style={{ borderColor: "var(--color-border-secondary)", background: "var(--color-bg-secondary)" }}
                            >
                                <CheckCircle
                                    className="mx-auto size-10"
                                    style={{ color: YELLOW }}
                                    aria-hidden
                                />
                                <p className="text-xl font-semibold tracking-tight text-primary">
                                    Bedankt voor uw bericht!
                                </p>
                                <p className="text-md text-tertiary">
                                    Wij nemen zo snel mogelijk contact met u op.
                                </p>
                            </div>
                        ) : (
                            <Form onSubmit={handleSubmit} className="flex flex-col gap-8">
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-x-8 gap-y-6 sm:flex-row">
                                        <Input
                                            isRequired
                                            size="lg"
                                            name="firstName"
                                            label="Voornaam"
                                            placeholder="Voornaam"
                                            wrapperClassName="flex-1"
                                        />
                                        <Input
                                            isRequired
                                            size="lg"
                                            name="lastName"
                                            label="Achternaam"
                                            placeholder="Achternaam"
                                            wrapperClassName="flex-1"
                                        />
                                    </div>
                                    <Input
                                        isRequired
                                        size="lg"
                                        name="email"
                                        label="E-mailadres"
                                        type="email"
                                        placeholder="u@voorbeeld.nl"
                                    />
                                    <InputGroup
                                        size="lg"
                                        name="phone"
                                        label="Telefoonnummer"
                                        leadingAddon={
                                            <NativeSelect
                                                aria-label="Landcode"
                                                value={countryCode}
                                                onChange={(e) =>
                                                    setCountryCode(e.currentTarget.value)
                                                }
                                                options={phoneCodeOptions.map((item) => ({
                                                    label: item.label as string,
                                                    value: item.id as string,
                                                }))}
                                            />
                                        }
                                    >
                                        <InputBase
                                            type="tel"
                                            placeholder={countries
                                                .find((c) => c.code === countryCode)
                                                ?.phoneMask?.replaceAll("#", "0")}
                                        />
                                    </InputGroup>
                                    <TextArea
                                        isRequired
                                        name="message"
                                        label="Uw bericht"
                                        placeholder="Stelt u uw vraag of beschrijf uw rit…"
                                        rows={5}
                                    />
                                    <Checkbox
                                        name="privacy"
                                        size="md"
                                        hint={
                                            <>
                                                Ik ga akkoord met het{" "}
                                                <a
                                                    href="#"
                                                    className="rounded-xs underline underline-offset-3 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                                                >
                                                    privacybeleid
                                                </a>
                                                .
                                            </>
                                        }
                                    />
                                </div>
                                <Button type="submit" size="xl" iconTrailing={ArrowRight}>
                                    Bericht versturen
                                </Button>
                            </Form>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="flex flex-col gap-8 lg:col-span-5">
                        <div className="flex flex-col gap-1.5 border-l-2 pl-6" style={{ borderColor: YELLOW }}>
                            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-quaternary">
                                Belofte
                            </span>
                            <p className="text-lg font-semibold leading-snug tracking-tight text-primary">
                                Geen wachttijd, geen automaat, een echt mens aan de lijn, dag en nacht.
                            </p>
                        </div>

                        <div className="flex flex-col border-y border-secondary">
                            {SIDEBAR_INFO.map(({ icon: Icon, title, value, sub }) => (
                                <div
                                    key={title}
                                    className="flex items-start gap-4 border-b border-secondary py-5 last:border-b-0"
                                >
                                    <span
                                        className="flex size-10 shrink-0 items-center justify-center rounded-sm border"
                                        style={{ borderColor: "var(--color-border-secondary)" }}
                                    >
                                        <Icon className="size-5 text-primary" aria-hidden />
                                    </span>
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-quaternary">
                                            {title}
                                        </span>
                                        <span className="text-md font-semibold text-primary">
                                            {value}
                                        </span>
                                        <span className="text-sm text-tertiary">{sub}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div
                            className="flex flex-col gap-3 border p-6"
                            style={{
                                borderColor: "rgba(14,14,14,0.08)",
                                background: DARK,
                            }}
                        >
                            <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: YELLOW }}>
                                Spoed
                            </span>
                            <p className="text-md font-semibold text-white">
                                Heeft u nu een chauffeur nodig?
                            </p>
                            <p className="text-sm text-white/60">
                                Bel ons direct, wij sturen meestal binnen vijftien minuten een wagen.
                            </p>
                            <a
                                href="tel:+31852128302"
                                className="mt-2 inline-flex items-center gap-3 text-base font-bold tracking-wide text-white transition-colors duration-200 hover:opacity-90"
                            >
                                <span
                                    className="flex size-9 items-center justify-center rounded-full border"
                                    style={{ borderColor: "rgba(255,255,255,0.18)" }}
                                >
                                    <Phone className="size-4" style={{ color: YELLOW }} aria-hidden />
                                </span>
                                085 212 83 02
                            </a>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
};

/* ─── Page ───────────────────────────────────────────────────── */
const Contact = () => (
    <div className="bg-primary">
        <HeroSection />
        <ChannelsSection />
        <ContactFormSection />
        <SectionDivider />
        <YasFooter />
    </div>
);

export default Contact;
