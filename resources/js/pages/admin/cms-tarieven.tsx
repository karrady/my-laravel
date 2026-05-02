import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/utils/admin-api";

type Category = "airport" | "local";

interface FixedPrice {
  id: number;
  from_label: string;
  to_label: string;
  from_lat: number;
  from_lng: number;
  from_radius_km: number;
  to_lat: number;
  to_lng: number;
  to_radius_km: number;
  sedan_cents: number;
  business_cents: number;
  taxibus_cents: number;
  is_bidirectional: boolean;
  is_active: boolean;
  category: Category;
}

type FormState = {
  from_label: string;
  to_label: string;
  from_lat: string;
  from_lng: string;
  from_radius_km: string;
  to_lat: string;
  to_lng: string;
  to_radius_km: string;
  sedan_cents: string;
  business_cents: string;
  taxibus_cents: string;
  is_bidirectional: boolean;
  is_active: boolean;
  category: Category;
};

const empty: FormState = {
  from_label: "",
  to_label: "",
  from_lat: "",
  from_lng: "",
  from_radius_km: "5",
  to_lat: "",
  to_lng: "",
  to_radius_km: "5",
  sedan_cents: "",
  business_cents: "",
  taxibus_cents: "",
  is_bidirectional: true,
  is_active: true,
  category: "airport",
};

function euro(cents: number): string {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(cents / 100);
}

function centsFromInput(v: string): number {
  if (!v) return 0;
  const n = parseFloat(v.replace(",", "."));
  return Math.round((isNaN(n) ? 0 : n) * 100);
}

function inputFromCents(c: number): string {
  return (c / 100).toFixed(2);
}

