import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Mail01, MessageSquare02, Phone, Save01, Trash01 } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { TextArea } from "@/components/base/textarea/textarea";
import { ConfirmInline } from "@/components/application/confirm-inline";
import { EmptyState } from "@/components/application/empty-state";
import { PageHeader } from "@/components/application/page-header";
import { useToast } from "@/components/application/toast";
import { adminApi } from "@/utils/admin-api";
import { cx } from "@/utils/cx";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  is_read: boolean;
  is_handled: boolean;
  notes: string | null;
  created_at: string;
}

interface Paginated {
  data: ContactMessage[];
  current_page: number;
  last_page: number;
  total: number;
}

type Filter = "all" | "unread" | "unhandled";

const tabs: { key: Filter; label: string }[] = [
  { key: "all", label: "Alles" },
  { key: "unread", label: "Ongelezen" },
  { key: "unhandled", label: "Onafgehandeld" },
];

function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const sec = Math.floor(diffMs / 1000);
  if (sec < 60) return "zojuist";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m geleden`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}u geleden`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day}d geleden`;
  return new Date(iso).toLocaleDateString("nl-NL", { day: "2-digit", month: "short", year: "numeric" });
}

export default function AdminContactBerichten() {
  const qc = useQueryClient();
  const toast = useToast();
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [isHandled, setIsHandled] = useState(false);

  const { data, isLoading } = useQuery<Paginated>({
    queryKey: ["admin-contact-messages", filter],
    queryFn: () => adminApi.get<Paginated>(`/contact-messages?filter=${filter}`),
  });

  const { data: detail } = useQuery<ContactMessage>({
    queryKey: ["admin-contact-message", selectedId],
    queryFn: () => adminApi.get<ContactMessage>(`/contact-messages/${selectedId}`),
    enabled: selectedId !== null,
  });

  useEffect(() => {
    if (detail) {
      setNotes(detail.notes ?? "");
      setIsHandled(detail.is_handled);
    }
  }, [detail]);

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ContactMessage> }) =>
      adminApi.patch(`/contact-messages/${id}`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-contact-messages"] });
      qc.invalidateQueries({ queryKey: ["admin-contact-message", selectedId] });
    },
    onError: (e: Error) => toast.error("Opslaan mislukt", e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminApi.delete(`/contact-messages/${id}`),
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: ["admin-contact-messages"] });
      if (id === selectedId) setSelectedId(null);
      toast.success("Bericht verwijderd");
    },
    onError: (e: Error) => toast.error("Verwijderen mislukt", e.message),
  });

  function openDetail(m: ContactMessage) {
    setSelectedId(m.id);
    if (!m.is_read) {
      updateMutation.mutate({ id: m.id, data: { is_read: true } });
    }
  }

  function saveNotes() {
    if (selectedId === null) return;
    updateMutation.mutate(
      { id: selectedId, data: { notes, is_handled: isHandled } },
      { onSuccess: () => toast.success("Notities opgeslagen") },
    );
  }

  const messages = data?.data ?? [];

  return (
    <div className="space-y-6 p-6 md:p-8">
      <PageHeader
        title="Contactberichten"
        description={data ? `${data.total} berichten in totaal` : "Berichten van het contactformulier op de publieke site."}
      />

      <div className="flex gap-1 border-b border-secondary">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setFilter(t.key)}
            className={cx(
              "-mb-px border-b-2 px-4 py-2.5 text-sm font-semibold transition duration-100 ease-linear",
              filter === t.key
                ? "border-brand text-brand-secondary"
                : "border-transparent text-tertiary hover:text-secondary",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_440px]">
        {/* Lijst */}
        <div className="overflow-hidden rounded-xl border border-secondary bg-primary">
          {isLoading ? (
            <p className="p-8 text-center text-sm text-tertiary">Laden…</p>
          ) : messages.length === 0 ? (
            <EmptyState
              icon={MessageSquare02}
              title="Geen berichten"
              description={
                filter === "unread"
                  ? "Alle berichten zijn gelezen."
                  : filter === "unhandled"
                  ? "Alle berichten zijn afgehandeld."
                  : "Er zijn nog geen contactberichten ontvangen."
              }
            />
          ) : (
            <ul className="divide-y divide-secondary">
              {messages.map((m) => (
                <li
                  key={m.id}
                  onClick={() => openDetail(m)}
                  className={cx(
                    "cursor-pointer px-5 py-4 transition duration-100 ease-linear",
                    selectedId === m.id ? "bg-active" : "hover:bg-primary_hover",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className={cx("truncate font-semibold", m.is_read ? "text-secondary" : "text-primary")}>
                          {m.name}
                        </p>
                        {!m.is_read && <Badge type="pill-color" color="warning" size="sm">Nieuw</Badge>}
                        {m.is_handled && <Badge type="pill-color" color="success" size="sm">Afgehandeld</Badge>}
                      </div>
                      <p className="mt-1 truncate text-sm text-tertiary">{m.subject}</p>
                      <p className="mt-1 truncate text-xs text-quaternary">{m.email}</p>
                    </div>
                    <span className="shrink-0 text-xs whitespace-nowrap text-tertiary">{relativeTime(m.created_at)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Detail */}
        <aside className="rounded-xl border border-secondary bg-primary lg:sticky lg:top-6 lg:self-start">
          {!detail ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-tertiary">Selecteer een bericht om de details te bekijken.</p>
            </div>
          ) : (
            <div className="flex flex-col">
              <header className="flex items-start justify-between gap-3 border-b border-secondary px-6 py-5">
                <div className="min-w-0">
                  <p className="truncate text-lg font-semibold text-primary">{detail.name}</p>
                  <p className="text-xs text-tertiary">{relativeTime(detail.created_at)}</p>
                </div>
                <ConfirmInline
                  icon={Trash01}
                  onConfirm={() => deleteMutation.mutate(detail.id)}
                  isLoading={deleteMutation.isPending}
                />
              </header>

              <dl className="space-y-4 px-6 py-5 text-sm">
                <div className="flex items-center gap-3">
                  <Mail01 aria-hidden="true" className="size-4 text-fg-quaternary" />
                  <a href={`mailto:${detail.email}`} className="truncate text-brand-secondary hover:underline">
                    {detail.email}
                  </a>
                </div>
                {detail.phone && (
                  <div className="flex items-center gap-3">
                    <Phone aria-hidden="true" className="size-4 text-fg-quaternary" />
                    <a href={`tel:${detail.phone}`} className="text-brand-secondary hover:underline">
                      {detail.phone}
                    </a>
                  </div>
                )}
                <div>
                  <dt className="text-xs font-semibold tracking-wider text-quaternary uppercase">Onderwerp</dt>
                  <dd className="mt-1 text-primary">{detail.subject}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-wider text-quaternary uppercase">Bericht</dt>
                  <dd className="mt-1 rounded-lg bg-secondary p-3 text-sm whitespace-pre-wrap text-secondary">
                    {detail.message}
                  </dd>
                </div>
              </dl>

              <div className="space-y-4 border-t border-secondary px-6 py-5">
                <TextArea
                  label="Interne notities"
                  rows={4}
                  value={notes}
                  onChange={(value) => setNotes(value)}
                  placeholder="Bijv. teruggebeld op 02/05, klant geïnformeerd over vervolgstappen…"
                />

                <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-secondary bg-secondary_subtle p-3">
                  <input
                    type="checkbox"
                    checked={isHandled}
                    onChange={(e) => setIsHandled(e.target.checked)}
                    className="mt-0.5 size-4 rounded border-primary"
                  />
                  <span className="text-sm">
                    <span className="font-medium text-primary">Bericht afgehandeld</span>
                    <span className="block text-xs text-tertiary">Markeert het bericht als afgerond zodat het niet meer in de actielijst verschijnt.</span>
                  </span>
                </label>

                <div className="flex justify-end gap-2">
                  <Button color="secondary" size="md" onClick={() => setSelectedId(null)}>
                    Sluiten
                  </Button>
                  <Button
                    size="md"
                    iconLeading={Save01}
                    onClick={saveNotes}
                    isLoading={updateMutation.isPending}
                    showTextWhileLoading
                  >
                    Opslaan
                  </Button>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
