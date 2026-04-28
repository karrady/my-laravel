import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/utils/admin-api";

interface Review {
  id: number;
  author_name: string;
  rating: number;
  body: string;
  source: string | null;
  is_published: boolean;
  created_at: string;
}

const empty = { author_name: "", rating: 5, body: "", source: "google", is_published: true };

export default function AdminCmsReviews() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<Review> | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ ...empty });

  const { data = [], isLoading } = useQuery<Review[]>({
    queryKey: ["admin-cms-reviews"],
    queryFn: () => adminApi.get<Review[]>("/cms/reviews"),
  });

  const createMutation = useMutation({
    mutationFn: (d: typeof form) => adminApi.post("/cms/reviews", d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-cms-reviews"] }); setCreating(false); setForm({ ...empty }); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Review> }) => adminApi.patch(`/cms/reviews/${id}`, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-cms-reviews"] }); setEditing(null); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminApi.delete(`/cms/reviews/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-cms-reviews"] }),
  });

  function openEdit(r: Review) {
    setEditing(r);
    setForm({ author_name: r.author_name, rating: r.rating, body: r.body, source: r.source ?? "", is_published: r.is_published });
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-primary">Reviews</h1>
        <button onClick={() => setCreating(true)} className="px-4 py-2 text-sm font-medium bg-brand-solid text-white rounded-lg hover:bg-brand-solid_hover transition duration-100">
          + Toevoegen
        </button>
      </div>

      {isLoading ? <p className="text-tertiary text-sm">Laden…</p> : (
        <div className="bg-primary rounded-2xl border border-secondary divide-y divide-secondary overflow-hidden">
          {data.map((r) => (
            <div key={r.id} className="flex items-start justify-between gap-4 px-5 py-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-primary">{r.author_name}</p>
                  <span className="text-xs text-quaternary">{r.source}</span>
                  {!r.is_published && <span className="text-xs text-warning-primary">Verborgen</span>}
                </div>
                <p className="text-xs text-brand-secondary mt-0.5">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</p>
                <p className="text-xs text-tertiary mt-1 line-clamp-2">{r.body}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(r)} className="px-3 py-1.5 text-xs rounded-lg border border-secondary text-secondary hover:bg-primary_hover transition duration-100">Bewerken</button>
                <button onClick={() => deleteMutation.mutate(r.id)} className="px-3 py-1.5 text-xs rounded-lg border border-error text-error-primary hover:bg-error-primary transition duration-100">Verwijderen</button>
              </div>
            </div>
          ))}
          {data.length === 0 && <p className="px-5 py-8 text-center text-tertiary text-sm">Geen reviews.</p>}
        </div>
      )}

      {(creating || editing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay">
          <div className="bg-primary rounded-2xl border border-secondary shadow-xl w-full max-w-lg mx-4 p-6 space-y-4">
            <h2 className="text-base font-semibold text-primary">{editing ? "Review bewerken" : "Review toevoegen"}</h2>
            <div>
              <label className="block text-xs font-medium text-secondary mb-1">Naam</label>
              <input value={form.author_name} onChange={(e) => setForm((p) => ({ ...p, author_name: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-secondary mb-1">Beoordeling (1-5)</label>
                <input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm((p) => ({ ...p, rating: +e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
              </div>
              <div>
                <label className="block text-xs font-medium text-secondary mb-1">Bron</label>
                <select value={form.source} onChange={(e) => setForm((p) => ({ ...p, source: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand">
                  <option value="google">Google</option>
                  <option value="direct">Direct</option>
                  <option value="other">Overig</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-secondary mb-1">Tekst</label>
              <textarea rows={4} value={form.body} onChange={(e) => setForm((p) => ({ ...p, body: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand resize-none" />
            </div>
            <label className="flex items-center gap-2 text-sm text-secondary cursor-pointer">
              <input type="checkbox" checked={form.is_published} onChange={(e) => setForm((p) => ({ ...p, is_published: e.target.checked }))} className="rounded" />
              Gepubliceerd
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
