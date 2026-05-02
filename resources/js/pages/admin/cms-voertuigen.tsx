import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Car01, Edit01, EyeOff, Plus, Trash01, Users01 } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { ConfirmInline } from "@/components/application/confirm-inline";
import { DropdownItem, DropdownMenu } from "@/components/application/dropdown-menu";
import { EmptyState } from "@/components/application/empty-state";
import { FilterBar } from "@/components/application/filter-bar";
import { PageHeader } from "@/components/application/page-header";
import { SlideOver } from "@/components/application/slide-over";
import { StatCard } from "@/components/application/stat-card";
import { useToast } from "@/components/application/toast";
import { adminApi } from "@/utils/admin-api";

interface Vehicle {
  id: number;
  name: string;
  type: string;
  capacity: number;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
}

type FormState = {
  name: string;
  type: string;
  capacity: string;
  description: string;
  image_url: string;
  sort_order: string;
  is_active: boolean;
};

const empty: FormState = {
  name: "",
  type: "",
  capacity: "4",
  description: "",
  image_url: "",
  sort_order: "0",
  is_active: true,
};

export default function AdminCmsVoertuigen() {
  const qc = useQueryClient();
  const toast = useToast();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<FormState>({ ...empty });

  const { data = [], isLoading } = useQuery<Vehicle[]>({
    queryKey: ["admin-cms-vehicles"],
    queryFn: () => adminApi.get<Vehicle[]>("/cms/vehicles"),
  });

  const createMutation = useMutation({
    mutationFn: (d: Record<string, unknown>) => adminApi.post("/cms/vehicles", d),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-cms-vehicles"] });
      setOpen(false);
      toast.success("Voertuig toegevoegd");
    },
    onError: (e: Error) => toast.error("Aanmaken mislukt", e.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Record<string, unknown> }) =>
      adminApi.patch(`/cms/vehicles/${id}`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-cms-vehicles"] });
      setOpen(false);
      toast.success("Voertuig opgeslagen");
    },
    onError: (e: Error) => toast.error("Opslaan mislukt", e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminApi.delete(`/cms/vehicles/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-cms-vehicles"] });
      toast.success("Voertuig verwijderd");
    },
    onError: (e: Error) => toast.error("Verwijderen mislukt", e.message),
  });

  const stats = useMemo(() => {
    const total = data.length;
    const active = data.filter((v) => v.is_active).length;
    const totalCapacity = data.reduce((sum, v) => sum + (v.capacity ?? 0), 0);
    return { total, active, totalCapacity };
  }, [data]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.type.toLowerCase().includes(q) ||
        (v.description ?? "").toLowerCase().includes(q),
    );
  }, [data, search]);

  function startCreate() {
    setEditingId(null);
    setForm({ ...empty });
    setOpen(true);
  }

  function startEdit(v: Vehicle) {
    setEditingId(v.id);
    setForm({
      name: v.name,
      type: v.type,
      capacity: String(v.capacity ?? 4),
      description: v.description ?? "",
      image_url: v.image_url ?? "",
      sort_order: String(v.sort_order ?? 0),
      is_active: v.is_active,
    });
    setOpen(true);
  }

  function handleSave() {
    const payload = {
      name: form.name,
      type: form.type,
      capacity: parseInt(form.capacity, 10) || 0,
      description: form.description,
      image_url: form.image_url,
      sort_order: parseInt(form.sort_order, 10) || 0,
      is_active: form.is_active,
    };
    if (editingId) updateMutation.mutate({ id: editingId, data: payload });
    else createMutation.mutate(payload);
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6 p-6 md:p-8">
      <Helmet>
        <title>Voertuigen — YAS Admin</title>
      </Helmet>

      <PageHeader
        title="Voertuigen"
        description="Beheer de voertuigcategorieën die op de publieke site getoond worden bij de prijscalculatie."
        actions={
          <Button size="md" iconLeading={Plus} onClick={startCreate}>
            Nieuw voertuig
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Totaal voertuigen" value={stats.total} icon={Car01} />
        <StatCard label="Actief" value={stats.active} icon={Car01} helperText="Zichtbaar op publieke site" />
        <StatCard label="Totale capaciteit" value={stats.totalCapacity} icon={Users01} helperText="Som van zitplaatsen" />
      </div>

      <FilterBar
        search={{
          value: search,
          onChange: setSearch,
          placeholder: "Zoek op naam, type of beschrijving…",
        }}
      />

      {isLoading ? (
        <p className="text-sm text-tertiary">Laden…</p>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Car01}
          title={search ? "Geen resultaten" : "Nog geen voertuigen"}
          description={
            search
              ? "Probeer een andere zoekterm."
              : "Voeg het eerste voertuig toe om de prijscalculatie compleet te maken."
          }
          action={
            !search ? (
              <Button size="md" iconLeading={Plus} onClick={startCreate}>
                Nieuw voertuig
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-secondary bg-primary">
          <table className="w-full text-sm">
            <thead className="border-b border-secondary bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-tertiary uppercase">Voertuig</th>
                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-tertiary uppercase">Type</th>
                <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-tertiary uppercase">Passagiers</th>
                <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-tertiary uppercase">Volgorde</th>
                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-tertiary uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-tertiary uppercase">Acties</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary">
              {filtered.map((v) => (
                <tr key={v.id} className="transition duration-100 ease-linear hover:bg-primary_hover">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {v.image_url ? (
                        <img
                          src={v.image_url}
                          alt={v.name}
                          className="size-10 shrink-0 rounded-lg object-cover ring-1 ring-secondary"
                        />
                      ) : (
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary_subtle text-fg-quaternary ring-1 ring-secondary">
                          <Car01 aria-hidden="true" className="size-5" />
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="truncate font-medium text-primary">{v.name}</p>
                        {v.description && (
                          <p className="mt-0.5 truncate text-xs text-tertiary">{v.description}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge type="pill-color" color="brand" size="sm">
                      {v.type || "—"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap text-secondary">
                    <span className="inline-flex items-center gap-1.5">
                      <Users01 aria-hidden="true" className="size-4 text-fg-quaternary" />
                      {v.capacity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap text-tertiary">{v.sort_order}</td>
                  <td className="px-6 py-4">
                    {v.is_active ? (
                      <Badge type="pill-color" color="success" size="sm">Actief</Badge>
                    ) : (
                      <Badge type="pill-color" color="gray" size="sm">Inactief</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <ConfirmInline
                        icon={Trash01}
                        onConfirm={() => deleteMutation.mutate(v.id)}
                        isLoading={deleteMutation.isPending && deleteMutation.variables === v.id}
                      />
                      <DropdownMenu>
                        <DropdownItem icon={Edit01} onAction={() => startEdit(v)}>
                          Bewerken
                        </DropdownItem>
                        <DropdownItem
                          icon={EyeOff}
                          onAction={() =>
                            updateMutation.mutate({
                              id: v.id,
                              data: { is_active: !v.is_active },
                            })
                          }
                        >
                          {v.is_active ? "Op inactief zetten" : "Activeren"}
                        </DropdownItem>
                      </DropdownMenu>
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
        title={editingId ? "Voertuig bewerken" : "Nieuw voertuig"}
        description="Wordt getoond op de publieke site bij de prijscalculatie en in voertuigoverzichten."
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Naam"
              isRequired
              value={form.name}
              onChange={(value) => setForm((p) => ({ ...p, name: value }))}
              placeholder="Sedan Comfort"
            />
            <Input
              label="Type"
              isRequired
              value={form.type}
              onChange={(value) => setForm((p) => ({ ...p, type: value }))}
              placeholder="sedan / business / taxibus"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Capaciteit (passagiers)"
              isRequired
              type="number"
              value={form.capacity}
              onChange={(value) => setForm((p) => ({ ...p, capacity: value }))}
              placeholder="4"
            />
            <Input
              label="Volgorde"
              type="number"
              value={form.sort_order}
              onChange={(value) => setForm((p) => ({ ...p, sort_order: value }))}
              hint="Lager getal = hoger in de lijst"
            />
          </div>

          <TextArea
            label="Beschrijving"
            value={form.description}
            onChange={(value) => setForm((p) => ({ ...p, description: value }))}
            rows={3}
            placeholder="Comfortabele sedan, geschikt voor 1-4 passagiers."
          />

          <Input
            label="Afbeelding URL"
            value={form.image_url}
            onChange={(value) => setForm((p) => ({ ...p, image_url: value }))}
            placeholder="https://…"
            hint="Optioneel — wordt getoond als voorvertoning in het overzicht."
          />

          {form.image_url && (
            <div className="overflow-hidden rounded-lg border border-secondary bg-secondary_subtle">
              <img
                src={form.image_url}
                alt="Voorvertoning"
                className="h-40 w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}

          <div className="space-y-3 rounded-lg border border-secondary bg-secondary_subtle p-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => setForm((p) => ({ ...p, is_active: e.target.checked }))}
                className="mt-1 size-4 rounded border-primary"
              />
              <span className="text-sm">
                <span className="font-medium text-primary">Actief</span>
                <span className="block text-xs text-tertiary">
                  Alleen actieve voertuigen worden getoond op de publieke site en in de prijscalculatie.
                </span>
              </span>
            </label>
          </div>
        </div>
      </SlideOver>
    </div>
  );
}
