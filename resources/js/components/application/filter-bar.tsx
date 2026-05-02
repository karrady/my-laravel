import type { ReactNode } from "react";
import { SearchLg } from "@untitledui/icons";
import { cx } from "@/utils/cx";

interface FilterBarProps {
  search?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  };
  children?: ReactNode;
  className?: string;
}

export function FilterBar({ search, children, className }: FilterBarProps) {
  return (
    <div className={cx("flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap", className)}>
      {search && (
        <div className="relative w-full sm:w-80">
          <SearchLg aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-fg-quaternary" />
          <input
            type="search"
            value={search.value}
            onChange={(e) => search.onChange(e.target.value)}
            placeholder={search.placeholder ?? "Zoeken..."}
            className="w-full rounded-lg border border-primary bg-primary py-2.5 pr-3 pl-10 text-sm text-primary shadow-xs transition duration-100 ease-linear placeholder:text-placeholder focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>
      )}
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  );
}
