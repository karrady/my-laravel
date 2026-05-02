import type { ReactNode } from "react";

const YELLOW = "rgb(255,210,0)";
const DARK = "#0E0E0E";

interface EyebrowProps {
    children: ReactNode;
    onDark?: boolean;
}

/**
 * Editöryel "eyebrow" — küçük sarı çizgi + small-caps başlık.
 * Section başlangıçlarında ritim ve görsel hiyerarşi sağlar.
 */
export const Eyebrow = ({ children, onDark = false }: EyebrowProps) => (
    <div className="flex items-center gap-3">
        <span className="block h-px w-8" style={{ background: YELLOW }} aria-hidden />
        <span
            className="text-xs font-bold uppercase tracking-[0.18em]"
            style={{ color: onDark ? YELLOW : DARK }}
        >
            {children}
        </span>
    </div>
);
