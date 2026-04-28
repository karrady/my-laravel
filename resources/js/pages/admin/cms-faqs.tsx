import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/utils/admin-api";

interface Faq {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
  locale: string | null;
}

const empty = { question: "", answer: "", sort_order: 0, is_active: true, locale: "nl" };

export default function AdminCmsFaqs() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<Faq> | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ ...empty });

  const { data = [], isLoading } = useQuery<Faq[]>({
    queryKey: ["admin-cms-faqs"],
    queryFn: () => adminApi.get<Faq[]>("/cms/faqs"),
  });

  const createMutation = useMutation({
    mutationFn: (d: typeof form) => adminApi.post("/cms/faqs", d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-cms-faqs"] }); setCreating(false); setForm({ ...empty }); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Faq> }) => adminApi.patch(`/cms/faqs/${id}`, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-cms-faqs"] }); setEditing(null); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminApi.delete(`/cms/faqs/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-cms-faqs"] }),
  });

  function openEdit(f: Faq) {
    setEditing(f);
    setForm({ question: f.question, answer: f.answer, sort_order: f.sort_order, is_active: f.is_active, locale: f.locale ?? "nl" });
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-primary">FAQ's</h1>
        <button onClick={() => setCreating(true)} className="px-4 py-2 text-sm font-medium bg-brand-solid text-white rounded-lg hover:bg-brand-solid_hover transition duration-100">
          + Toevoegen
        </button>
      </div>

      {isLoading ? <p className="text-tertiary text-sm">Laden…</p> : (
        <div className="bg-primary rounded-2xl border border-secondary divide-y divide-secondary overflow-hidden">
          {data.map((f) => (
            <div key={f.id} className="px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary">{f.question}</p>
                  <p className="text-xs text-tertiary mt-1 line-clamp-2">{f.answer}</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs text-quaternary">{f.locale ?? "nl"}</span>
                    {!f.is_active && <span className="text-xs text-warning-primary">Inactief</span>}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(f)} className="px-3 py-1.5 text-xs rounded-lg border border-secondary text-secondary hover:bg-primary_hover transition duration-100">Bewerken</button>
                  <button onClick={() => deleteMutation.mutate(f.id)} className="px-3 py-1.5 text-xs rounded-lg border border-error text-error-primary hover:bg-error-primary transition duration-100">Verwijderen</button>
                </div>
              </div>
            </div>
          ))}
          {data.length === 0 && <p className="px-5 py-8 text-center text-tertiary text-sm">Geen FAQ's.</p>}
        </div>
      )}

      {(creating || editing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay">
          <div className="bg-primary rounded-2xl border border-secondary shadow-xl w-full max-w-lg mx-4 p-6 space-y-4">
            <h2 className="text-base font-semibold text-primary">{editing ? "FAQ bewerken" : "FAQ toevoegen"}</h2>
            <div>
              <label className="block text-xs font-medium text-secondary mb-1">Vraag</label>
              <input value={form.question} onChange={(e) => setForm((p) => ({ ...p, question: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
            </div>
            <div>
              <label className="block text-xs font-medium text-secondary mb-1">Antwoord</label>
              <textarea rows={4} value={form.answer} onChange={(e) => setForm((p) => ({ ...p, answer: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-secondary mb-1">Taal</label>
                <select value={form.locale} onChange={(e) => setForm((p) => ({ ...p, locale: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand">
                  <option value="nl">Nederlands</option>
                  <option value="en">Engels</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-secondary mb-1">Volgorde</label>
                <input type="number" value={form.sort_order} onChange={(e) => setForm((p) => ({ ...p, sort_order: +e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
              </div>
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
