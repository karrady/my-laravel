import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Edit01, EyeOff, HelpCircle, Plus, Trash01 } from "@untitledui/icons";
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

interface Faq {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
  locale: string | null;
}

type FormState = {
  question: string;
  answer: string;
  sort_order: string;
  is_active: boolean;
  locale: string;
};

const empty: FormState = {
  question: "",
  answer: "",
  sort_order: "0",
  is_active: true,
  locale: "nl",
};

export default function AdminCmsFaqs() {
  const qc = useQueryClient();
  const toast = useToast();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<FormState>({ ...empty });

  const { data = [], isLoading } = useQuery<Faq[]>({
    queryKey: ["admin-cms-faqs"],
    queryFn: () => adminApi.get<Faq[]>("/cms/faqs"),
  });

  const createMutation = useMutation({
    mutationFn: (d: Record<string, unknown>) => adminApi.post("/cms/faqs", d),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-cms-faqs"] });
      setOpen(false);
      toast.success("FAQ toegevoegd");
    },
    onError: (e: Error) => toast.error("Aanmaken mislukt", e.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Record<string, unknown> }) =>
      adminApi.patch(`/cms/faqs/${id}`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-cms-faqs"] });
      setOpen(false);
      toast.success("FAQ opgeslagen");
    },
    onError: (e: Error) => toast.error("Opslaan mislukt", e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminApi.delete(`/cms/faqs/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-cms-faqs"] });
      toast.success("FAQ verwijderd");
    },
    onError: (e: Error) => toast.error("Verwijderen mislukt", e.message),
  });

  const stats = useMemo(() => {
    const total = data.length;
    const active = data.filter((f) => f.is_active).length;
    const nl = data.filter((f) => (f.locale ?? "nl") === "nl").length;
    return { total, active, nl };
  }, [data]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (f) =>
        f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q),
    );
  }, [data, search]);

  function startCreate() {
    setEditingId(null);
    setForm({ ...empty });
    setOpen(true);
  }

  function startEdit(f: Faq) {
    setEditingId(f.id);
    setForm({
      question: f.question,
      answer: f.answer,
      sort_order: String(f.sort_order ?? 0),
      is_active: f.is_active,
      locale: f.locale ?? "nl",
    });
    setOpen(true);
  }

  function handleSave() {
    const payload = {
      question: form.question,
      answer: form.answer,
      sort_order: parseInt(form.sort_order, 10) || 0,
      is_active: form.is_active,
      locale: form.locale,
    };
    if (editingId) updateMutation.mutate({ id: editingId, data: payload });
    else createMutation.mutate(payload);
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6 p-6 md:p-8">
      <Helmet>
        <title>FAQ's — YAS Admin</title>
      </Helmet>

      <PageHeader
        title="FAQ's"
        description="Beheer veelgestelde vragen die op de publieke site getoond worden."
        actions={
          <Button size="md" iconLeading={Plus} onClick={startCreate}>
            Nieuwe FAQ
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Totaal vragen" value={stats.total} icon={HelpCircle} />
        <StatCard label="Actief" value={stats.active} icon={HelpCircle} helperText="Zichtbaar op publieke site" />
        <StatCard label="Nederlands" value={stats.nl} icon={HelpCircle} helperText="Aantal NL-vragen" />
      </div>

      <FilterBar
        search={{
          value: search,
          onChange: setSearch,
          placeholder: "Zoek op vraag of antwoord…",
        }}
      />

      {isLoading ? (
        <p className="text-sm text-tertiary">Laden…</p>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={HelpCircle}
          title={search ? "Geen resultaten" : "Nog geen FAQ's"}
          description={
            search
              ? "Probeer een andere zoekterm."
              : "Voeg de eerste veelgestelde vraag toe om bezoekers snel antwoord te geven."
          }
          action={
            !search ? (
              <Button size="md" iconLeading={Plus} onClick={startCreate}>
                Nieuwe FAQ
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-secondary bg-primary">
          <table className="w-full text-sm">
            <thead className="border-b border-secondary bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-tertiary uppercase">Vraag</th>
                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-tertiary uppercase">Antwoord</th>
                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-tertiary uppercase">Taal</th>
                <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-tertiary uppercase">Volgorde</th>
                <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-tertiary uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-tertiary uppercase">Acties</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary">
              {filtered.map((f) => (
                <tr key={f.id} className="transition duration-100 ease-linear hover:bg-primary_hover">
                  <td className="px-6 py-4">
                    <p className="line-clamp-2 max-w-md font-medium text-primary">{f.question}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="line-clamp-2 max-w-lg text-tertiary">{f.answer}</p>
                  </td>
                  <td className="px-6 py-4">
                    <Badge type="pill-color" color="gray" size="sm">
                      {(f.locale ?? "nl").toUpperCase()}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap text-tertiary">{f.sort_order}</td>
                  <td className="px-6 py-4">
                    {f.is_active ? (
                      <Badge type="pill-color" color="success" size="sm">Actief</Badge>
                    ) : (
                      <Badge type="pill-color" color="gray" size="sm">Inactief</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <ConfirmInline
                        icon={Trash01}
                        onConfirm={() => deleteMutation.mutate(f.id)}
                        isLoading={deleteMutation.isPending && deleteMutation.variables === f.id}
                      />
                      <DropdownMenu>
                        <DropdownItem icon={Edit01} onAction={() => startEdit(f)}>
                          Bewerken
                        </DropdownItem>
                        <DropdownItem
                          icon={EyeOff}
                          onAction={() =>
                            updateMutation.mutate({
                              id: f.id,
                              data: { is_active: !f.is_active },
                            })
                          }
                        >
                          {f.is_active ? "Op inactief zetten" : "Activeren"}
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
        title={editingId ? "FAQ bewerken" : "Nieuwe FAQ"}
        description="Wordt getoond op de publieke FAQ-sectie en helppagina's."
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
            label="Vraag"
            isRequired
            value={form.question}
            onChange={(value) => setForm((p) => ({ ...p, question: value }))}
            placeholder="Wat zijn de tarieven naar Schiphol?"
          />

          <TextArea
            label="Antwoord"
            isRequired
            value={form.answer}
            onChange={(value) => setForm((p) => ({ ...p, answer: value }))}
            rows={6}
            placeholder="Wij hanteren vaste tarieven naar Schiphol vanaf €45,…"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-secondary">Taal</label>
              <div className="grid grid-cols-2 gap-2">
                {(["nl", "en"] as const).map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, locale: loc }))}
                    className={
                      form.locale === loc
                        ? "rounded-lg border border-brand bg-brand-primary px-4 py-2.5 text-sm font-medium text-brand-secondary transition duration-100 ease-linear"
                        : "rounded-lg border border-primary bg-primary px-4 py-2.5 text-sm font-medium text-secondary transition duration-100 ease-linear hover:bg-primary_hover"
                    }
                  >
                    {loc === "nl" ? "Nederlands" : "Engels"}
                  </button>
                ))}
              </div>
            </div>
            <Input
              label="Volgorde"
              type="number"
              value={form.sort_order}
              onChange={(value) => setForm((p) => ({ ...p, sort_order: value }))}
              hint="Lager getal = hoger in de lijst"
            />
          </div>

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
                  Alleen actieve FAQ's worden getoond op de publieke site.
                </span>
              </span>
            </label>
          </div>
        </div>
      </SlideOver>
    </div>
  );
}
