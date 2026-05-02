import { ArrowLeft, ArrowRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function getPageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, 4, "…", total];
  if (current >= total - 2) return [1, "…", total - 3, total - 2, total - 1, total];
  return [1, "…", current - 1, current, current + 1, "…", total];
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);
  const start = pageSize ? (currentPage - 1) * pageSize + 1 : null;
  const end = pageSize && totalItems ? Math.min(currentPage * pageSize, totalItems) : null;

  return (
    <nav
      aria-label="Paginanavigatie"
      className={cx("flex flex-col items-center justify-between gap-3 border-t border-secondary px-5 py-4 sm:flex-row", className)}
    >
      {start !== null && totalItems !== undefined && (
        <p className="text-sm text-tertiary">
          {start}–{end} van {totalItems}
        </p>
      )}

      <div className="flex items-center gap-1">
        <Button
          size="sm"
          color="secondary"
          iconLeading={ArrowLeft}
          isDisabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Vorige
        </Button>

        <div className="hidden items-center gap-0.5 px-2 sm:flex">
          {pages.map((p, i) =>
            p === "…" ? (
              <span key={`ellipsis-${i}`} className="px-2 text-sm text-tertiary">
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                aria-current={p === currentPage ? "page" : undefined}
                className={cx(
                  "inline-flex size-9 items-center justify-center rounded-lg text-sm font-medium transition duration-100 ease-linear",
                  p === currentPage
                    ? "bg-active text-primary"
                    : "text-tertiary hover:bg-primary_hover hover:text-primary",
                )}
              >
                {p}
              </button>
            ),
          )}
        </div>

        <Button
          size="sm"
          color="secondary"
          iconTrailing={ArrowRight}
          isDisabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Volgende
        </Button>
      </div>
    </nav>
  );
}
