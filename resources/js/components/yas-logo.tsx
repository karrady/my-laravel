import { cx } from "@/utils/cx";

interface YasLogoProps {
    className?: string;
    dark?: boolean;
}

export const YasLogo = ({ className, dark }: YasLogoProps) => (
    <span
        aria-label="YAS TaxiCentrale"
        className={cx("font-display font-black tracking-tight leading-none select-none", className)}
        style={{ fontFamily: "Montserrat, sans-serif" }}
    >
        <span style={{ color: dark ? "#ffffff" : undefined }}>YAS</span>
        <span style={{ color: "rgb(255,210,0)" }}> TaxiCentrale</span>
    </span>
);

export const YasLogoMinimal = ({ className, dark }: YasLogoProps) => (
    <span
        aria-label="YAS"
        className={cx("font-display font-black tracking-tight leading-none select-none", className)}
        style={{ fontFamily: "Montserrat, sans-serif", color: dark ? "#ffffff" : undefined }}
    >
        YAS
    </span>
);
