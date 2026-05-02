import type { ReactNode } from "react";
import { cx } from "@/utils/cx";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({ title, description, actions, className }: PageHeaderProps) {
  return (
    <header className={cx("flex flex-col gap-4 border-b border-secondary pb-5 md:flex-row md:items-end md:justify-between", className)}>
      <div className="min-w-0">
        <h1 className="text-display-xs font-semibold text-primary">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-tertiary">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </header>
  );
}
