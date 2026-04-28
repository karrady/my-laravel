import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

const empty = { name: "", type: "", capacity: 4, description: "", image_url: "", sort_order: 0, is_active: true };

export default function AdminCmsVoertuigen() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<Vehicle> | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ ...empty });

  const { data = [], isLoading } = useQuery<Vehicle[]>({
    queryKey: ["admin-cms-vehicles"],
    queryFn: () => adminApi.get<Vehicle[]>("/cms/vehicles"),
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof form) => adminApi.post("/cms/vehicles", data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-cms-vehicles"] }); setCreating(false); setForm({ ...empty }); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Vehicle> }) => adminApi.patch(`/cms/vehicles/${id}`, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-cms-vehicles"] }); setEditing(null); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminApi.delete(`/cms/vehicles/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-cms-vehicles"] }),
  });

  function openEdit(v: Vehicle) {
    setEditing(v);
    setForm({ name: v.name, type: v.type, capacity: v.capacity, description: v.description ?? "", image_url: v.image_url ?? "", sort_order: v.sort_order, is_active: v.is_active });
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-primary">Voertuigen</h1>
        <button onClick={() => setCreating(true)} className="px-4 py-2 text-sm font-medium bg-brand-solid text-white rounded-lg hover:bg-brand-solid_hover transition duration-100">
          + Toevoegen
        </button>
      </div>

      {isLoading ? <p className="text-tertiary text-sm">Laden…</p> : (
        <div className="bg-primary rounded-2xl border border-secondary divide-y divide-secondary overflow-hidden">
          {data.map((v) => (
            <div key={v.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-medium text-primary">{v.name}</p>
                <p className="text-xs text-tertiary">{v.type} · {v.capacity} personen · volgorde {v.sort_order}</p>
                {!v.is_active && <span className="text-xs text-warning-primary">Inactief</span>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(v)} className="px-3 py-1.5 text-xs rounded-lg border border-secondary text-secondary hover:bg-primary_hover transition duration-100">Bewerken</button>
                <button onClick={() => deleteMutation.mutate(v.id)} className="px-3 py-1.5 text-xs rounded-lg border border-error text-error-primary hover:bg-error-primary transition duration-100">Verwijderen</button>
              </div>
            </div>
          ))}
          {data.length === 0 && <p className="px-5 py-8 text-center text-tertiary text-sm">Geen voertuigen.</p>}
        </div>
      )}

      {/* Create/Edit Modal */}
      {(creating || editing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay">
          <div className="bg-primary rounded-2xl border border-secondary shadow-xl w-full max-w-md mx-4 p-6 space-y-4">
            <h2 className="text-base font-semibold text-primary">{editing ? "Voertuig bewerken" : "Voertuig toevoegen"}</h2>
            {(["name", "type"] as const).map((f) => (
              <div key={f}>
                <label className="block text-xs font-medium text-secondary mb-1 capitalize">{f}</label>
                <input value={(form as any)[f]} onChange={(e) => setForm((p) => ({ ...p, [f]: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-secondary mb-1">Capaciteit</label>
                <input type="number" min={1} max={20} value={form.capacity} onChange={(e) => setForm((p) => ({ ...p, capacity: +e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
              </div>
              <div>
                <label className="block text-xs font-medium text-secondary mb-1">Volgorde</label>
                <input type="number" value={form.sort_order} onChange={(e) => setForm((p) => ({ ...p, sort_order: +e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-secondary mb-1">Afbeelding URL</label>
              <input value={form.image_url} onChange={(e) => setForm((p) => ({ ...p, image_url: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
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
              >
                Opslaan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
