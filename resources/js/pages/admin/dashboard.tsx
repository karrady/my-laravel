import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/utils/admin-api";

interface DashboardData {
  bookings_today: number;
  bookings_pending: number;
  bookings_total: number;
  revenue_today: number;
  revenue_this_month: number;
  unpaid_count: number;
  recent_bookings: Booking[];
}

interface Booking {
  id: number;
  booking_number: string;
  customer_name: string;
  pickup_at: string;
  status: string;
  payment_status: string;
  price_cents: number;
  vehicle_type: string;
}

const statusLabel: Record<string, string> = {
  pending: "In afwachting",
  confirmed: "Bevestigd",
  cancelled: "Geannuleerd",
  completed: "Voltooid",
};

const statusColor: Record<string, string> = {
  pending: "bg-warning-primary text-warning-primary",
  confirmed: "bg-success-primary text-success-primary",
  cancelled: "bg-error-primary text-error-primary",
  completed: "bg-secondary text-secondary",
};

const paymentColor: Record<string, string> = {
  pending: "text-warning-primary",
  paid: "text-success-primary",
  overdue: "text-error-primary",
};

function euro(cents: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(cents);
}

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-primary rounded-2xl border border-secondary p-5">
      <p className="text-sm text-tertiary">{label}</p>
      <p className="text-2xl font-semibold text-primary mt-1">{value}</p>
      {sub && <p className="text-xs text-tertiary mt-1">{sub}</p>}
    </div>
  );
}

export default function AdminDashboard() {
  const { data, isLoading, error } = useQuery<DashboardData>({
    queryKey: ["admin-dashboard"],
    queryFn: () => adminApi.get<DashboardData>("/dashboard"),
    refetchInterval: 30_000,
  });

  if (isLoading) return <div className="p-8 text-tertiary">Laden…</div>;
  if (error) return <div className="p-8 text-error-primary">Laden mislukt.</div>;
  if (!data) return null;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-primary">Dashboard</h1>
        <p className="text-sm text-tertiary mt-0.5">Overzicht van vandaag</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Ritten vandaag" value={data.bookings_today} />
        <StatCard label="In afwachting" value={data.bookings_pending} />
        <StatCard label="Onbetaald" value={data.unpaid_count} />
        <StatCard label="Omzet vandaag" value={euro(data.revenue_today)} />
        <StatCard label="Omzet deze maand" value={euro(data.revenue_this_month)} />
        <StatCard label="Totaal ritten" value={data.bookings_total} />
      </div>

      {/* Recent bookings */}
      <div className="bg-primary rounded-2xl border border-secondary overflow-hidden">
        <div className="px-5 py-4 border-b border-secondary">
          <h2 className="text-sm font-semibold text-primary">Recente boekingen</h2>
        </div>
        <div className="divide-y divide-secondary">
          {data.recent_bookings.map((b) => (
            <a
              key={b.id}
              href={`/admin/boekingen/${b.id}`}
              className="flex items-center justify-between px-5 py-3.5 hover:bg-primary_hover transition duration-100"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-primary">{b.booking_number}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[b.status] ?? ""}`}>
                    {statusLabel[b.status] ?? b.status}
                  </span>
                </div>
                <p className="text-xs text-tertiary mt-0.5 truncate">
                  {b.customer_name} · {new Date(b.pickup_at).toLocaleString("nl-NL")}
                </p>
              </div>
              <div className="text-right flex-shrink-0 ml-4">
                <p className="text-sm font-semibold text-primary">{euro(b.price_cents)}</p>
                <p className={`text-xs font-medium ${paymentColor[b.payment_status] ?? ""}`}>
                  {b.payment_status === "paid" ? "Betaald" : b.payment_status === "overdue" ? "Te laat" : "Onbetaald"}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
