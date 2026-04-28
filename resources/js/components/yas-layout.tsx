import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { MessageChatCircle, Phone, Mail01, XClose } from "@untitledui/icons";
import { Telegram } from "@/components/foundations/social-icons";
import { YasLogo } from "@/components/yas-logo";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

const YELLOW = "rgb(255,210,0)";
const DARK = "#0E0E0E";

export const ContactPopup = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    const options = [
        {
            icon: Phone,
            label: "Bellen",
            sub: "085 212 83 02",
            note: "24/7 bereikbaar",
            href: "tel:+31852128302",
        },
        {
            icon: MessageChatCircle,
            label: "WhatsApp",
            sub: "Stuur een bericht",
            note: "Snel antwoord",
            href: "https://wa.me/31852128302",
            external: true,
        },
        {
            icon: Mail01,
            label: "Contactformulier",
            sub: "Stuur een bericht",
            note: "Wij reageren snel",
            href: "/contact",
        },
    ];

    return (
        <>
            {/* Floating knop */}
            <button
                onClick={() => setOpen(true)}
                aria-label="Contact opnemen"
                className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-lg transition duration-100 hover:brightness-90 active:scale-95"
                style={{ background: YELLOW, color: DARK }}
            >
                <Phone className="size-4" aria-hidden />
                Contact
            </button>

            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-end justify-end p-6 sm:items-center sm:justify-center"
                    style={{ background: "rgba(0,0,0,0.45)" }}
                    onClick={() => setOpen(false)}
                >
                    {/* Modal */}
                    <div
                        className="relative w-full max-w-sm rounded-2xl bg-primary p-6 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Sluitknop */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute right-4 top-4 rounded-full p-1 text-fg-quaternary transition duration-100 hover:text-fg-primary"
                            aria-label="Sluiten"
                        >
                            <XClose className="size-5" />
                        </button>

                        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: YELLOW }}>
                            Bereikbaarheid
                        </p>
                        <h2 className="text-xl font-bold text-primary mb-1">Wij staan voor u klaar</h2>
                        <p className="text-sm text-tertiary mb-6">24 uur per dag, 7 dagen per week.</p>

                        <div className="flex flex-col gap-3">
                            {options.map(({ icon: Icon, label, sub, note, href, external }) => (
                                <a
                                    key={label}
                                    href={href}
                                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                    className="flex items-center gap-4 rounded-xl border border-secondary bg-primary px-4 py-3 transition duration-100 ease-linear hover:border-brand hover:bg-secondary"
                                >
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(255,210,0,0.12)" }}>
                                        <Icon className="size-5" style={{ color: YELLOW }} aria-hidden />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-primary">{label}</p>
                                        <p className="text-xs text-tertiary">{sub} · {note}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

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

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" {...props}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.858L.057 23.428a.75.75 0 0 0 .916.916l5.57-1.476A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.697 9.697 0 0 1-4.947-1.355l-.355-.211-3.684.975.991-3.585-.232-.372A9.699 9.699 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
    </svg>
);

const SmsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" {...props}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
);

const socials = [
    { label: "WhatsApp", icon: WhatsAppIcon, href: "https://wa.me/31852128302" },
    { label: "Telegram", icon: Telegram, href: "https://t.me/yastaxicentrale" },
    { label: "SMS", icon: SmsIcon, href: "sms:+31852128302" },
];

export const YasFooter = () => (
    <>
    <ContactPopup />
    <footer className="bg-primary py-12 md:pt-16">
        <div className="mx-auto max-w-container px-4 md:px-8">
            <div className="flex flex-col justify-between gap-x-8 gap-y-12 lg:flex-row">
                <div className="flex flex-col gap-6">
                    <span
                        aria-label="YAS TaxiCentrale"
                        style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 900, fontSize: "32px", lineHeight: 1 }}
                    >
                        <span style={{ color: "#0f0f0f" }}>YAS</span>
                        <span style={{ color: "rgb(255,210,0)" }}> TaxiCentrale</span>
                    </span>
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
                                <Icon />
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
    </>
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
