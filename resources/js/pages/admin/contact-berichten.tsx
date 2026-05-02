import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/utils/admin-api";

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
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<{ is_read: boolean; is_handled: boolean; notes: string }>({
    is_read: false, is_handled: false, notes: "",
  });

  const { data, isLoading } = useQuery<Paginated>({
    queryKey: ["admin-contact-messages", filter],
    queryFn: () => adminApi.get<Paginated>(`/contact-messages?filter=${filter}`),
  });

  const { data: detail } = useQuery<ContactMessage>({
    queryKey: ["admin-contact-message", selectedId],
    queryFn: () => adminApi.get<ContactMessage>(`/contact-messages/${selectedId}`),
    enabled: selectedId !== null,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ContactMessage> }) =>
      adminApi.patch(`/contact-messages/${id}`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-contact-messages"] });
      qc.invalidateQueries({ queryKey: ["admin-contact-message", selectedId] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminApi.delete(`/contact-messages/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-contact-messages"] });
      setSelectedId(null);
    },
  });

  function openDetail(m: ContactMessage) {
    setSelectedId(m.id);
    setEditForm({
      is_read: m.is_read,
      is_handled: m.is_handled,
      notes: m.notes ?? "",
    });
    if (!m.is_read) {
      updateMutation.mutate({ id: m.id, data: { is_read: true } });
    }
  }

  function handleSave() {
    if (selectedId === null) return;
    updateMutation.mutate({ id: selectedId, data: editForm });
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-primary">Contactberichten</h1>
          {data && <p className="text-sm text-tertiary mt-0.5">{data.total} berichten</p>}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-secondary">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className={
              "px-4 py-2 text-sm font-medium -mb-px border-b-2 transition duration-100 " +
              (filter === t.key
                ? "border-brand text-brand-secondary"
                : "border-transparent text-tertiary hover:text-primary")
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_420px] gap-5">
        {/* List */}
        <div className="bg-primary rounded-2xl border border-secondary overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-tertiary text-sm">Laden…</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="border-b border-secondary bg-secondary">
                <tr>
                  {["Tijd", "Naam", "Onderwerp", "Status", ""].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-tertiary uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary">
                {data?.data.map((m) => (
                  <tr
                    key={m.id}
                    onClick={() => openDetail(m)}
                    className={
                      "cursor-pointer transition duration-100 " +
                      (selectedId === m.id ? "bg-active" : "hover:bg-primary_hover")
                    }
                  >
                    <td className="px-4 py-3 text-tertiary text-xs whitespace-nowrap">{relativeTime(m.created_at)}</td>
                    <td className="px-4 py-3">
                      <p className={"font-medium " + (m.is_read ? "text-secondary" : "text-primary")}>{m.name}</p>
                      <p className="text-tertiary text-xs">{m.email}</p>
                    </td>
                    <td className="px-4 py-3 text-secondary max-w-xs truncate">{m.subject}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        {!m.is_read && <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-warning-secondary text-warning-primary w-fit">Nieuw</span>}
                        {m.is_handled
                          ? <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-success-secondary text-success-primary w-fit">Afgehandeld</span>
                          : <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-secondary text-tertiary w-fit">Open</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={(e) => { e.stopPropagation(); if (confirm("Bericht verwijderen?")) deleteMutation.mutate(m.id); }}
                        className="px-3 py-1.5 text-xs rounded-lg border border-error text-error-primary hover:bg-error-primary transition duration-100"
                      >
                        Verwijderen
                      </button>
                    </td>
                  </tr>
                ))}
                {data?.data.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-tertiary">Geen berichten.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Detail panel */}
        <aside className="bg-primary rounded-2xl border border-secondary p-5 h-fit lg:sticky lg:top-5">
          {!detail ? (
            <p className="text-sm text-tertiary text-center py-8">Selecteer een bericht om de details te zien.</p>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-base font-semibold text-primary">{detail.name}</p>
                <p className="text-xs text-tertiary">{relativeTime(detail.created_at)}</p>
              </div>

              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-xs font-medium text-quaternary uppercase tracking-wider">E-mail</dt>
                  <dd><a href={`mailto:${detail.email}`} className="text-brand-secondary hover:underline">{detail.email}</a></dd>
                </div>
                {detail.phone && (
                  <div>
                    <dt className="text-xs font-medium text-quaternary uppercase tracking-wider">Telefoon</dt>
                    <dd><a href={`tel:${detail.phone}`} className="text-brand-secondary hover:underline">{detail.phone}</a></dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs font-medium text-quaternary uppercase tracking-wider">Onderwerp</dt>
                  <dd className="text-primary">{detail.subject}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-quaternary uppercase tracking-wider">Bericht</dt>
                  <dd className="text-secondary whitespace-pre-wrap mt-1 p-3 rounded-lg bg-secondary text-sm">{detail.message}</dd>
                </div>
              </dl>

              <div className="border-t border-secondary pt-4 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-secondary mb-1">Interne notities</label>
                  <textarea
                    rows={4}
                    value={editForm.notes}
                    onChange={(e) => setEditForm((p) => ({ ...p, notes: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand resize-none"
                  />
                </div>

                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 text-sm text-secondary cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.is_read}
                      onChange={(e) => setEditForm((p) => ({ ...p, is_read: e.target.checked }))}
                      className="rounded"
                    />
                    Gelezen
                  </label>
                  <label className="flex items-center gap-2 text-sm text-secondary cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.is_handled}
                      onChange={(e) => setEditForm((p) => ({ ...p, is_handled: e.target.checked }))}
                      className="rounded"
                    />
                    Afgehandeld
                  </label>
                </div>

                <div className="flex gap-2 justify-end pt-1">
                  <button
                    onClick={() => setSelectedId(null)}
                    className="px-3 py-1.5 text-xs rounded-lg border border-secondary text-secondary hover:bg-primary_hover transition duration-100"
                  >Sluiten</button>
                  <button
                    onClick={handleSave}
                    disabled={updateMutation.isPending}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-brand-solid text-white hover:bg-brand-solid_hover disabled:opacity-50 transition duration-100"
                  >Opslaan</button>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
