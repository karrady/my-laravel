import { useState } from "react";
import { useParams, Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/utils/admin-api";

interface Booking {
  id: number;
  booking_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  pickup_address: string;
  pickup_lat: number;
  pickup_lng: number;
  destination_address: string;
  destination_lat: number;
  destination_lng: number;
  pickup_at: string;
  return_at: string | null;
  passengers: number;
  vehicle_type: string;
  distance_km: number;
  duration_min: number;
  price_cents: number;
  return_price_cents: number | null;
  flight_number: string | null;
  flight_direction: string | null;
  flight_airport_iata: string | null;
  notes: string | null;
  wants_sms: boolean;
  payment_method: string;
  payment_status: string;
  status: string;
  moneybird_contact_id: string | null;
  moneybird_quote_id: string | null;
  moneybird_quote_url: string | null;
  moneybird_invoice_id: string | null;
  created_at: string;
}

function euro(cents: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(cents);
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value && value !== 0) return null;
  return (
    <div>
      <dt className="text-xs text-tertiary font-medium uppercase tracking-wider">{label}</dt>
      <dd className="text-sm text-primary mt-0.5">{value}</dd>
    </div>
  );
}

const statusOptions = ["pending", "confirmed", "completed", "cancelled"];
const paymentOptions = ["pending", "paid", "overdue"];

