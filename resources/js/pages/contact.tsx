import { useState } from "react";
import { Clock, Mail01, MarkerPin01, Phone } from "@untitledui/icons";

import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Form } from "@/components/base/form/form";
import { Input, InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { NativeSelect } from "@/components/base/select/select-native";
import { TextArea } from "@/components/base/textarea/textarea";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { SectionDivider } from "@/components/shared-assets/section-divider";
import { YasFooter, YasHeader } from "@/components/yas-layout";
import countries, { phoneCodeOptions } from "@/utils/countries";

const contactInfo = [
    {
        icon: Phone,
        title: "Telefoon",
        value: "+31 (0)85 212 83 02",
        href: "tel:+31852128302",
        sub: "24/7 bereikbaar",
    },
    {
        icon: Mail01,
        title: "E-mail",
        value: "info@yastaxicentrale.nl",
        href: "mailto:info@yastaxicentrale.nl",
        sub: "Wij reageren zo snel mogelijk",
    },
    {
        icon: MarkerPin01,
        title: "Werkgebied",
        value: "Gouda & omstreken",
        href: null,
        sub: "Waddinxveen, Bodegraven, Alphen a/d Rijn e.o.",
    },
    {
        icon: Clock,
        title: "Openingstijden",
        value: "24/7 bereikbaar",
        href: null,
        sub: "7 dagen per week, dag en nacht",
    },
];

const Contact = () => {
    const [countryCode, setCountryCode] = useState("NL");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="bg-primary">
            <YasHeader />

            <section className="grid grid-cols-1 lg:grid-cols-2" style={{ background: "#0E0E0E" }}>
                {/* Left: image */}
                <div className="relative max-lg:hidden">
                    <img
                        src="/vliegveld.jpg"
                        className="absolute inset-0 h-full max-w-full object-cover opacity-60"
                        alt="Luchthaven transfer Gouda"
                    />
                </div>

                {/* Right: form */}
                <div className="w-full px-4 py-16 md:px-8 md:py-24">
                    <div className="mx-auto md:max-w-120">
                        <span className="text-sm font-semibold" style={{ color: "rgb(255,210,0)" }}>Contact</span>
                        <h1 className="mt-3 text-display-sm font-semibold text-white md:text-display-md">
                            Neem contact op
                        </h1>
                        <p className="mt-4 text-lg md:mt-5 md:text-xl" style={{ color: "#999" }}>
                            Heeft u een vraag of wilt u een rit bespreken? Stuur ons een bericht of bel direct op{" "}
                            <a href="tel:+31852128302" className="font-semibold underline underline-offset-4" style={{ color: "rgb(255,210,0)" }}>
                                085 212 83 02
                            </a>
                        </p>

                        {submitted ? (
                            <div className="mt-12 rounded-2xl border border-secondary bg-secondary p-8 text-center">
                                <p className="text-lg font-semibold text-primary">Bedankt voor uw bericht!</p>
                                <p className="mt-2 text-md text-tertiary">Wij nemen zo snel mogelijk contact met u op.</p>
                            </div>
                        ) : (
                            <Form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-x-8 gap-y-6 sm:flex-row">
                                        <Input isRequired size="lg" name="firstName" label="Voornaam" placeholder="Voornaam" wrapperClassName="flex-1" />
                                        <Input isRequired size="lg" name="lastName" label="Achternaam" placeholder="Achternaam" wrapperClassName="flex-1" />
                                    </div>
                                    <Input isRequired size="lg" name="email" label="E-mailadres" type="email" placeholder="u@voorbeeld.nl" />
                                    <InputGroup
                                        size="lg"
                                        name="phone"
                                        label="Telefoonnummer"
                                        leadingAddon={
                                            <NativeSelect
                                                aria-label="Landcode"
                                                value={countryCode}
                                                onChange={(e) => setCountryCode(e.currentTarget.value)}
                                                options={phoneCodeOptions.map((item) => ({
                                                    label: item.label as string,
                                                    value: item.id as string,
                                                }))}
                                            />
                                        }
                                    >
                                        <InputBase
                                            type="tel"
                                            placeholder={countries.find((c) => c.code === countryCode)?.phoneMask?.replaceAll("#", "0")}
                                        />
                                    </InputGroup>
                                    <TextArea isRequired name="message" label="Uw bericht" placeholder="Stelt u uw vraag of beschrijf uw rit..." rows={5} />
                                    <Checkbox
                                        name="privacy"
                                        size="md"
                                        hint={
                                            <>
                                                Ik ga akkoord met het{" "}
                                                <a href="#" className="rounded-xs underline underline-offset-3 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                                    privacybeleid
                                                </a>
                                                .
                                            </>
                                        }
                                    />
                                </div>
                                <Button type="submit" size="xl">
                                    Bericht versturen
                                </Button>
                            </Form>
                        )}
                    </div>
                </div>
            </section>

            {/* Contact info blocks */}
            <section className="bg-secondary py-16 md:py-24">
                <div className="mx-auto max-w-container px-4 md:px-8">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {contactInfo.map(({ icon, title, value, href, sub }) => (
                            <div key={title} className="flex flex-col gap-4">
                                <FeaturedIcon icon={icon} size="md" color="brand" theme="light" />
                                <div>
                                    <p className="text-sm font-semibold text-secondary">{title}</p>
                                    {href ? (
                                        <a href={href} className="mt-1 block text-md font-medium text-primary underline-offset-3 hover:underline">
                                            {value}
                                        </a>
                                    ) : (
                                        <p className="mt-1 text-md font-medium text-primary">{value}</p>
                                    )}
                                    <p className="mt-1 text-sm text-tertiary">{sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <SectionDivider />
            <YasFooter />
        </div>
    );
};

export default Contact;
