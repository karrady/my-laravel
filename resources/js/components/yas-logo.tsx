import { cx } from "@/utils/cx";

interface YasLogoProps {
    className?: string;
    dark?: boolean;
}

export const YasLogo = ({ className, dark }: YasLogoProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 270 36"
        height="36"
        role="img"
        aria-label="YAS TaxiCentrale"
        className={cx("overflow-visible", className)}
    >
        <text
            y="28"
            fontFamily="Montserrat, sans-serif"
            fontWeight="900"
            fontSize="32"
        >
            <tspan fill={dark ? "#ffffff" : "#0f0f0f"}>YAS</tspan>
            <tspan fill="rgb(255,210,0)"> TaxiCentrale</tspan>
        </text>
    </svg>
);

export const YasLogoMinimal = ({ className, dark }: YasLogoProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 70 36"
        height="36"
        role="img"
        aria-label="YAS"
        className={cx("overflow-visible", className)}
    >
        <text
            y="28"
            fontFamily="Montserrat, sans-serif"
            fontWeight="900"
            fontSize="32"
            fill={dark ? "#ffffff" : "#0f0f0f"}
        >
            YAS
        </text>
    </svg>
);