export default function AdminBoekingDetail() {
  const { id } = useParams<{ id: string }>();
  const qc = useQueryClient();
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const { data: booking, isLoading } = useQuery<Booking>({
    queryKey: ["admin-booking", id],
    queryFn: () => adminApi.get<Booking>(`/bookings/${id}`),
  });

  function showToast(msg: string, ok: boolean) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  }

  const updateMutation = useMutation({
    mutationFn: (data: Record<string, string>) => adminApi.patch(`/bookings/${id}`, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-booking", id] }); showToast("Opgeslagen", true); },
    onError: () => showToast("Opslaan mislukt", false),
  });

  const quoteMutation = useMutation({
    mutationFn: () => adminApi.post(`/bookings/${id}/moneybird/quote`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-booking", id] }); showToast("Offerte aangemaakt in Moneybird", true); },
    onError: () => showToast("Offerte aanmaken mislukt", false),
  });

  const sendQuoteMutation = useMutation({
    mutationFn: () => adminApi.post(`/bookings/${id}/moneybird/send-quote`),
    onSuccess: () => showToast("Offerte verstuurd naar klant", true),
    onError: () => showToast("Versturen mislukt", false),
  });

  const invoiceMutation = useMutation({
    mutationFn: () => adminApi.post(`/bookings/${id}/moneybird/invoice`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-booking", id] }); showToast("Factuur aangemaakt in Moneybird", true); },
    onError: () => showToast("Factuur aanmaken mislukt", false),
  });

  if (isLoading) return <div className="p-8 text-tertiary">Laden…</div>;
  if (!booking) return <div className="p-8 text-error-primary">Boeking niet gevonden.</div>;

  const anyLoading = quoteMutation.isPending || sendQuoteMutation.isPending || invoiceMutation.isPending || updateMutation.isPending;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium ${toast.ok ? "bg-success-solid text-white" : "bg-error-solid text-white"}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link to="/admin/boekingen" className="text-sm text-tertiary hover:text-secondary">← Boekingen</Link>
          </div>
          <h1 className="text-xl font-semibold text-primary">{booking.booking_number}</h1>
          <p className="text-sm text-tertiary mt-0.5">Aangemaakt op {new Date(booking.created_at).toLocaleDateString("nl-NL")}</p>
        </div>

        {/* Status selects */}
        <div className="flex gap-3">
          <select
            value={booking.status}
            disabled={anyLoading}
            onChange={(e) => updateMutation.mutate({ status: e.target.value })}
            className="px-3 py-1.5 rounded-lg border border-primary text-sm text-primary bg-primary focus:outline-none focus:ring-2 focus:ring-brand"
          >
            {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={booking.payment_status}
            disabled={anyLoading}
            onChange={(e) => updateMutation.mutate({ payment_status: e.target.value })}
            className="px-3 py-1.5 rounded-lg border border-primary text-sm text-primary bg-primary focus:outline-none focus:ring-2 focus:ring-brand"
          >
            {paymentOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Rit details */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-primary rounded-2xl border border-secondary p-5">
            <h2 className="text-sm font-semibold text-primary mb-4">Ritgegevens</h2>
            <dl className="grid grid-cols-2 gap-4">
              <Field label="Ophaaladres" value={booking.pickup_address} />
              <Field label="Bestemming" value={booking.destination_address} />
              <Field label="Ophaaltijd" value={new Date(booking.pickup_at).toLocaleString("nl-NL")} />
              {booking.return_at && <Field label="Retourtijd" value={new Date(booking.return_at).toLocaleString("nl-NL")} />}
              <Field label="Passagiers" value={booking.passengers} />
              <Field label="Voertuig" value={booking.vehicle_type} />
              <Field label="Afstand" value={`${booking.distance_km} km`} />
              <Field label="Reistijd" value={`${booking.duration_min} min`} />
              {booking.flight_number && <Field label="Vlucht" value={`${booking.flight_number} (${booking.flight_airport_iata ?? ""})`} />}
              {booking.notes && <div className="col-span-2"><Field label="Notities" value={booking.notes} /></div>}
            </dl>
          </div>

          {/* Klant */}
          <div className="bg-primary rounded-2xl border border-secondary p-5">
            <h2 className="text-sm font-semibold text-primary mb-4">Klantgegevens</h2>
            <dl className="grid grid-cols-2 gap-4">
              <Field label="Naam" value={booking.customer_name} />
              <Field label="E-mail" value={<a href={`mailto:${booking.customer_email}`} className="text-brand-secondary hover:underline">{booking.customer_email}</a>} />
              <Field label="Telefoon" value={<a href={`tel:${booking.customer_phone}`} className="text-brand-secondary hover:underline">{booking.customer_phone}</a>} />
              <Field label="Betaalmethode" value={booking.payment_method} />
              <Field label="SMS gewenst" value={booking.wants_sms ? "Ja" : "Nee"} />
            </dl>
          </div>
        </div>

        {/* Financieel + Moneybird */}
        <div className="space-y-5">
          <div className="bg-primary rounded-2xl border border-secondary p-5">
            <h2 className="text-sm font-semibold text-primary mb-4">Financieel</h2>
            <dl className="space-y-3">
              <Field label="Ritprijs" value={euro(booking.price_cents)} />
              {booking.return_price_cents && <Field label="Retourprijs" value={euro(booking.return_price_cents)} />}
              {booking.return_price_cents && (
                <Field label="Totaal" value={<strong>{euro(booking.price_cents + booking.return_price_cents)}</strong>} />
              )}
            </dl>
          </div>

          {/* Moneybird */}
          <div className="bg-primary rounded-2xl border border-secondary p-5 space-y-3">
            <h2 className="text-sm font-semibold text-primary">Moneybird</h2>

            {booking.moneybird_quote_id ? (
              <div className="space-y-2">
                <p className="text-xs text-success-primary font-medium">✓ Offerte aangemaakt</p>
                {booking.moneybird_quote_url && (
                  <a
                    href={booking.moneybird_quote_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-brand-secondary hover:underline block"
                  >
                    Bekijk in Moneybird →
                  </a>
                )}
                {!booking.moneybird_invoice_id && (
                  <button
                    onClick={() => sendQuoteMutation.mutate()}
                    disabled={anyLoading}
                    className="w-full py-2 px-3 text-xs font-medium rounded-lg border border-secondary text-secondary hover:bg-primary_hover disabled:opacity-50 transition duration-100"
                  >
                    {sendQuoteMutation.isPending ? "Versturen…" : "Offerte versturen per e-mail"}
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => quoteMutation.mutate()}
                disabled={anyLoading}
                className="w-full py-2 px-3 text-xs font-medium rounded-lg bg-brand-solid hover:bg-brand-solid_hover text-white disabled:opacity-50 transition duration-100"
              >
                {quoteMutation.isPending ? "Aanmaken…" : "Offerte aanmaken"}
              </button>
            )}

            {booking.moneybird_quote_id && !booking.moneybird_invoice_id && (
              <button
                onClick={() => invoiceMutation.mutate()}
                disabled={anyLoading}
                className="w-full py-2 px-3 text-xs font-medium rounded-lg border border-secondary text-secondary hover:bg-primary_hover disabled:opacity-50 transition duration-100"
              >
                {invoiceMutation.isPending ? "Omzetten…" : "Omzetten naar factuur"}
              </button>
            )}

            {booking.moneybird_invoice_id && (
              <p className="text-xs text-success-primary font-medium">✓ Factuur aangemaakt</p>
            )}

            {!booking.moneybird_quote_id && !booking.moneybird_invoice_id && (
              <p className="text-xs text-tertiary">Nog geen Moneybird document.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
