import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Clock,
  CurrencyEuroCircle,
  MessageSquare02,
  Receipt,
} from "@untitledui/icons";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { EmptyState } from "@/components/application/empty-state";
import { PageHeader } from "@/components/application/page-header";
import { StatCard } from "@/components/application/stat-card";
import { adminApi } from "@/utils/admin-api";
import { cx } from "@/utils/cx";

interface RecentBooking {
  id: number;
  booking_number: string;
  customer_name: string;
  customer_email: string;
  pickup_at: string;
  pickup_address: string;
  destination_address: string;
  status: string;
  payment_status: string;
  price_cents: number;
  vehicle_type: string;
}

interface DashboardData {
  bookings_today: number;
  bookings_week: number;
  bookings_month: number;
  bookings_total: number;
  bookings_last_7_days: number;
  bookings_7d_change_pct: number;
  bookings_pending: number;
  bookings_confirmed: number;
  bookings_completed: number;
  bookings_cancelled: number;
  revenue_today_cents: number;
  revenue_month_cents: number;
  revenue_prev_month_cents: number;
  revenue_month_change_pct: number;
  unpaid_count: number;
  contact_unread: number;
  contact_unhandled: number;
  recent_bookings: RecentBooking[];
}

function euro(cents: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function relativeTime(iso: string): string {
  const target = new Date(iso).getTime();
  const diffMs = target - Date.now();
  const sec = Math.round(diffMs / 1000);
  const abs = Math.abs(sec);
  const future = sec > 0;

  if (abs < 60) return future ? "over enkele seconden" : "zojuist";
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

const statusBadge: Record<string, { color: "warning" | "success" | "gray" | "error"; label: string }> = {
  pending:   { color: "warning", label: "Aanvraag" },
  confirmed: { color: "success", label: "Bevestigd" },
  completed: { color: "gray",    label: "Voltooid" },
  cancelled: { color: "error",   label: "Geannuleerd" },
};

export default function AdminDashboard() {
  const { data, isLoading, error } = useQuery<DashboardData>({
    queryKey: ["admin-dashboard"],
    queryFn: () => adminApi.get<DashboardData>("/dashboard"),
    refetchInterval: 30_000,
  });

  if (isLoading) {
    return (
      <>
        <Helmet><title>Dashboard — YAS Admin</title></Helmet>
        <div className="p-8 text-sm text-tertiary">Laden…</div>
      </>
    );
  }
  if (error || !data) {
    return (
      <>
        <Helmet><title>Dashboard — YAS Admin</title></Helmet>
        <div className="p-8 text-sm text-error-primary">Laden mislukt.</div>
      </>
    );
  }

  return (
    <>
      <Helmet><title>Dashboard — YAS Admin</title></Helmet>

      <div className="space-y-6 p-6 md:space-y-8 md:p-8">
        <PageHeader
          title="Dashboard"
          description="Overzicht van vandaag — ververst automatisch elke 30 seconden."
        />

        {/* Hoofdstats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Boekingen deze maand"
            value={data.bookings_month}
            icon={Receipt}
            change={{
              value: data.bookings_7d_change_pct,
              label: "vs vorige periode (7 dgn)",
            }}
          />
          <StatCard
            label="Omzet deze maand"
            value={euro(data.revenue_month_cents)}
            icon={CurrencyEuroCircle}
            change={{
              value: data.revenue_month_change_pct,
              label: "vs vorige maand",
            }}
          />
          <StatCard
            label="Open boekingen"
            value={data.bookings_pending}
            icon={Clock}
            helperText="Wachten op bevestiging"
          />
          <StatCard
            label="Onbetaald"
            value={data.unpaid_count}
            icon={AlertCircle}
            helperText={data.unpaid_count > 0 ? "Vereist actie" : "Alles bijgewerkt"}
          />
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-secondary bg-primary px-5 py-4">
            <p className="text-xs font-medium tracking-wider text-quaternary uppercase">Vandaag</p>
            <p className="mt-1 text-xl font-semibold text-primary">{data.bookings_today}</p>
            <p className="text-xs text-tertiary">{euro(data.revenue_today_cents)} omzet</p>
          </div>
          <div className="rounded-xl border border-secondary bg-primary px-5 py-4">
            <p className="text-xs font-medium tracking-wider text-quaternary uppercase">Deze week</p>
            <p className="mt-1 text-xl font-semibold text-primary">{data.bookings_week}</p>
            <p className="text-xs text-tertiary">Boekingen sinds maandag</p>
          </div>
          <div className="rounded-xl border border-secondary bg-primary px-5 py-4">
            <p className="text-xs font-medium tracking-wider text-quaternary uppercase">Status mix</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <BadgeWithDot type="pill-color" color="success" size="sm">
                {data.bookings_confirmed} bevestigd
              </BadgeWithDot>
              <BadgeWithDot type="pill-color" color="gray" size="sm">
                {data.bookings_completed} voltooid
              </BadgeWithDot>
              <BadgeWithDot type="pill-color" color="error" size="sm">
                {data.bookings_cancelled} geannuleerd
              </BadgeWithDot>
            </div>
          </div>
        </div>

        {/* Twee kolommen: recente boekingen + zijbalk */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          {/* Recente boekingen */}
          <section className="rounded-xl border border-secondary bg-primary">
            <header className="flex items-center justify-between gap-3 border-b border-secondary px-5 py-4">
              <div>
                <h2 className="text-md font-semibold text-primary">Recente boekingen</h2>
                <p className="text-xs text-tertiary">De laatste 8 aangemaakte ritten.</p>
              </div>
              <Button color="link-color" size="sm" href="/admin/boekingen" iconTrailing={ArrowRight}>
                Bekijk alle
              </Button>
            </header>

            {data.recent_bookings.length === 0 ? (
              <EmptyState
                icon={Receipt}
                title="Nog geen boekingen"
                description="Zodra er ritten binnenkomen verschijnen ze hier."
              />
            ) : (
              <ul className="divide-y divide-secondary">
                {data.recent_bookings.map((b) => {
                  const sb = statusBadge[b.status] ?? { color: "gray" as const, label: b.status };
                  return (
                    <li key={b.id}>
                      <Link
                        to={`/admin/boekingen/${b.id}`}
                        className="flex items-start gap-4 px-5 py-4 transition duration-100 ease-linear hover:bg-primary_hover"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-sm font-medium text-primary">
                              {b.booking_number}
                            </span>
                            <BadgeWithDot type="pill-color" color={sb.color} size="sm">
                              {sb.label}
                            </BadgeWithDot>
                          </div>
                          <p className="mt-1 text-sm text-secondary">
                            {b.customer_name}
                            <span className="text-tertiary"> · {relativeTime(b.pickup_at)}</span>
                          </p>
                          <p className="mt-1 flex items-center gap-1.5 text-xs text-tertiary">
                            <span className="truncate">{b.pickup_address}</span>
                            <ArrowRight aria-hidden="true" className="size-3 shrink-0 text-fg-quaternary" />
                            <span className="truncate">{b.destination_address}</span>
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-sm font-semibold text-primary">{euro(b.price_cents)}</p>
                          <p
                            className={cx(
                              "text-xs font-medium",
                              b.payment_status === "paid"
                                ? "text-success-primary"
                                : b.payment_status === "overdue"
                                ? "text-error-primary"
                                : "text-warning-primary",
                            )}
                          >
                            {b.payment_status === "paid"
                              ? "Betaald"
                              : b.payment_status === "overdue"
                              ? "Te laat"
                              : "Onbetaald"}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          {/* Zijbalk */}
          <aside className="space-y-4">
            <section className="rounded-xl border border-secondary bg-primary">
              <header className="border-b border-secondary px-5 py-4">
                <h2 className="text-md font-semibold text-primary">Te doen</h2>
                <p className="text-xs text-tertiary">Items die je aandacht nodig hebben.</p>
              </header>
              <ul className="divide-y divide-secondary">
                <TodoRow
                  icon={MessageSquare02}
                  count={data.contact_unread}
                  href="/admin/contact-berichten?filter=unread"
                  emptyLabel="Geen ongelezen contactberichten"
                  countLabel={(n) => `${n} ongelezen contactbericht${n === 1 ? "" : "en"}`}
                  tone={data.contact_unread > 0 ? "warning" : "success"}
                />
                <TodoRow
                  icon={Clock}
                  count={data.bookings_pending}
                  href="/admin/boekingen?status=pending"
                  emptyLabel="Geen openstaande boekingen"
                  countLabel={(n) => `${n} open boeking${n === 1 ? "" : "en"}`}
                  tone={data.bookings_pending > 0 ? "warning" : "success"}
                />
                <TodoRow
                  icon={AlertCircle}
                  count={data.unpaid_count}
                  href="/admin/boekingen?payment_status=pending"
                  emptyLabel="Alles betaald"
                  countLabel={(n) => `${n} onbetaalde rit${n === 1 ? "" : "ten"}`}
                  tone={data.unpaid_count > 0 ? "error" : "success"}
                />
              </ul>
            </section>

            <section className="rounded-xl border border-secondary bg-primary px-5 py-4">
              <p className="text-xs font-medium tracking-wider text-quaternary uppercase">Totaal in systeem</p>
              <div className="mt-2 flex items-baseline justify-between gap-2">
                <span className="text-2xl font-semibold text-primary">{data.bookings_total}</span>
                <Badge type="pill-color" color="gray" size="sm">
                  ritten in totaal
                </Badge>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}

interface TodoRowProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  count: number;
  href: string;
  emptyLabel: string;
  countLabel: (n: number) => string;
  tone: "warning" | "error" | "success";
}

function TodoRow({ icon: Icon, count, href, emptyLabel, countLabel, tone }: TodoRowProps) {
  const isEmpty = count === 0;
  const toneClasses =
    tone === "error"
      ? "bg-error-secondary text-fg-error-secondary"
      : tone === "warning"
      ? "bg-warning-secondary text-fg-warning-secondary"
      : "bg-success-secondary text-fg-success-secondary";

  return (
    <li>
      <Link
        to={href}
        className="flex items-center gap-3 px-5 py-3.5 transition duration-100 ease-linear hover:bg-primary_hover"
      >
        <span
          className={cx(
            "flex size-9 shrink-0 items-center justify-center rounded-lg",
            isEmpty ? "bg-secondary_subtle text-fg-quaternary" : toneClasses,
          )}
        >
          {isEmpty ? (
            <CheckCircle aria-hidden="true" className="size-5" />
          ) : (
            <Icon aria-hidden="true" className="size-5" />
          )}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium text-primary">
            {isEmpty ? emptyLabel : countLabel(count)}
          </span>
        </span>
        <ArrowRight aria-hidden="true" className="size-4 text-fg-quaternary" />
      </Link>
    </li>
  );
}
