import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/utils/admin-api";

interface PopularRoute {
  from: string;
  to: string;
  price_eur: number | string;
}

interface ServiceArea {
  id: number;
  name: string;
  slug: string;
  is_visible: boolean;
  meta_title: string | null;
  meta_description: string | null;
  hero_subtitle: string | null;
  intro_html: string | null;
  popular_routes: PopularRoute[] | null;
  is_published: boolean;
}

type FormState = {
  name: string;
  slug: string;
  is_visible: boolean;
  is_published: boolean;
  meta_title: string;
  meta_description: string;
  hero_subtitle: string;
  intro_html: string;
  popular_routes: PopularRoute[];
};

const empty: FormState = {
  name: "",
  slug: "",
  is_visible: true,
  is_published: false,
  meta_title: "",
  meta_description: "",
  hero_subtitle: "",
  intro_html: "",
  popular_routes: [],
};

export default function AdminCmsServiceAreas() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<ServiceArea> | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<FormState>({ ...empty });

  const { data = [], isLoading } = useQuery<ServiceArea[]>({
    queryKey: ["admin-cms-service-areas"],
    queryFn: () => adminApi.get<ServiceArea[]>("/cms/service-areas"),
  });

  const createMutation = useMutation({
    mutationFn: (d: FormState) => adminApi.post("/cms/service-areas", d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-cms-service-areas"] }); setCreating(false); setForm({ ...empty }); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<FormState> }) => adminApi.patch(`/cms/service-areas/${id}`, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-cms-service-areas"] }); setEditing(null); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminApi.delete(`/cms/service-areas/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-cms-service-areas"] }),
  });

  function openEdit(a: ServiceArea) {
    setEditing(a);
    setForm({
      name: a.name,
      slug: a.slug,
      is_visible: a.is_visible ?? true,
      is_published: a.is_published ?? false,
      meta_title: a.meta_title ?? "",
      meta_description: a.meta_description ?? "",
      hero_subtitle: a.hero_subtitle ?? "",
      intro_html: a.intro_html ?? "",
      popular_routes: Array.isArray(a.popular_routes) ? a.popular_routes : [],
    });
  }

  function autoSlug(name: string) {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  }

  function addRoute() {
    setForm((p) => ({ ...p, popular_routes: [...p.popular_routes, { from: "", to: "", price_eur: "" }] }));
  }

  function removeRoute(idx: number) {
    setForm((p) => ({ ...p, popular_routes: p.popular_routes.filter((_, i) => i !== idx) }));
  }

  function updateRoute(idx: number, field: keyof PopularRoute, value: string) {
    setForm((p) => ({
      ...p,
      popular_routes: p.popular_routes.map((r, i) => i === idx ? { ...r, [field]: value } : r),
    }));
  }

  function handleSave() {
    const payload: FormState = {
      ...form,
      popular_routes: form.popular_routes
        .filter((r) => r.from.trim() && r.to.trim())
        .map((r) => ({
          from: r.from,
          to: r.to,
          price_eur: r.price_eur === "" || r.price_eur === null ? 0 : Number(r.price_eur),
        })),
    };
    if (editing?.id) {
      updateMutation.mutate({ id: editing.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-primary">Servicegebieden</h1>
        <button onClick={() => { setCreating(true); setForm({ ...empty }); }} className="px-4 py-2 text-sm font-medium bg-brand-solid text-white rounded-lg hover:bg-brand-solid_hover transition duration-100">
          + Toevoegen
        </button>
      </div>

      {isLoading ? <p className="text-tertiary text-sm">Laden…</p> : (
        <div className="bg-primary rounded-2xl border border-secondary overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-secondary bg-secondary">
              <tr>
                {["Naam", "Slug", "Status", "Gepubliceerd", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-tertiary uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary">
              {data.map((a) => (
                <tr key={a.id} className="hover:bg-primary_hover transition duration-100">
                  <td className="px-4 py-3 text-primary font-medium">{a.name}</td>
                  <td className="px-4 py-3 text-tertiary font-mono text-xs">{a.slug}</td>
                  <td className="px-4 py-3">
                    {a.is_visible
                      ? <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-success-secondary text-success-primary">Actief</span>
                      : <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-secondary text-tertiary">Inactief</span>}
                  </td>
                  <td className="px-4 py-3">
                    {a.is_published
                      ? <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-success-secondary text-success-primary">Live</span>
                      : <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-warning-secondary text-warning-primary">Concept</span>}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => openEdit(a)} className="px-3 py-1.5 text-xs rounded-lg border border-secondary text-secondary hover:bg-primary_hover transition duration-100">Bewerken</button>
                      <button onClick={() => deleteMutation.mutate(a.id)} className="px-3 py-1.5 text-xs rounded-lg border border-error text-error-primary hover:bg-error-primary transition duration-100">Verwijderen</button>
                    </div>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-tertiary">Geen servicegebieden.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {(creating || editing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay overflow-y-auto py-8">
          <div className="bg-primary rounded-2xl border border-secondary shadow-xl w-full max-w-2xl mx-4 p-6 space-y-4 my-auto">
            <h2 className="text-base font-semibold text-primary">{editing ? "Servicegebied bewerken" : "Servicegebied toevoegen"}</h2>

            <div className="grid grid-cols-2 gap-3">
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
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-secondary">Meta titel</label>
                <span className="text-xs text-quaternary">{form.meta_title.length}/70</span>
              </div>
              <input maxLength={70} value={form.meta_title} onChange={(e) => setForm((p) => ({ ...p, meta_title: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-secondary">Meta beschrijving</label>
                <span className="text-xs text-quaternary">{form.meta_description.length}/160</span>
              </div>
              <textarea rows={2} maxLength={160} value={form.meta_description} onChange={(e) => setForm((p) => ({ ...p, meta_description: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand resize-none" />
            </div>

            <div>
              <label className="block text-xs font-medium text-secondary mb-1">Hero ondertitel</label>
              <input value={form.hero_subtitle} onChange={(e) => setForm((p) => ({ ...p, hero_subtitle: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
            </div>

            <div>
              <label className="block text-xs font-medium text-secondary mb-1">Intro tekst</label>
              <textarea rows={6} value={form.intro_html} onChange={(e) => setForm((p) => ({ ...p, intro_html: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand resize-none font-mono" />
              <p className="text-xs text-quaternary mt-1">HTML is toegestaan.</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-medium text-secondary">Populaire routes</label>
                <button type="button" onClick={addRoute} className="px-2.5 py-1 text-xs rounded-lg border border-secondary text-secondary hover:bg-primary_hover transition duration-100">+ Route</button>
              </div>
              <div className="space-y-2">
                {form.popular_routes.length === 0 && <p className="text-xs text-quaternary">Nog geen routes toegevoegd.</p>}
                {form.popular_routes.map((r, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={r.from} onChange={(e) => updateRoute(i, "from", e.target.value)} placeholder="Van"
                      className="flex-1 px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
                    <input value={r.to} onChange={(e) => updateRoute(i, "to", e.target.value)} placeholder="Naar"
                      className="flex-1 px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
                    <input type="number" value={r.price_eur} onChange={(e) => updateRoute(i, "price_eur", e.target.value)} placeholder="€"
                      className="w-24 px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
                    <button type="button" onClick={() => removeRoute(i)} className="px-3 py-1.5 text-xs rounded-lg border border-error text-error-primary hover:bg-error-primary transition duration-100">×</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <label className="flex items-center gap-2 text-sm text-secondary cursor-pointer">
                <input type="checkbox" checked={form.is_visible} onChange={(e) => setForm((p) => ({ ...p, is_visible: e.target.checked }))} className="rounded" />
                Zichtbaar
              </label>
              <label className="flex items-center gap-2 text-sm text-secondary cursor-pointer">
                <input type="checkbox" checked={form.is_published} onChange={(e) => setForm((p) => ({ ...p, is_published: e.target.checked }))} className="rounded" />
                Gepubliceerd op publieke site
              </label>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button onClick={() => { setCreating(false); setEditing(null); }} className="px-4 py-2 text-sm rounded-lg border border-secondary text-secondary hover:bg-primary_hover transition duration-100">Annuleren</button>
              <button onClick={handleSave} className="px-4 py-2 text-sm font-medium rounded-lg bg-brand-solid text-white hover:bg-brand-solid_hover transition duration-100">Opslaan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
