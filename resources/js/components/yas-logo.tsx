import { cx } from "@/utils/cx";

interface YasLogoProps {
    className?: string;
}

export const YasLogo = ({ className }: YasLogoProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 220 52"
        fill="none"
        aria-label="YAS TaxiCentrale"
        className={cx("h-8 w-auto", className)}
    >
        {/* Steering wheel icon */}
        <circle cx="26" cy="26" r="20" stroke="currentColor" strokeWidth="3.5" />
        <line x1="26" y1="18" x2="26" y2="8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="33" y1="30" x2="43" y2="36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="19" y1="30" x2="9" y2="36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="26" cy="26" r="7" fill="currentColor" />
        {/* Divider line */}
        <line x1="54" y1="10" x2="54" y2="42" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        {/* Text: YAS TaxiCentrale */}
        <text x="64" y="23" fontFamily="Inter, -apple-system, sans-serif" fontSize="13" fontWeight="700" fill="currentColor" letterSpacing="0.5">
            YAS
        </text>
        <text x="64" y="39" fontFamily="Inter, -apple-system, sans-serif" fontSize="10.5" fontWeight="500" fill="currentColor" opacity="0.75" letterSpacing="0.2">
            TaxiCentrale
        </text>
    </svg>
);

export const YasLogoMinimal = ({ className }: YasLogoProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
        fill="none"
        aria-label="YAS TaxiCentrale"
        className={cx("h-8 w-auto", className)}
    >
        <circle cx="26" cy="26" r="20" stroke="currentColor" strokeWidth="3.5" />
        <line x1="26" y1="18" x2="26" y2="8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="33" y1="30" x2="43" y2="36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="19" y1="30" x2="9" y2="36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="26" cy="26" r="7" fill="currentColor" />
    </svg>
);
