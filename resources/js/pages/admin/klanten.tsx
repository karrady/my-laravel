import { useState } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/utils/admin-api";

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
}

function euro(cents: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(cents);
}

export default function AdminKlanten() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const params = new URLSearchParams({ page: String(page) });
  if (search) params.set("search", search);

  const { data, isLoading } = useQuery<Paginated>({
    queryKey: ["admin-customers", search, page],
    queryFn: () => adminApi.get<Paginated>(`/customers?${params}`),
  });

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-primary">Klanten</h1>
        {data && <p className="text-sm text-tertiary mt-0.5">{data.total} klanten</p>}
      </div>

      <input
        type="search"
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        placeholder="Zoek op naam, e-mail of telefoon…"
        className="px-3.5 py-2 rounded-lg border border-primary text-sm text-primary bg-primary w-72 focus:outline-none focus:ring-2 focus:ring-brand transition duration-100"
      />

      <div className="bg-primary rounded-2xl border border-secondary overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-tertiary text-sm">Laden…</div>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead className="border-b border-secondary bg-secondary">
                <tr>
                  {["Naam", "Contact", "Ritten", "Besteed", "Laatste rit"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-tertiary uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary">
                {data?.data.map((c) => (
                  <tr key={c.customer_email} className="hover:bg-primary_hover transition duration-100">
                    <td className="px-4 py-3">
                      <Link
                        to={`/admin/klanten/${encodeURIComponent(c.customer_email)}`}
                        className="text-brand-secondary font-medium hover:underline"
                      >
                        {c.customer_name}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <a href={`mailto:${c.customer_email}`} className="text-secondary hover:underline text-xs block">{c.customer_email}</a>
                      <a href={`tel:${c.customer_phone}`} className="text-tertiary text-xs">{c.customer_phone}</a>
                    </td>
                    <td className="px-4 py-3 text-primary font-medium">{c.booking_count}</td>
                    <td className="px-4 py-3 text-primary font-medium">{euro(c.total_cents ?? 0)}</td>
                    <td className="px-4 py-3 text-tertiary text-xs">
                      {c.last_booking_at ? new Date(c.last_booking_at).toLocaleDateString("nl-NL") : "—"}
                    </td>
                  </tr>
                ))}
                {data?.data.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-tertiary">Geen klanten gevonden.</td></tr>
                )}
              </tbody>
            </table>

            {data && data.last_page > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-secondary">
                <p className="text-xs text-tertiary">Pagina {data.current_page} van {data.last_page}</p>
                <div className="flex gap-2">
                  <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-1.5 text-xs rounded-lg border border-secondary text-secondary hover:bg-primary_hover disabled:opacity-40">Vorige</button>
                  <button disabled={page >= data.last_page} onClick={() => setPage((p) => p + 1)} className="px-3 py-1.5 text-xs rounded-lg border border-secondary text-secondary hover:bg-primary_hover disabled:opacity-40">Volgende</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
