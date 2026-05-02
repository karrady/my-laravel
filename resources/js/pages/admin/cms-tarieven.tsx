import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowRight, CurrencyEuroCircle, Edit01, Plus, Trash01 } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { ConfirmInline } from "@/components/application/confirm-inline";
import { EmptyState } from "@/components/application/empty-state";
import { PageHeader } from "@/components/application/page-header";
import { SlideOver } from "@/components/application/slide-over";
import { useToast } from "@/components/application/toast";
import { adminApi } from "@/utils/admin-api";
import { cx } from "@/utils/cx";

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
  sedan_eur: string;
  business_eur: string;
  taxibus_eur: string;
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
  sedan_eur: "",
  business_eur: "",
  taxibus_eur: "",
  is_bidirectional: true,
  is_active: true,
  category: "airport",
};

const formatEuro = (cents: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(cents / 100);

const eurToCents = (v: string): number => {
  if (!v) return 0;
  const n = parseFloat(v.replace(",", "."));
  return Math.round((isNaN(n) ? 0 : n) * 100);
};

const centsToEur = (c: number): string => (c / 100).toFixed(2);

export default function AdminCmsTarieven() {
  const qc = useQueryClient();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<Category>("airport");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>({ ...empty });

  const { data = [], isLoading } = useQuery<FixedPrice[]>({
    queryKey: ["admin-cms-fixed-prices"],
    queryFn: () => adminApi.get<FixedPrice[]>("/cms/fixed-prices"),
  });

  const createMutation = useMutation({
    mutationFn: (d: Record<string, unknown>) => adminApi.post("/cms/fixed-prices", d),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-cms-fixed-prices"] });
      setOpen(false);
      toast.success("Tarief toegevoegd");
    },
    onError: (e: Error) => toast.error("Aanmaken mislukt", e.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Record<string, unknown> }) =>
      adminApi.patch(`/cms/fixed-prices/${id}`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-cms-fixed-prices"] });
      setOpen(false);
      toast.success("Tarief opgeslagen");
    },
    onError: (e: Error) => toast.error("Opslaan mislukt", e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminApi.delete(`/cms/fixed-prices/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-cms-fixed-prices"] });
      toast.success("Tarief verwijderd");
    },
    onError: (e: Error) => toast.error("Verwijderen mislukt", e.message),
  });

  const grouped = useMemo(() => {
    const airport = data
      .filter((p) => p.category === "airport")
      .sort((a, b) => a.to_label.localeCompare(b.to_label) || a.from_label.localeCompare(b.from_label));
    const local = data
      .filter((p) => p.category === "local")
      .sort((a, b) => a.to_label.localeCompare(b.to_label) || a.from_label.localeCompare(b.from_label));
    return { airport, local };
  }, [data]);

  const visiblePrices = activeTab === "airport" ? grouped.airport : grouped.local;

  function startCreate() {
    setEditingId(null);
    setForm({ ...empty, category: activeTab });
    setOpen(true);
  }

  function startEdit(p: FixedPrice) {
    setEditingId(p.id);
    setForm({
      from_label: p.from_label,
      to_label: p.to_label,
      from_lat: String(p.from_lat ?? ""),
      from_lng: String(p.from_lng ?? ""),
      from_radius_km: String(p.from_radius_km ?? 5),
      to_lat: String(p.to_lat ?? ""),
      to_lng: String(p.to_lng ?? ""),
      to_radius_km: String(p.to_radius_km ?? 5),
      sedan_eur: centsToEur(p.sedan_cents),
      business_eur: centsToEur(p.business_cents),
      taxibus_eur: centsToEur(p.taxibus_cents),
      is_bidirectional: p.is_bidirectional,
      is_active: p.is_active,
      category: p.category,
    });
    setOpen(true);
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
      sedan_cents: eurToCents(form.sedan_eur),
      business_cents: eurToCents(form.business_eur),
      taxibus_cents: eurToCents(form.taxibus_eur),
      is_bidirectional: form.is_bidirectional,
      is_active: form.is_active,
      category: form.category,
    };
    if (editingId) updateMutation.mutate({ id: editingId, data: payload });
    else createMutation.mutate(payload);
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6 p-6 md:p-8">
      <PageHeader
        title="Vaste tarieven"
        description="Beheer luchthaventarieven en lokale ritprijzen. Wijzigingen zijn direct zichtbaar op de publieke site."
        actions={
          <Button size="md" iconLeading={Plus} onClick={startCreate}>
            Nieuw tarief
          </Button>
        }
      />

      {/* Tabs */}
      <div className="flex gap-1 border-b border-secondary">
        {(["airport", "local"] as Category[]).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveTab(cat)}
            className={cx(
              "relative -mb-px border-b-2 px-4 py-2.5 text-sm font-semibold transition duration-100 ease-linear",
              activeTab === cat
                ? "border-brand text-brand-secondary"
                : "border-transparent text-tertiary hover:text-secondary",
            )}
          >
            {cat === "airport" ? "Luchthaventarieven" : "Lokale ritten"}
            <Badge type="pill-color" color="gray" size="sm" className="ml-2">
              {cat === "airport" ? grouped.airport.length : grouped.local.length}
            </Badge>
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="text-sm text-tertiary">Laden…</p>
      ) : visiblePrices.length === 0 ? (
        <EmptyState
          icon={CurrencyEuroCircle}
          title={activeTab === "airport" ? "Geen luchthaventarieven" : "Geen lokale tarieven"}
          description="Voeg het eerste tarief toe om te starten."
          action={<Button size="md" iconLeading={Plus} onClick={startCreate}>Nieuw tarief</Button>}
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-secondary bg-primary">
          <table className="w-full text-sm">
            <thead className="border-b border-secondary bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-tertiary uppercase">Route</th>
                <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-tertiary uppercase">Sedan</th>
                <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-tertiary uppercase">Business</th>
                <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-tertiary uppercase">Taxibus</th>
                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-tertiary uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-tertiary uppercase">Acties</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary">
              {visiblePrices.map((p) => (
                <tr key={p.id} className="transition duration-100 ease-linear hover:bg-primary_hover">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-primary">{p.from_label}</span>
                      <ArrowRight aria-hidden="true" className="size-4 text-fg-quaternary" />
                      <span className="text-secondary">{p.to_label}</span>
                      {p.is_bidirectional && (
                        <Badge type="pill-color" color="gray" size="sm" className="ml-1">Bidir.</Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-medium whitespace-nowrap text-primary">{formatEuro(p.sedan_cents)}</td>
                  <td className="px-6 py-4 text-right whitespace-nowrap text-secondary">{formatEuro(p.business_cents)}</td>
                  <td className="px-6 py-4 text-right whitespace-nowrap text-secondary">{formatEuro(p.taxibus_cents)}</td>
                  <td className="px-6 py-4">
                    {p.is_active ? (
                      <Badge type="pill-color" color="success" size="sm">Actief</Badge>
                    ) : (
                      <Badge type="pill-color" color="gray" size="sm">Inactief</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="sm" color="tertiary" iconLeading={Edit01} onClick={() => startEdit(p)}>
                        Bewerken
                      </Button>
                      <ConfirmInline
                        icon={Trash01}
                        onConfirm={() => deleteMutation.mutate(p.id)}
                        isLoading={deleteMutation.isPending && deleteMutation.variables === p.id}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <SlideOver
        isOpen={open}
        onOpenChange={setOpen}
        size="lg"
        title={editingId ? "Tarief bewerken" : "Nieuw tarief"}
        description="Coördinaten en radius bepalen hoe de adres-matcher de juiste prijs kiest."
        footer={
          <div className="flex justify-end gap-3">
            <Button color="secondary" onClick={() => setOpen(false)} isDisabled={isSaving}>
              Annuleren
            </Button>
            <Button onClick={handleSave} isLoading={isSaving} showTextWhileLoading>
              {editingId ? "Wijzigingen opslaan" : "Aanmaken"}
            </Button>
          </div>
        }
      >
        <div className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-secondary">Categorie</label>
            <div className="grid grid-cols-2 gap-2">
              {(["airport", "local"] as Category[]).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, category: cat }))}
                  className={cx(
                    "rounded-lg border px-4 py-2.5 text-sm font-medium transition duration-100 ease-linear",
                    form.category === cat
                      ? "border-brand bg-brand-primary text-brand-secondary"
                      : "border-primary bg-primary text-secondary hover:bg-primary_hover",
                  )}
                >
                  {cat === "airport" ? "Luchthaven" : "Lokaal"}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-secondary p-4">
            <p className="mb-3 text-sm font-medium text-primary">Vertrekpunt</p>
            <div className="space-y-3">
              <Input
                label="Label"
                isRequired
                value={form.from_label}
                onChange={(value) => setForm((p) => ({ ...p, from_label: value }))}
                placeholder="Gouda Centrum"
              />
              <div className="grid grid-cols-3 gap-3">
                <Input label="Latitude" value={form.from_lat} onChange={(value) => setForm((p) => ({ ...p, from_lat: value }))} placeholder="52.0116" inputMode="decimal" />
                <Input label="Longitude" value={form.from_lng} onChange={(value) => setForm((p) => ({ ...p, from_lng: value }))} placeholder="4.7111" inputMode="decimal" />
                <Input label="Radius (km)" value={form.from_radius_km} onChange={(value) => setForm((p) => ({ ...p, from_radius_km: value }))} type="number" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-secondary p-4">
            <p className="mb-3 text-sm font-medium text-primary">Bestemming</p>
            <div className="space-y-3">
              <Input
                label="Label"
                isRequired
                value={form.to_label}
                onChange={(value) => setForm((p) => ({ ...p, to_label: value }))}
                placeholder="Amsterdam Schiphol"
              />
              <div className="grid grid-cols-3 gap-3">
                <Input label="Latitude" value={form.to_lat} onChange={(value) => setForm((p) => ({ ...p, to_lat: value }))} placeholder="52.3105" inputMode="decimal" />
                <Input label="Longitude" value={form.to_lng} onChange={(value) => setForm((p) => ({ ...p, to_lng: value }))} placeholder="4.7683" inputMode="decimal" />
                <Input label="Radius (km)" value={form.to_radius_km} onChange={(value) => setForm((p) => ({ ...p, to_radius_km: value }))} type="number" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-secondary p-4">
            <p className="mb-3 text-sm font-medium text-primary">Tarieven (€)</p>
            <div className="grid grid-cols-3 gap-3">
              <Input label="Sedan" value={form.sedan_eur} onChange={(value) => setForm((p) => ({ ...p, sedan_eur: value }))} placeholder="45.00" inputMode="decimal" />
              <Input label="Business" value={form.business_eur} onChange={(value) => setForm((p) => ({ ...p, business_eur: value }))} placeholder="58.50" inputMode="decimal" />
              <Input label="Taxibus" value={form.taxibus_eur} onChange={(value) => setForm((p) => ({ ...p, taxibus_eur: value }))} placeholder="74.25" inputMode="decimal" />
            </div>
          </div>

          <div className="space-y-3 rounded-lg border border-secondary bg-secondary_subtle p-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={form.is_bidirectional}
                onChange={(e) => setForm((p) => ({ ...p, is_bidirectional: e.target.checked }))}
                className="mt-1 size-4 rounded border-primary"
              />
              <span className="text-sm">
                <span className="font-medium text-primary">Bidirectioneel</span>
                <span className="block text-xs text-tertiary">Geldt automatisch ook voor de terugrit (van bestemming naar vertrekpunt).</span>
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => setForm((p) => ({ ...p, is_active: e.target.checked }))}
                className="mt-1 size-4 rounded border-primary"
              />
              <span className="text-sm">
                <span className="font-medium text-primary">Actief</span>
                <span className="block text-xs text-tertiary">Alleen actieve tarieven worden getoond op de publieke site en gebruikt door de prijs-matcher.</span>
              </span>
            </label>
          </div>
        </div>
      </SlideOver>
    </div>
  );
}
