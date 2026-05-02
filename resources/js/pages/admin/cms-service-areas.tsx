import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Edit01, Eye, EyeOff, Globe01, MarkerPin01, Plus, Trash01 } from "@untitledui/icons";
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

function autoSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function AdminCmsServiceAreas() {
  const qc = useQueryClient();
  const toast = useToast();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<FormState>({ ...empty });

  const { data = [], isLoading } = useQuery<ServiceArea[]>({
    queryKey: ["admin-cms-service-areas"],
    queryFn: () => adminApi.get<ServiceArea[]>("/cms/service-areas"),
  });

  const createMutation = useMutation({
    mutationFn: (d: FormState) => adminApi.post("/cms/service-areas", d),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-cms-service-areas"] });
      setOpen(false);
      toast.success("Servicegebied toegevoegd");
    },
    onError: (e: Error) => toast.error("Aanmaken mislukt", e.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormState }) =>
      adminApi.patch(`/cms/service-areas/${id}`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-cms-service-areas"] });
      setOpen(false);
      toast.success("Servicegebied opgeslagen");
    },
    onError: (e: Error) => toast.error("Opslaan mislukt", e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminApi.delete(`/cms/service-areas/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-cms-service-areas"] });
      toast.success("Servicegebied verwijderd");
    },
    onError: (e: Error) => toast.error("Verwijderen mislukt", e.message),
  });

  const stats = useMemo(() => {
    const total = data.length;
    const published = data.filter((a) => a.is_published).length;
    const draft = total - published;
    return { total, published, draft };
  }, [data]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (a) => a.name.toLowerCase().includes(q) || a.slug.toLowerCase().includes(q),
    );
  }, [data, search]);

  function startCreate() {
    setEditingId(null);
    setForm({ ...empty });
    setOpen(true);
  }

  function startEdit(a: ServiceArea) {
    setEditingId(a.id);
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
    setOpen(true);
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
    if (editingId) updateMutation.mutate({ id: editingId, data: payload });
    else createMutation.mutate(payload);
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6 p-6 md:p-8">
      <Helmet>
        <title>Servicegebieden — YAS Admin</title>
      </Helmet>

      <PageHeader
        title="Servicegebieden"
        description="Beheer de steden en regio's waar YAS taxidiensten aanbiedt. Gepubliceerde gebieden krijgen een eigen landingspagina op de publieke site."
        actions={
          <Button size="md" iconLeading={Plus} onClick={startCreate}>
            Nieuw gebied
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Totaal gebieden" value={stats.total} icon={MarkerPin01} />
        <StatCard label="Gepubliceerd" value={stats.published} icon={Globe01} helperText="Live op publieke site" />
        <StatCard label="Concept" value={stats.draft} icon={EyeOff} helperText="Nog niet gepubliceerd" />
      </div>

      <FilterBar
        search={{
          value: search,
          onChange: setSearch,
          placeholder: "Zoek op naam of slug…",
        }}
      />

      {isLoading ? (
        <p className="text-sm text-tertiary">Laden…</p>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={MarkerPin01}
          title={search ? "Geen resultaten" : "Nog geen servicegebieden"}
          description={
            search
              ? "Probeer een andere zoekterm."
              : "Voeg het eerste gebied toe om de publieke stadspagina's mogelijk te maken."
          }
          action={
            !search ? (
              <Button size="md" iconLeading={Plus} onClick={startCreate}>
                Nieuw gebied
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-secondary bg-primary">
          <table className="w-full text-sm">
            <thead className="border-b border-secondary bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-tertiary uppercase">Naam</th>
                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-tertiary uppercase">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-tertiary uppercase">Zichtbaar</th>
                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-tertiary uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-tertiary uppercase">Acties</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary">
              {filtered.map((a) => (
                <tr key={a.id} className="transition duration-100 ease-linear hover:bg-primary_hover">
                  <td className="px-6 py-4 font-medium text-primary">{a.name}</td>
                  <td className="px-6 py-4 font-mono text-xs text-tertiary">/taxi/{a.slug}</td>
                  <td className="px-6 py-4">
                    {a.is_visible ? (
                      <Badge type="pill-color" color="success" size="sm">
                        <Eye aria-hidden="true" className="size-3" /> Zichtbaar
                      </Badge>
                    ) : (
                      <Badge type="pill-color" color="gray" size="sm">
                        <EyeOff aria-hidden="true" className="size-3" /> Verborgen
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {a.is_published ? (
                      <Badge type="pill-color" color="success" size="sm">Live</Badge>
                    ) : (
                      <Badge type="pill-color" color="warning" size="sm">Concept</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <ConfirmInline
                        icon={Trash01}
                        onConfirm={() => deleteMutation.mutate(a.id)}
                        isLoading={deleteMutation.isPending && deleteMutation.variables === a.id}
                      />
                      <DropdownMenu>
                        <DropdownItem icon={Edit01} onAction={() => startEdit(a)}>
                          Bewerken
                        </DropdownItem>
                        <DropdownItem icon={Globe01} href={`/taxi/${a.slug}`}>
                          Bekijk publieke pagina
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
        title={editingId ? "Servicegebied bewerken" : "Nieuw servicegebied"}
        description="SEO-content die op /taxi/{slug} wordt getoond."
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
              onChange={(value) =>
                setForm((p) => ({ ...p, name: value, slug: !editingId ? autoSlug(value) : p.slug }))
              }
              placeholder="Gouda"
            />
            <Input
              label="Slug"
              isRequired
              value={form.slug}
              onChange={(value) => setForm((p) => ({ ...p, slug: value }))}
              hint={`Wordt /taxi/${form.slug || "…"}`}
              placeholder="gouda"
            />
          </div>

          <Input
            label="Meta titel"
            value={form.meta_title}
            onChange={(value) => setForm((p) => ({ ...p, meta_title: value }))}
            hint={`${form.meta_title.length}/70 — verschijnt in Google's zoekresultaten`}
            maxLength={70}
            placeholder="Taxi Gouda — YAS TaxiCentrale"
          />

          <TextArea
            label="Meta beschrijving"
            value={form.meta_description}
            onChange={(value) => setForm((p) => ({ ...p, meta_description: value }))}
            hint={`${form.meta_description.length}/160`}
            rows={2}
            maxLength={160}
            placeholder="Betrouwbaar taxivervoer in Gouda. Vaste tarieven, 24/7 beschikbaar."
          />

          <Input
            label="Hero ondertitel"
            value={form.hero_subtitle}
            onChange={(value) => setForm((p) => ({ ...p, hero_subtitle: value }))}
            placeholder="Uw taxi in Gouda en omstreken — 24/7"
          />

          <TextArea
            label="Intro tekst (HTML toegestaan)"
            value={form.intro_html}
            onChange={(value) => setForm((p) => ({ ...p, intro_html: value }))}
            rows={6}
            placeholder="<p>Welkom bij YAS in Gouda…</p>"
          />

          <PopularRoutesField
            routes={form.popular_routes}
            onChange={(popular_routes) => setForm((p) => ({ ...p, popular_routes }))}
          />

          <div className="space-y-3 rounded-lg border border-secondary bg-secondary_subtle p-4">
            <p className="text-sm font-medium text-secondary">Zichtbaarheid</p>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={form.is_visible}
                onChange={(e) => setForm((p) => ({ ...p, is_visible: e.target.checked }))}
                className="mt-1 size-4 rounded border-primary"
              />
              <span className="text-sm">
                <span className="font-medium text-primary">Zichtbaar in admin lijsten</span>
                <span className="block text-xs text-tertiary">Verberg het gebied uit interne overzichten zonder te verwijderen.</span>
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={form.is_published}
                onChange={(e) => setForm((p) => ({ ...p, is_published: e.target.checked }))}
                className="mt-1 size-4 rounded border-primary"
              />
              <span className="text-sm">
                <span className="font-medium text-primary">Gepubliceerd op publieke site</span>
                <span className="block text-xs text-tertiary">Maakt /taxi/{form.slug || "…"} bereikbaar voor bezoekers en zoekmachines.</span>
              </span>
            </label>
          </div>
        </div>
      </SlideOver>
    </div>
  );
}

function PopularRoutesField({
  routes,
  onChange,
}: {
  routes: PopularRoute[];
  onChange: (next: PopularRoute[]) => void;
}) {
  function update(idx: number, field: keyof PopularRoute, value: string) {
    onChange(routes.map((r, i) => (i === idx ? { ...r, [field]: value } : r)));
  }
  function add() {
    onChange([...routes, { from: "", to: "", price_eur: "" }]);
  }
  function remove(idx: number) {
    onChange(routes.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <div className="mb-2 flex items-end justify-between">
        <div>
          <p className="text-sm font-medium text-secondary">Populaire routes</p>
          <p className="text-xs text-tertiary">Maximaal 4-5 routes — getoond op de stadspagina.</p>
        </div>
        <Button size="sm" color="secondary" iconLeading={Plus} onClick={add}>
          Route
        </Button>
      </div>

      {routes.length === 0 ? (
        <p className="rounded-lg border border-dashed border-secondary px-4 py-6 text-center text-xs text-tertiary">
          Nog geen routes toegevoegd.
        </p>
      ) : (
        <div className="space-y-2">
          {routes.map((r, i) => (
            <div key={i} className="flex items-start gap-2">
              <Input
                placeholder="Van"
                value={r.from}
                onChange={(value) => update(i, "from", value)}
                size="sm"
              />
              <Input
                placeholder="Naar"
                value={r.to}
                onChange={(value) => update(i, "to", value)}
                size="sm"
              />
              <Input
                placeholder="€"
                value={String(r.price_eur ?? "")}
                onChange={(value) => update(i, "price_eur", value)}
                size="sm"
                inputMode="decimal"
                wrapperClassName="w-24 shrink-0"
              />
              <Button
                size="sm"
                color="tertiary-destructive"
                iconLeading={Trash01}
                onClick={() => remove(i)}
                aria-label="Route verwijderen"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