export default function AdminCmsTarieven() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<FixedPrice | null>(null);
  const [creatingCategory, setCreatingCategory] = useState<Category | null>(null);
  const [form, setForm] = useState<FormState>({ ...empty });

  const { data = [], isLoading } = useQuery<FixedPrice[]>({
    queryKey: ["admin-cms-fixed-prices"],
    queryFn: () => adminApi.get<FixedPrice[]>("/cms/fixed-prices"),
  });

  const createMutation = useMutation({
    mutationFn: (d: Record<string, unknown>) => adminApi.post("/cms/fixed-prices", d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-cms-fixed-prices"] }); setCreatingCategory(null); setForm({ ...empty }); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Record<string, unknown> }) => adminApi.patch(`/cms/fixed-prices/${id}`, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-cms-fixed-prices"] }); setEditing(null); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminApi.delete(`/cms/fixed-prices/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-cms-fixed-prices"] }),
  });

  const airportPrices = useMemo(
    () => data.filter((p) => p.category === "airport").sort((a, b) => a.from_label.localeCompare(b.from_label)),
    [data],
  );
  const localPrices = useMemo(
    () => data.filter((p) => p.category === "local").sort((a, b) => a.from_label.localeCompare(b.from_label)),
    [data],
  );

  function openEdit(p: FixedPrice) {
    setEditing(p);
    setForm({
      from_label: p.from_label,
      to_label: p.to_label,
      from_lat: String(p.from_lat ?? ""),
      from_lng: String(p.from_lng ?? ""),
      from_radius_km: String(p.from_radius_km ?? "5"),
      to_lat: String(p.to_lat ?? ""),
      to_lng: String(p.to_lng ?? ""),
      to_radius_km: String(p.to_radius_km ?? "5"),
      sedan_cents: inputFromCents(p.sedan_cents),
      business_cents: inputFromCents(p.business_cents),
      taxibus_cents: inputFromCents(p.taxibus_cents),
      is_bidirectional: p.is_bidirectional,
      is_active: p.is_active,
      category: p.category,
    });
  }

  function openCreate(cat: Category) {
    setCreatingCategory(cat);
    setForm({ ...empty, category: cat });
  }

  function handleSave() {
    const payload = {
      from_label: form.from_label,
      to_label: form.to_label,
      from_lat: parseFloat(form.from_lat) || 0,
      from_lng: parseFloat(form.from_lng) || 0,
      from_radius_km: parseInt(form.from_radius_km, 10) || 5,
      to_lat: parseFloat(form.to_lat) || 0,
      to_lng: parseFloat(form.to_lng) || 0,
      to_radius_km: parseInt(form.to_radius_km, 10) || 5,
      sedan_cents: centsFromInput(form.sedan_cents),
      business_cents: centsFromInput(form.business_cents),
      taxibus_cents: centsFromInput(form.taxibus_cents),
      is_bidirectional: form.is_bidirectional,
      is_active: form.is_active,
      category: form.category,
    };
    if (editing?.id) {
      updateMutation.mutate({ id: editing.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  }

  function renderTable(prices: FixedPrice[]) {
    return (
      <div className="bg-primary rounded-2xl border border-secondary overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-secondary bg-secondary">
            <tr>
              {["Van", "Naar", "Sedan", "Business", "Taxibus", "Status", ""].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-tertiary uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary">
            {prices.map((p) => (
              <tr key={p.id} className="hover:bg-primary_hover transition duration-100">
                <td className="px-4 py-3 text-primary font-medium">{p.from_label}</td>
                <td className="px-4 py-3 text-primary">
                  {p.to_label}
                  {p.is_bidirectional && <span className="text-tertiary text-xs ml-1">(↔)</span>}
                </td>
                <td className="px-4 py-3 text-secondary whitespace-nowrap">{euro(p.sedan_cents)}</td>
                <td className="px-4 py-3 text-secondary whitespace-nowrap">{euro(p.business_cents)}</td>
                <td className="px-4 py-3 text-secondary whitespace-nowrap">{euro(p.taxibus_cents)}</td>
                <td className="px-4 py-3">
                  {p.is_active
                    ? <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-success-secondary text-success-primary">Actief</span>
                    : <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-secondary text-tertiary">Inactief</span>}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => openEdit(p)} className="px-3 py-1.5 text-xs rounded-lg border border-secondary text-secondary hover:bg-primary_hover transition duration-100">Bewerken</button>
                    <button onClick={() => deleteMutation.mutate(p.id)} className="px-3 py-1.5 text-xs rounded-lg border border-error text-error-primary hover:bg-error-primary transition duration-100">Verwijderen</button>
                  </div>
                </td>
              </tr>
            ))}
            {prices.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-tertiary">Nog geen tarieven.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  const showForm = editing !== null || creatingCategory !== null;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-xl font-semibold text-primary">Vaste tarieven</h1>
        <p className="text-sm text-tertiary mt-0.5">Beheer luchthaventarieven en lokale ritprijzen.</p>
      </div>

      {/* Airport section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-primary">Luchthaventarieven</h2>
          <button onClick={() => openCreate("airport")} className="px-4 py-2 text-sm font-medium bg-brand-solid text-white rounded-lg hover:bg-brand-solid_hover transition duration-100">
            + Toevoegen
          </button>
        </div>
        {isLoading ? <p className="text-tertiary text-sm">Laden…</p> : renderTable(airportPrices)}
      </section>

      {/* Local section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-primary">Lokale ritten</h2>
          <button onClick={() => openCreate("local")} className="px-4 py-2 text-sm font-medium bg-brand-solid text-white rounded-lg hover:bg-brand-solid_hover transition duration-100">
            + Toevoegen
          </button>
        </div>
        {isLoading ? <p className="text-tertiary text-sm">Laden…</p> : renderTable(localPrices)}
      </section>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay overflow-y-auto py-8">
          <div className="bg-primary rounded-2xl border border-secondary shadow-xl w-full max-w-2xl mx-4 p-6 space-y-4 my-auto">
            <h2 className="text-base font-semibold text-primary">{editing ? "Tarief bewerken" : "Tarief toevoegen"}</h2>

            <div>
              <label className="block text-xs font-medium text-secondary mb-1">Categorie</label>
              <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as Category }))}
                className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand">
                <option value="airport">Luchthaven</option>
                <option value="local">Lokaal</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-secondary mb-1">Van (label)</label>
                <input value={form.from_label} onChange={(e) => setForm((p) => ({ ...p, from_label: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
              </div>
              <div>
                <label className="block text-xs font-medium text-secondary mb-1">Naar (label)</label>
                <input value={form.to_label} onChange={(e) => setForm((p) => ({ ...p, to_label: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-secondary mb-1">Van lat</label>
                <input value={form.from_lat} onChange={(e) => setForm((p) => ({ ...p, from_lat: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
              </div>
              <div>
                <label className="block text-xs font-medium text-secondary mb-1">Van lng</label>
                <input value={form.from_lng} onChange={(e) => setForm((p) => ({ ...p, from_lng: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
              </div>
              <div>
                <label className="block text-xs font-medium text-secondary mb-1">Radius (km)</label>
                <input type="number" min={1} max={50} value={form.from_radius_km} onChange={(e) => setForm((p) => ({ ...p, from_radius_km: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-secondary mb-1">Naar lat</label>
                <input value={form.to_lat} onChange={(e) => setForm((p) => ({ ...p, to_lat: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
              </div>
              <div>
                <label className="block text-xs font-medium text-secondary mb-1">Naar lng</label>
                <input value={form.to_lng} onChange={(e) => setForm((p) => ({ ...p, to_lng: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
              </div>
              <div>
                <label className="block text-xs font-medium text-secondary mb-1">Radius (km)</label>
                <input type="number" min={1} max={50} value={form.to_radius_km} onChange={(e) => setForm((p) => ({ ...p, to_radius_km: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-secondary mb-1">Sedan (€)</label>
                <input type="number" step="0.01" min="0" value={form.sedan_cents} onChange={(e) => setForm((p) => ({ ...p, sedan_cents: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
              </div>
              <div>
                <label className="block text-xs font-medium text-secondary mb-1">Business (€)</label>
                <input type="number" step="0.01" min="0" value={form.business_cents} onChange={(e) => setForm((p) => ({ ...p, business_cents: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
              </div>
              <div>
                <label className="block text-xs font-medium text-secondary mb-1">Taxibus (€)</label>
                <input type="number" step="0.01" min="0" value={form.taxibus_cents} onChange={(e) => setForm((p) => ({ ...p, taxibus_cents: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <label className="flex items-center gap-2 text-sm text-secondary cursor-pointer">
                <input type="checkbox" checked={form.is_bidirectional} onChange={(e) => setForm((p) => ({ ...p, is_bidirectional: e.target.checked }))} className="rounded" />
                Bidirectioneel (geldt ook voor terugrit)
              </label>
              <label className="flex items-center gap-2 text-sm text-secondary cursor-pointer">
                <input type="checkbox" checked={form.is_active} onChange={(e) => setForm((p) => ({ ...p, is_active: e.target.checked }))} className="rounded" />
                Actief
              </label>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button onClick={() => { setEditing(null); setCreatingCategory(null); }} className="px-4 py-2 text-sm rounded-lg border border-secondary text-secondary hover:bg-primary_hover transition duration-100">Annuleren</button>
              <button onClick={handleSave} className="px-4 py-2 text-sm font-medium rounded-lg bg-brand-solid text-white hover:bg-brand-solid_hover transition duration-100">Opslaan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
