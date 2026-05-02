import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  Download01,
  Eye,
  Receipt,
  XCircle,
  CheckSquareBroken,
} from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import {
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
} from "@/components/application/dropdown-menu";
import { EmptyState } from "@/components/application/empty-state";
import { FilterBar } from "@/components/application/filter-bar";
import { PageHeader } from "@/components/application/page-header";
import { Pagination } from "@/components/application/pagination";
import { useToast } from "@/components/application/toast";
import { adminApi } from "@/utils/admin-api";
import { cx } from "@/utils/cx";

interface Booking {
  id: number;
  booking_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  pickup_at: string;
  pickup_address: string;
  destination_address: string;
  vehicle_type: string;
  passengers: number;
  price_cents: number;
  status: string;
  payment_status: string;
  moneybird_quote_id: string | null;
  moneybird_invoice_id: string | null;
}

interface Paginated {
  data: Booking[];
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}

const statusOptions: { value: string; label: string }[] = [
  { value: "",          label: "Alle statussen" },
  { value: "pending",   label: "Aanvraag" },
  { value: "confirmed", label: "Bevestigd" },
  { value: "completed", label: "Voltooid" },
  { value: "cancelled", label: "Geannuleerd" },
];

const paymentOptions: { value: string; label: string }[] = [
  { value: "",        label: "Alle betalingen" },
  { value: "pending", label: "Onbetaald" },
  { value: "paid",    label: "Betaald" },
  { value: "overdue", label: "Te laat" },
];

const statusBadge: Record<string, { color: "warning" | "success" | "gray" | "error"; label: string }> = {
  pending:   { color: "warning", label: "Aanvraag" },
  confirmed: { color: "success", label: "Bevestigd" },
  completed: { color: "gray",    label: "Voltooid" },
  cancelled: { color: "error",   label: "Geannuleerd" },
};

const paymentBadge: Record<string, { color: "warning" | "success" | "gray" | "error"; label: string }> = {
  pending: { color: "warning", label: "Onbetaald" },
  paid:    { color: "success", label: "Betaald" },
  overdue: { color: "error",   label: "Te laat" },
};

