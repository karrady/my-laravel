import type { ReactNode } from "react";
import { useState } from "react";
import { Link } from "react-router";
import { Facebook, LinkedIn } from "@/components/foundations/social-icons";
import { YasLogo } from "@/components/yas-logo";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

const yasNavItems = [
    { label: "Home", href: "/" },
    { label: "Diensten", href: "/diensten" },
    { label: "Luchthaven", href: "/airport-service" },
    { label: "Over Ons", href: "/over-ons" },
    { label: "Contact", href: "/contact" },
];

interface YasHeaderProps {
    dark?: boolean;
    className?: string;
}

export const YasHeader = ({ dark, className }: YasHeaderProps) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinkClass = dark
        ? "text-sm font-semibold text-white/80 hover:text-white transition duration-100"
        : "text-sm font-semibold text-secondary hover:text-primary transition duration-100";

    return (
        <header
            className={cx(
                "relative z-40 flex h-16 w-full items-center md:h-18",
                dark ? "bg-transparent" : "bg-primary border-b border-secondary",
                className,
            )}
        >
            <div className="mx-auto flex w-full max-w-container items-center justify-between gap-4 px-4 md:px-8">
                {/* Logo */}
                <Link to="/" className="shrink-0 outline-none">
                    <YasLogo dark={dark} className="text-lg" />
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {yasNavItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.href}
                            className={cx("rounded-lg px-2.5 py-1.5 outline-none", navLinkClass)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <Button color="primary" size="sm" href="/reserveren">
                        Nu Boeken
                    </Button>
                </div>

                {/* Mobile hamburger */}
                <button
                    aria-label="Menu openen"
                    aria-expanded={mobileOpen}
                    onClick={() => setMobileOpen((v) => !v)}
                    className={cx(
                        "md:hidden rounded-lg p-2 transition duration-100",
                        dark ? "text-white hover:bg-white/10" : "text-secondary hover:bg-primary_hover",
                    )}
                >
                    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {mobileOpen ? (
                            <>
                                <path d="M18 6L6 18" />
                                <path d="M6 6L18 18" />
                            </>
                        ) : (
                            <>
                                <path d="M3 12H21" />
                                <path d="M3 6H21" />
                                <path d="M3 18H21" />
                            </>
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="absolute top-full left-0 w-full bg-primary shadow-lg border-t border-secondary md:hidden z-50">
                    <ul className="flex flex-col py-3">
                        {yasNavItems.map((item) => (
                            <li key={item.label}>
                                <Link
                                    to={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="block px-4 py-3 text-sm font-semibold text-primary hover:bg-primary_hover transition duration-100"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="px-4 pb-5 pt-2 border-t border-secondary">
                        <Button color="primary" size="md" href="/reserveren" className="w-full justify-center">
                            Nu Boeken
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
};

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
                    <YasLogo className="text-lg text-primary" />
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
                    <p className="text-md text-tertiary">+31 (0)85 212 83 02</p>
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
