import { Link, useLocation } from "react-router";
import { Calendar, Home02, MessageChatCircle, Phone, User01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";

const YELLOW = "rgb(255,210,0)";

interface BottomBarProps {
    onMenuClick: () => void;
}

const items = [
    { label: "Home", href: "/", icon: Home02, type: "link" as const },
    { label: "Boeken", href: "/reserveren", icon: Calendar, type: "link" as const },
    { label: "Bel", href: "tel:+31852128302", icon: Phone, type: "external" as const },
    {
        label: "WhatsApp",
        href: "https://wa.me/31852128302",
        icon: MessageChatCircle,
        type: "external" as const,
    },
    { label: "Menu", icon: User01, type: "menu" as const },
];

export const YasBottomBar = ({ onMenuClick }: BottomBarProps) => {
    const { pathname } = useLocation();

    return (
        <nav
            aria-label="Mobiele navigatie"
            className="fixed inset-x-0 bottom-0 z-40 flex md:hidden"
            style={{
                background: "rgba(14,14,14,0.92)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                paddingBottom: "env(safe-area-inset-bottom)",
            }}
        >
            <ul className="flex w-full items-stretch justify-around px-1 pt-1.5 pb-1.5">
                {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.type === "link" && pathname === item.href;

                    const content = (
                        <span
                            className={cx(
                                "flex flex-col items-center justify-center gap-0.5 rounded-lg px-3 py-1.5 transition duration-100",
                                isActive ? "" : "text-white/65 hover:text-white",
                            )}
                            style={isActive ? { color: YELLOW } : undefined}
                        >
                            <Icon className="size-5" aria-hidden />
                            <span className="text-[10px] font-semibold tracking-wide">
                                {item.label}
                            </span>
                        </span>
                    );

                    if (item.type === "link") {
                        return (
                            <li key={item.label} className="flex-1">
                                <Link to={item.href} className="flex h-full items-center justify-center outline-none">
                                    {content}
                                </Link>
                            </li>
                        );
                    }

                    if (item.type === "external") {
                        return (
                            <li key={item.label} className="flex-1">
                                <a
                                    href={item.href}
                                    target={item.href.startsWith("https://") ? "_blank" : undefined}
                                    rel={item.href.startsWith("https://") ? "noopener noreferrer" : undefined}
                                    className="flex h-full items-center justify-center outline-none"
                                >
                                    {content}
                                </a>
                            </li>
                        );
                    }

                    return (
                        <li key={item.label} className="flex-1">
                            <button
                                type="button"
                                onClick={onMenuClick}
                                aria-label="Menu openen"
                                className="flex h-full w-full items-center justify-center outline-none"
                            >
                                {content}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};