function euro(cents: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

function relativeTime(iso: string): string {
  const target = new Date(iso).getTime();
  const diffMs = target - Date.now();
  const sec = Math.round(diffMs / 1000);
  const abs = Math.abs(sec);
  const future = sec > 0;

  if (abs < 60) return future ? "binnenkort" : "zojuist";
  const min = Math.round(abs / 60);
  if (min < 60) return future ? `over ${min}m` : `${min}m geleden`;
  const hr = Math.round(min / 60);
  if (hr < 24) return future ? `over ${hr}u` : `${hr}u geleden`;
  const day = Math.round(hr / 24);
  if (day < 30) return future ? `over ${day}d` : `${day}d geleden`;
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

export default function AdminBoekingen() {
  const navigate = useNavigate();
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [status, setStatus] = useState(searchParams.get("status") ?? "");
  const [paymentStatus, setPaymentStatus] = useState(searchParams.get("payment_status") ?? "");
  const [page, setPage] = useState(Number(searchParams.get("page") ?? "1") || 1);

  // Sync URL when filters change
  useEffect(() => {
    const next = new URLSearchParams();
    if (search) next.set("search", search);
    if (status) next.set("status", status);
    if (paymentStatus) next.set("payment_status", paymentStatus);
    if (page > 1) next.set("page", String(page));
    setSearchParams(next, { replace: true });
  }, [search, status, paymentStatus, page, setSearchParams]);

  const params = new URLSearchParams({ page: String(page) });
  if (search) params.set("search", search);
  if (status) params.set("status", status);
  if (paymentStatus) params.set("payment_status", paymentStatus);

  const { data, isLoading } = useQuery<Paginated>({
    queryKey: ["admin-bookings", search, status, paymentStatus, page],
    queryFn: () => adminApi.get<Paginated>(`/bookings?${params}`),
  });

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }
  function handleStatus(value: string) {
    setStatus(value);
    setPage(1);
  }
  function handlePayment(value: string) {
    setPaymentStatus(value);
    setPage(1);
  }

  const filterSelectClass =
    "rounded-lg border border-primary bg-primary py-2.5 px-3 text-sm text-primary shadow-xs transition duration-100 ease-linear focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";

  const total = data?.total ?? 0;
  const bookings = data?.data ?? [];

  return (
    <>
      <Helmet><title>Boekingen — YAS Admin</title></Helmet>

      <div className="space-y-6 p-6 md:p-8">
        <PageHeader
          title="Boekingen"
          description={data ? `${total} ritten totaal` : "Alle ritten in het systeem."}
          actions={
            <Button
              size="sm"
              color="secondary"
              iconLeading={Download01}
              onClick={() => toast.info("Export volgt", "Deze functie is binnenkort beschikbaar.")}
            >
              Exporteer
            </Button>
          }
        />

        <FilterBar
          search={{
            value: search,
            onChange: handleSearch,
            placeholder: "Zoek op naam, e-mail, boekingnummer…",
          }}
        >
          <select
            aria-label="Status filter"
            value={status}
            onChange={(e) => handleStatus(e.target.value)}
            className={filterSelectClass}
          >
            {statusOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <select
            aria-label="Betalingsfilter"
            value={paymentStatus}
            onChange={(e) => handlePayment(e.target.value)}
            className={filterSelectClass}
          >
            {paymentOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </FilterBar>

        <div className="overflow-hidden rounded-xl border border-secondary bg-primary">
          {isLoading ? (
            <div className="p-8 text-center text-sm text-tertiary">Laden…</div>
          ) : bookings.length === 0 ? (
            <EmptyState
              icon={Receipt}
              title="Geen boekingen gevonden"
              description="Probeer andere filters of een andere zoekterm."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-secondary bg-secondary_subtle">
                  <tr>
                    <Th>Klant</Th>
                    <Th>Boeking</Th>
                    <Th>Route</Th>
                    <Th className="text-right">Prijs</Th>
                    <Th>Status</Th>
                    <Th>Betaling</Th>
                    <Th className="w-12"><span className="sr-only">Acties</span></Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary">
                  {bookings.map((b) => {
                    const sb = statusBadge[b.status] ?? { color: "gray" as const, label: b.status };
                    const pb = paymentBadge[b.payment_status] ?? { color: "gray" as const, label: b.payment_status };
                    return (
                      <tr
                        key={b.id}
                        onClick={() => navigate(`/admin/boekingen/${b.id}`)}
                        className="cursor-pointer transition duration-100 ease-linear hover:bg-primary_hover"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar size="sm" initials={getInitials(b.customer_name)} alt={b.customer_name} />
                            <div className="min-w-0">
                              <p className="truncate font-medium text-primary">{b.customer_name}</p>
                              <p className="truncate text-xs text-tertiary">{b.customer_email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-mono text-sm font-medium text-primary">{b.booking_number}</p>
                          <p className="text-xs text-tertiary">{relativeTime(b.pickup_at)}</p>
                        </td>
                        <td className="max-w-[280px] px-5 py-4">
                          <div className="flex items-center gap-1.5 text-xs text-secondary">
                            <span className="truncate">{b.pickup_address}</span>
                            <ArrowRight aria-hidden="true" className="size-3 shrink-0 text-fg-quaternary" />
                            <span className="truncate">{b.destination_address}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-right whitespace-nowrap font-medium text-primary">
                          {euro(b.price_cents)}
                        </td>
                        <td className="px-5 py-4">
                          <BadgeWithDot type="pill-color" color={sb.color} size="sm">
                            {sb.label}
                          </BadgeWithDot>
                        </td>
                        <td className="px-5 py-4">
                          <BadgeWithDot type="pill-color" color={pb.color} size="sm">
                            {pb.label}
                          </BadgeWithDot>
                        </td>
                        <td className="px-2 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <DropdownMenu>
                            <DropdownItem icon={Eye} href={`/admin/boekingen/${b.id}`}>
                              Bekijk
                            </DropdownItem>
                            <DropdownItem
                              icon={CheckSquareBroken}
                              onAction={() => toast.info("Open boeking om aan te passen", "Open de detailpagina om de status bij te werken.")}
                            >
                              Markeer betaald
                            </DropdownItem>
                            <DropdownDivider />
                            <DropdownItem
                              icon={XCircle}
                              destructive
                              onAction={() => toast.info("Open boeking om te annuleren", "Open de detailpagina om de boeking te annuleren.")}
                            >
                              Annuleren
                            </DropdownItem>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
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
