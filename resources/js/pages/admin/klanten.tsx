import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Receipt, Users01 } from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import {
  DropdownItem,
  DropdownMenu,
} from "@/components/application/dropdown-menu";
import { EmptyState } from "@/components/application/empty-state";
import { FilterBar } from "@/components/application/filter-bar";
import { PageHeader } from "@/components/application/page-header";
import { Pagination } from "@/components/application/pagination";
import { adminApi } from "@/utils/admin-api";
import { cx } from "@/utils/cx";

interface Customer {
  customer_email: string;
  customer_name: string;
  customer_phone: string;
  booking_count: number;
  total_cents: number;
  last_booking_at: string;
  first_booking_at: string;
}

interface Paginated {
  data: Customer[];
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}

function euro(cents: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format((cents ?? 0) / 100);
}

function relativeDate(iso: string | null): string {
  if (!iso) return "—";
  const target = new Date(iso).getTime();
  const diffMs = Date.now() - target;
  const day = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (day < 1) return "vandaag";
  if (day === 1) return "gisteren";
  if (day < 30) return `${day}d geleden`;
  return new Date(iso).toLocaleDateString("nl-NL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("");
}

export default function AdminKlanten() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [page, setPage] = useState(Number(searchParams.get("page") ?? "1") || 1);

  useEffect(() => {
    const next = new URLSearchParams();
    if (search) next.set("search", search);
    if (page > 1) next.set("page", String(page));
    setSearchParams(next, { replace: true });
  }, [search, page, setSearchParams]);

  const params = new URLSearchParams({ page: String(page) });
  if (search) params.set("search", search);

  const { data, isLoading } = useQuery<Paginated>({
    queryKey: ["admin-customers", search, page],
    queryFn: () => adminApi.get<Paginated>(`/customers?${params}`),
  });

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  const customers = data?.data ?? [];

  return (
    <>
      <Helmet><title>Klanten — YAS Admin</title></Helmet>

      <div className="space-y-6 p-6 md:p-8">
        <PageHeader
          title="Klanten"
          description={
            data
              ? `${data.total} klanten op basis van boekingsgeschiedenis`
              : "Overzicht van alle klanten op basis van boekingsgeschiedenis."
          }
        />

        <FilterBar
          search={{
            value: search,
            onChange: handleSearch,
            placeholder: "Zoek op naam, e-mail of telefoon…",
          }}
        />

        <div className="overflow-hidden rounded-xl border border-secondary bg-primary">
          {isLoading ? (
            <div className="p-8 text-center text-sm text-tertiary">Laden…</div>
          ) : customers.length === 0 ? (
            <EmptyState
              icon={Users01}
              title="Geen klanten"
              description="Probeer een andere zoekterm — of er zijn nog geen boekingen."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-secondary bg-secondary_subtle">
                  <tr>
                    <Th>Klant</Th>
                    <Th>Telefoon</Th>
                    <Th className="text-right">Aantal ritten</Th>
                    <Th className="text-right">Totaal besteed</Th>
                    <Th>Laatste rit</Th>
                    <Th className="w-12"><span className="sr-only">Acties</span></Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary">
                  {customers.map((c) => (
                    <tr
                      key={c.customer_email}
                      className="transition duration-100 ease-linear hover:bg-primary_hover"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar size="sm" initials={getInitials(c.customer_name)} alt={c.customer_name} />
                          <div className="min-w-0">
                            <p className="truncate font-medium text-primary">{c.customer_name}</p>
                            <p className="truncate text-xs text-tertiary">{c.customer_email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-secondary">
                        {c.customer_phone || <span className="text-quaternary">—</span>}
                      </td>
                      <td className="px-5 py-4 text-right whitespace-nowrap font-medium text-primary">
                        {c.booking_count}
                      </td>
                      <td className="px-5 py-4 text-right whitespace-nowrap font-medium text-primary">
                        {euro(c.total_cents)}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-tertiary">
                        {relativeDate(c.last_booking_at)}
                      </td>
                      <td className="px-2 py-4 text-right">
                        <DropdownMenu>
                          <DropdownItem
                            icon={Receipt}
                            href={`/admin/boekingen?search=${encodeURIComponent(c.customer_email)}`}
                          >
                            Bekijk boekingen
                          </DropdownItem>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {data && data.last_page > 1 && (
            <Pagination
              currentPage={data.current_page}
              totalPages={data.last_page}
              totalItems={data.total}
              pageSize={data.per_page}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>
    </>
  );
}

function Th({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <th
      className={cx(
        "px-5 py-3 text-xs font-semibold tracking-wider text-quaternary uppercase",
        className,
      )}
    >
      {children}
    </th>
  );
}
