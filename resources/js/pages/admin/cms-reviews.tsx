import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Edit01, EyeOff, MessageHeartCircle, Plus, Star01, Trash01 } from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
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
import { cx } from "@/utils/cx";

interface Review {
  id: number;
  author_name: string;
  rating: number;
  body: string;
  source: string | null;
  is_published: boolean;
  created_at: string;
}

type FormState = {
  author_name: string;
  rating: number;
  body: string;
  source: string;
  is_published: boolean;
};

const empty: FormState = {
  author_name: "",
  rating: 5,
  body: "",
  source: "google",
  is_published: true,
};

const SOURCES = [
  { id: "google", label: "Google" },
  { id: "direct", label: "Direct" },
  { id: "other", label: "Overig" },
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function StarsRow({ rating, size = "size-4" }: { rating: number; size?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} van 5 sterren`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star01
          key={i}
          aria-hidden="true"
          className={cx(size, i < rating ? "fill-current text-warning-primary" : "text-fg-quaternary")}
        />
      ))}
    </span>
  );
}

export default function AdminCmsReviews() {
  const qc = useQueryClient();
  const toast = useToast();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<FormState>({ ...empty });

  const { data = [], isLoading } = useQuery<Review[]>({
    queryKey: ["admin-cms-reviews"],
    queryFn: () => adminApi.get<Review[]>("/cms/reviews"),
  });

  const createMutation = useMutation({
    mutationFn: (d: Record<string, unknown>) => adminApi.post("/cms/reviews", d),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-cms-reviews"] });
      setOpen(false);
      toast.success("Review toegevoegd");
    },
    onError: (e: Error) => toast.error("Aanmaken mislukt", e.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Record<string, unknown> }) =>
      adminApi.patch(`/cms/reviews/${id}`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-cms-reviews"] });
      setOpen(false);
      toast.success("Review opgeslagen");
    },
    onError: (e: Error) => toast.error("Opslaan mislukt", e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminApi.delete(`/cms/reviews/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-cms-reviews"] });
      toast.success("Review verwijderd");
    },
    onError: (e: Error) => toast.error("Verwijderen mislukt", e.message),
  });

  const stats = useMemo(() => {
    const total = data.length;
    const published = data.filter((r) => r.is_published).length;
    const avg = total === 0 ? 0 : data.reduce((s, r) => s + (r.rating || 0), 0) / total;
    return { total, published, avg };
  }, [data]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (r) =>
        r.author_name.toLowerCase().includes(q) ||
        r.body.toLowerCase().includes(q),
    );
  }, [data, search]);

  function startCreate() {
    setEditingId(null);
    setForm({ ...empty });
    setOpen(true);
  }

  function startEdit(r: Review) {
    setEditingId(r.id);
    setForm({
      author_name: r.author_name,
      rating: r.rating,
      body: r.body,
      source: r.source ?? "google",
      is_published: r.is_published,
    });
    setOpen(true);
  }

  function handleSave() {
    const payload = {
      author_name: form.author_name,
      rating: form.rating,
      body: form.body,
      source: form.source,
      is_published: form.is_published,
    };
    if (editingId) updateMutation.mutate({ id: editingId, data: payload });
    else createMutation.mutate(payload);
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6 p-6 md:p-8">
      <Helmet>
        <title>Reviews — YAS Admin</title>
      </Helmet>

      <PageHeader
        title="Reviews"
        description="Beheer klantreviews die op de publieke site getoond worden."
        actions={
          <Button size="md" iconLeading={Plus} onClick={startCreate}>
            Nieuwe review
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Totaal reviews" value={stats.total} icon={MessageHeartCircle} />
        <StatCard label="Gepubliceerd" value={stats.published} icon={MessageHeartCircle} helperText="Live op publieke site" />
        <StatCard
          label="Gemiddelde score"
          value={stats.avg.toFixed(1)}
          icon={Star01}
          helperText="Gemiddeld aantal sterren"
        />
      </div>

      <FilterBar
        search={{
          value: search,
          onChange: setSearch,
          placeholder: "Zoek op naam of inhoud…",
        }}
      />

      {isLoading ? (
        <p className="text-sm text-tertiary">Laden…</p>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={MessageHeartCircle}
          title={search ? "Geen resultaten" : "Nog geen reviews"}
          description={
            search
              ? "Probeer een andere zoekterm."
              : "Voeg de eerste klantreview toe om vertrouwen op te bouwen bij nieuwe bezoekers."
          }
          action={
            !search ? (
              <Button size="md" iconLeading={Plus} onClick={startCreate}>
                Nieuwe review
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-secondary bg-primary">
          <table className="w-full text-sm">
            <thead className="border-b border-secondary bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-tertiary uppercase">Auteur</th>
                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-tertiary uppercase">Beoordeling</th>
                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-tertiary uppercase">Tekst</th>
                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-tertiary uppercase">Bron</th>
                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-tertiary uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-tertiary uppercase">Acties</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary">
              {filtered.map((r) => (
                <tr key={r.id} className="transition duration-100 ease-linear hover:bg-primary_hover">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar size="sm" initials={getInitials(r.author_name)} alt={r.author_name} />
                      <span className="font-medium text-primary">{r.author_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StarsRow rating={r.rating} />
                  </td>
                  <td className="px-6 py-4">
                    <p className="line-clamp-2 max-w-md text-tertiary">{r.body}</p>
                  </td>
                  <td className="px-6 py-4">
                    <Badge type="pill-color" color="brand" size="sm">
                      {SOURCES.find((s) => s.id === r.source)?.label ?? r.source ?? "—"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    {r.is_published ? (
                      <Badge type="pill-color" color="success" size="sm">Gepubliceerd</Badge>
                    ) : (
                      <Badge type="pill-color" color="gray" size="sm">Verborgen</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <ConfirmInline
                        icon={Trash01}
                        onConfirm={() => deleteMutation.mutate(r.id)}
                        isLoading={deleteMutation.isPending && deleteMutation.variables === r.id}
                      />
                      <DropdownMenu>
                        <DropdownItem icon={Edit01} onAction={() => startEdit(r)}>
                          Bewerken
                        </DropdownItem>
                        <DropdownItem
                          icon={EyeOff}
                          onAction={() =>
                            updateMutation.mutate({
                              id: r.id,
                              data: { is_published: !r.is_published },
                            })
                          }
                        >
                          {r.is_published ? "Verbergen" : "Publiceren"}
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
        title={editingId ? "Review bewerken" : "Nieuwe review"}
        description="Wordt getoond in de testimonials op de publieke site."
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
          <Input
            label="Naam auteur"
            isRequired
            value={form.author_name}
            onChange={(value) => setForm((p) => ({ ...p, author_name: value }))}
            placeholder="Jan de Vries"
          />

          <div>
            <label className="mb-1.5 block text-sm font-medium text-secondary">Beoordeling</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, rating: n }))}
                  aria-label={`${n} sterren`}
                  className="cursor-pointer rounded-md p-1 transition duration-100 ease-linear hover:bg-primary_hover"
                >
                  <Star01
                    aria-hidden="true"
                    className={cx(
                      "size-7",
                      n <= form.rating ? "fill-current text-warning-primary" : "text-fg-quaternary",
                    )}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-tertiary">{form.rating} / 5</span>
            </div>
          </div>

          <TextArea
            label="Recensietekst"
            isRequired
            value={form.body}
            onChange={(value) => setForm((p) => ({ ...p, body: value }))}
            rows={5}
            placeholder="Uitstekende service, op tijd en de chauffeur was zeer vriendelijk…"
          />

          <div>
            <label className="mb-1.5 block text-sm font-medium text-secondary">Bron</label>
            <div className="grid grid-cols-3 gap-2">
              {SOURCES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, source: s.id }))}
                  className={
                    form.source === s.id
                      ? "rounded-lg border border-brand bg-brand-primary px-4 py-2.5 text-sm font-medium text-brand-secondary transition duration-100 ease-linear"
                      : "rounded-lg border border-primary bg-primary px-4 py-2.5 text-sm font-medium text-secondary transition duration-100 ease-linear hover:bg-primary_hover"
                  }
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 rounded-lg border border-secondary bg-secondary_subtle p-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={form.is_published}
                onChange={(e) => setForm((p) => ({ ...p, is_published: e.target.checked }))}
                className="mt-1 size-4 rounded border-primary"
              />
              <span className="text-sm">
                <span className="font-medium text-primary">Gepubliceerd</span>
                <span className="block text-xs text-tertiary">
                  Alleen gepubliceerde reviews worden getoond op de publieke site.
                </span>
              </span>
            </label>
          </div>
        </div>
      </SlideOver>
    </div>
  );
}
