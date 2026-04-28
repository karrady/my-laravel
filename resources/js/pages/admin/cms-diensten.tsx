import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/utils/admin-api";

interface ServiceArea {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
}

const empty = { name: "", slug: "", is_active: true };

export default function AdminCmsDiensten() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<ServiceArea> | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ ...empty });

  const { data = [], isLoading } = useQuery<ServiceArea[]>({
    queryKey: ["admin-cms-service-areas"],
    queryFn: () => adminApi.get<ServiceArea[]>("/cms/service-areas"),
  });

  const createMutation = useMutation({
    mutationFn: (d: typeof form) => adminApi.post("/cms/service-areas", d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-cms-service-areas"] }); setCreating(false); setForm({ ...empty }); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ServiceArea> }) => adminApi.patch(`/cms/service-areas/${id}`, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-cms-service-areas"] }); setEditing(null); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminApi.delete(`/cms/service-areas/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-cms-service-areas"] }),
  });

  function openEdit(a: ServiceArea) {
    setEditing(a);
    setForm({ name: a.name, slug: a.slug, is_active: a.is_active });
  }

  function autoSlug(name: string) {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-primary">Servicegebieden</h1>
        <button onClick={() => setCreating(true)} className="px-4 py-2 text-sm font-medium bg-brand-solid text-white rounded-lg hover:bg-brand-solid_hover transition duration-100">
          + Toevoegen
        </button>
      </div>

      {isLoading ? <p className="text-tertiary text-sm">Laden…</p> : (
        <div className="bg-primary rounded-2xl border border-secondary divide-y divide-secondary overflow-hidden">
          {data.map((a) => (
            <div key={a.id} className="flex items-center justify-between px-5 py-3.5">
              <div>
                <p className="text-sm font-medium text-primary">{a.name}</p>
                <p className="text-xs text-tertiary">{a.slug}{!a.is_active && " · Inactief"}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(a)} className="px-3 py-1.5 text-xs rounded-lg border border-secondary text-secondary hover:bg-primary_hover transition duration-100">Bewerken</button>
                <button onClick={() => deleteMutation.mutate(a.id)} className="px-3 py-1.5 text-xs rounded-lg border border-error text-error-primary hover:bg-error-primary transition duration-100">Verwijderen</button>
              </div>
            </div>
          ))}
          {data.length === 0 && <p className="px-5 py-8 text-center text-tertiary text-sm">Geen servicegebieden.</p>}
        </div>
      )}

      {(creating || editing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay">
          <div className="bg-primary rounded-2xl border border-secondary shadow-xl w-full max-w-sm mx-4 p-6 space-y-4">
            <h2 className="text-base font-semibold text-primary">{editing ? "Servicegebied bewerken" : "Servicegebied toevoegen"}</h2>
            <div>
              <label className="block text-xs font-medium text-secondary mb-1">Naam</label>
              <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value, slug: !editing ? autoSlug(e.target.value) : p.slug }))}
                className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
            </div>
            <div>
              <label className="block text-xs font-medium text-secondary mb-1">Slug</label>
              <input value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand font-mono" />
            </div>
            <label className="flex items-center gap-2 text-sm text-secondary cursor-pointer">
              <input type="checkbox" checked={form.is_active} onChange={(e) => setForm((p) => ({ ...p, is_active: e.target.checked }))} className="rounded" />
              Actief
            </label>
            <div className="flex gap-3 justify-end pt-2">
              <button onClick={() => { setCreating(false); setEditing(null); }} className="px-4 py-2 text-sm rounded-lg border border-secondary text-secondary hover:bg-primary_hover transition duration-100">Annuleren</button>
              <button
                onClick={() => editing?.id ? updateMutation.mutate({ id: editing.id, data: form }) : createMutation.mutate(form)}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-brand-solid text-white hover:bg-brand-solid_hover transition duration-100"
              >Opslaan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
