import type { ReactNode } from "react";
import { Link } from "react-router";
import { Facebook, LinkedIn } from "@/components/foundations/social-icons";
import { Header } from "@/components/marketing/header-navigation/header";
import { YasLogo, YasLogoMinimal } from "@/components/yas-logo";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

const yasNavItems = [
    { label: "Home", href: "/" },
    { label: "Diensten", href: "/diensten" },
    { label: "Luchthaven", href: "/airport-service" },
    { label: "Over Ons", href: "/over-ons" },
    { label: "Contact", href: "/contact" },
];

const YasCta = () => (
    <Button color="primary" size="sm" href="/reserveren">
        Nu Boeken
    </Button>
);

interface YasHeaderProps {
    dark?: boolean;
    className?: string;
}

export const YasHeader = ({ dark, className }: YasHeaderProps) => (
    <Header
        items={yasNavItems}
        logo={<YasLogo className={cx("h-9", dark ? "text-white" : "text-primary")} />}
        logoMinimal={<YasLogoMinimal className={cx("h-9", dark ? "text-white" : "text-primary")} />}
        cta={<YasCta />}
        className={cx(dark && "bg-brand-section [&_nav>ul>li>a]:text-secondary_on-brand [&_nav>ul>li>a]:hover:text-secondary_on-brand", className)}
    />
);

const footerLinks = [
    { label: "Home", href: "/" },
    { label: "Diensten", href: "/diensten" },
    { label: "Luchthaven", href: "/airport-service" },
    { label: "Over Ons", href: "/over-ons" },
    { label: "Contact", href: "/contact" },
    { label: "Reserveren", href: "/reserveren" },
];

const legalLinks = [
    { label: "Privacybeleid", href: "#" },
    { label: "Algemene Voorwaarden", href: "#" },
    { label: "Cookies", href: "#" },
];

const socials = [
    { label: "Facebook", icon: Facebook, href: "https://www.facebook.com/" },
    { label: "LinkedIn", icon: LinkedIn, href: "https://www.linkedin.com/" },
];

export const YasFooter = () => (
    <footer className="bg-primary py-12 md:pt-16">
        <div className="mx-auto max-w-container px-4 md:px-8">
            <div className="flex flex-col justify-between gap-x-8 gap-y-12 lg:flex-row">
                <div className="flex flex-col gap-6">
                    <YasLogo className="h-9 text-primary" />
                    <p className="max-w-xs text-md text-tertiary">
                        Betrouwbaar taxivervoer in Gouda en omstreken. Altijd op tijd, altijd comfortabel.
                    </p>
                    <div className="flex gap-4">
                        {socials.map(({ label, icon: Icon, href }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-fg-quaternary transition duration-100 ease-linear hover:text-fg-secondary"
                            >
                                <Icon className="size-5" />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <p className="text-sm font-semibold text-secondary">Navigatie</p>
                    <nav>
                        <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
                            {footerLinks.map((item) => (
                                <li key={item.label}>
                                    <Button color="link-gray" size="md" href={item.href} className="max-h-5">
                                        {item.label}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className="flex flex-col gap-3">
                    <p className="text-sm font-semibold text-secondary">Contact</p>
                    <p className="text-md text-tertiary">+31 (0)6 12 34 56 78</p>
                    <p className="text-md text-tertiary">info@yastaxicentrale.nl</p>
                    <p className="text-md text-tertiary">Gouda, Zuid-Holland</p>
                </div>
            </div>

            <div className="mt-12 flex flex-col-reverse justify-between gap-4 border-t border-secondary pt-8 md:mt-16 md:flex-row md:gap-6">
                <p className="text-sm text-quaternary">© {new Date().getFullYear()} YAS TaxiCentrale. Alle rechten voorbehouden.</p>
                <ul className="flex gap-3">
                    {legalLinks.map(({ label, href }) => (
                        <li key={label}>
                            <a
                                href={href}
                                className="rounded-xs text-sm text-quaternary outline-focus-ring transition duration-100 ease-linear hover:text-tertiary focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </footer>
);

interface LayoutProps {
    children: ReactNode;
    headerDark?: boolean;
}

export const YasLayout = ({ children, headerDark }: LayoutProps) => (
    <div className="bg-primary">
        {headerDark ? null : <YasHeader />}
        {children}
        <YasFooter />
    </div>
);
