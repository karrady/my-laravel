import type { FC, ReactNode, SVGProps } from "react";
import { ArrowDown, ArrowUp } from "@untitledui/icons";
import { cx } from "@/utils/cx";

interface StatCardProps {
  label: string;
  value: ReactNode;
  helperText?: string;
  icon?: FC<SVGProps<SVGSVGElement>>;
  change?: {
    value: number;
    label?: string;
    direction?: "up" | "down" | "auto";
    inverse?: boolean;
  };
  className?: string;
}

export function StatCard({ label, value, helperText, icon: Icon, change, className }: StatCardProps) {
  const direction =
    change?.direction === "up" || change?.direction === "down"
      ? change.direction
      : (change?.value ?? 0) >= 0
      ? "up"
      : "down";

  const isPositive = change?.inverse ? direction === "down" : direction === "up";

  return (
    <div className={cx("flex flex-col gap-3 rounded-xl border border-secondary bg-primary p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-tertiary">{label}</p>
        {Icon && (
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary_subtle text-fg-quaternary">
            <Icon aria-hidden="true" className="size-5" />
          </span>
        )}
      </div>
      <div className="flex items-end gap-3">
        <p className="text-display-sm font-semibold tracking-tight text-primary">{value}</p>
        {change && (
          <span
            className={cx(
              "mb-1 inline-flex items-center gap-0.5 text-sm font-medium",
              isPositive ? "text-success-primary" : "text-error-primary",
            )}
          >
            {direction === "up" ? (
              <ArrowUp aria-hidden="true" className="size-4" />
            ) : (
              <ArrowDown aria-hidden="true" className="size-4" />
            )}
            {Math.abs(change.value).toFixed(0)}%
          </span>
        )}
      </div>
      {(helperText || change?.label) && (
        <p className="text-xs text-tertiary">{change?.label ?? helperText}</p>
      )}
    </div>
  );
}
