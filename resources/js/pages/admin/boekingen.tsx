import { useState } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/utils/admin-api";

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
}

const statusLabel: Record<string, string> = {
  pending: "Aanvraag",
  confirmed: "Bevestigd",
  cancelled: "Geannuleerd",
  completed: "Voltooid",
};

const statusColor: Record<string, string> = {
  pending: "bg-warning-secondary text-warning-primary",
  confirmed: "bg-success-secondary text-success-primary",
  cancelled: "bg-error-secondary text-error-primary",
  completed: "bg-secondary text-tertiary",
};

function euro(cents: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(cents);
}

export default function AdminBoekingen() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const params = new URLSearchParams({ page: String(page) });
  if (search) params.set("search", search);
  if (status) params.set("status", status);

  const { data, isLoading } = useQuery<Paginated>({
    queryKey: ["admin-bookings", search, status, page],
    queryFn: () => adminApi.get<Paginated>(`/bookings?${params}`),
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-primary">Boekingen</h1>
          {data && <p className="text-sm text-tertiary mt-0.5">{data.total} ritten totaal</p>}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="search"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Zoek op naam, e-mail, boekingnummer…"
          className="px-3.5 py-2 rounded-lg border border-primary text-sm text-primary bg-primary w-72 focus:outline-none focus:ring-2 focus:ring-brand transition duration-100"
        />
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="px-3.5 py-2 rounded-lg border border-primary text-sm text-primary bg-primary focus:outline-none focus:ring-2 focus:ring-brand transition duration-100"
        >
          <option value="">Alle statussen</option>
          <option value="pending">Aanvraag</option>
          <option value="confirmed">Bevestigd</option>
          <option value="completed">Voltooid</option>
          <option value="cancelled">Geannuleerd</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-primary rounded-2xl border border-secondary overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-tertiary text-sm">Laden…</div>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead className="border-b border-secondary bg-secondary">
                <tr>
                  {["Nummer", "Klant", "Datum", "Van → Naar", "Prijs", "Status", "Betaling"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-tertiary uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary">
                {data?.data.map((b) => (
                  <tr key={b.id} className="hover:bg-primary_hover transition duration-100">
                    <td className="px-4 py-3">
                      <Link to={`/admin/boekingen/${b.id}`} className="text-brand-secondary font-medium hover:underline">
                        {b.booking_number}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-primary font-medium">{b.customer_name}</p>
                      <p className="text-tertiary text-xs">{b.customer_phone}</p>
                    </td>
                    <td className="px-4 py-3 text-secondary whitespace-nowrap">
                      {new Date(b.pickup_at).toLocaleDateString("nl-NL", { day: "2-digit", month: "short" })}<br />
                      <span className="text-tertiary text-xs">{new Date(b.pickup_at).toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" })}</span>
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      <p className="text-secondary truncate text-xs">{b.pickup_address}</p>
                      <p className="text-tertiary truncate text-xs">→ {b.destination_address}</p>
                    </td>
                    <td className="px-4 py-3 text-primary font-medium whitespace-nowrap">
                      {euro(b.price_cents)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[b.status] ?? ""}`}>
                        {statusLabel[b.status] ?? b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {b.payment_status === "paid"
                        ? <span className="text-success-primary font-medium">Betaald</span>
                        : b.payment_status === "overdue"
                        ? <span className="text-error-primary font-medium">Te laat</span>
                        : <span className="text-warning-primary">Onbetaald</span>}
                      {b.moneybird_quote_id && (
                        <span className="block text-tertiary">Offerte ✓</span>
                      )}
                    </td>
                  </tr>
                ))}
                {data?.data.length === 0 && (
                  <tr><td colSpan={7} className="px-4 py-8 text-center text-tertiary">Geen boekingen gevonden.</td></tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            {data && data.last_page > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-secondary">
                <p className="text-xs text-tertiary">Pagina {data.current_page} van {data.last_page}</p>
                <div className="flex gap-2">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-3 py-1.5 text-xs rounded-lg border border-secondary text-secondary hover:bg-primary_hover disabled:opacity-40 transition duration-100"
                  >Vorige</button>
                  <button
                    disabled={page >= data.last_page}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-3 py-1.5 text-xs rounded-lg border border-secondary text-secondary hover:bg-primary_hover disabled:opacity-40 transition duration-100"
                  >Volgende</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
