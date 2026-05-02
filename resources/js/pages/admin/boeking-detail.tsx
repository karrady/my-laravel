import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  CurrencyEuroCircle,
  FileCheck02,
  FilePlus02,
  LinkExternal01,
  Mail01,
  MarkerPin01,
  Phone,
  Plane,
  Send01,
  Users01,
  XCircle,
} from "@untitledui/icons";
import type { FC, ReactNode, SVGProps } from "react";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { PageHeader } from "@/components/application/page-header";
import { useToast } from "@/components/application/toast";
import { adminApi } from "@/utils/admin-api";
import { cx } from "@/utils/cx";

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

const statusBadge: Record<string, { color: "warning" | "success" | "gray" | "error"; label: string }> = {
  pending:   { color: "warning", label: "Aanvraag" },
  confirmed: { color: "success", label: "Bevestigd" },
  completed: { color: "gray",    label: "Voltooid" },
  cancelled: { color: "error",   label: "Geannuleerd" },
};

const paymentBadge: Record<string, { color: "warning" | "success" | "gray" | "error"; label: string }> = {
  pending: { color: "warning", label: "Onbetaald" },
  paid:    { color: "success", label: "Betaald" },
  overdue: { color: "error",   label: "Te laat" },
};

function euro(cents: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("nl-NL", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("");
}

export default function AdminBoekingDetail() {
  const { id } = useParams<{ id: string }>();
  const qc = useQueryClient();
  const toast = useToast();

  const { data: booking, isLoading } = useQuery<Booking>({
    queryKey: ["admin-booking", id],
    queryFn: () => adminApi.get<Booking>(`/bookings/${id}`),
  });

  const updateMutation = useMutation({
    mutationFn: (data: Record<string, string>) => adminApi.patch(`/bookings/${id}`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-booking", id] });
      qc.invalidateQueries({ queryKey: ["admin-bookings"] });
      toast.success("Opgeslagen");
    },
    onError: (e: Error) => toast.error("Opslaan mislukt", e.message),
  });

  const quoteMutation = useMutation({
    mutationFn: () => adminApi.post(`/bookings/${id}/moneybird/quote`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-booking", id] });
      toast.success("Offerte aangemaakt", "De offerte staat klaar in Moneybird.");
    },
    onError: (e: Error) => toast.error("Offerte aanmaken mislukt", e.message),
  });

  const sendQuoteMutation = useMutation({
    mutationFn: () => adminApi.post(`/bookings/${id}/moneybird/send-quote`),
    onSuccess: () => toast.success("Offerte verstuurd", "De klant ontvangt een e-mail."),
    onError: (e: Error) => toast.error("Versturen mislukt", e.message),
  });

  const invoiceMutation = useMutation({
    mutationFn: () => adminApi.post(`/bookings/${id}/moneybird/invoice`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-booking", id] });
      toast.success("Factuur aangemaakt", "De factuur staat klaar in Moneybird.");
    },
    onError: (e: Error) => toast.error("Factuur aanmaken mislukt", e.message),
  });

  if (isLoading) {
    return (
      <>
        <Helmet><title>Boeking — YAS Admin</title></Helmet>
        <div className="p-8 text-sm text-tertiary">Laden…</div>
      </>
    );
  }
  if (!booking) {
    return (
      <>
        <Helmet><title>Boeking niet gevonden — YAS Admin</title></Helmet>
        <div className="p-8 text-sm text-error-primary">Boeking niet gevonden.</div>
      </>
    );
  }

  const anyLoading =
    quoteMutation.isPending ||
    sendQuoteMutation.isPending ||
    invoiceMutation.isPending ||
    updateMutation.isPending;

  const sb = statusBadge[booking.status] ?? { color: "gray" as const, label: booking.status };
  const pb = paymentBadge[booking.payment_status] ?? { color: "gray" as const, label: booking.payment_status };

  const totalCents =
    booking.price_cents + (booking.return_price_cents ?? 0);

  return (
    <>
      <Helmet><title>Boeking {booking.booking_number} — YAS Admin</title></Helmet>

      <div className="space-y-6 p-6 md:p-8">
        <PageHeader
          title={booking.booking_number}
          description={`Aangemaakt door ${booking.customer_name} op ${new Date(booking.created_at).toLocaleDateString("nl-NL", { day: "2-digit", month: "long", year: "numeric" })}`}
          actions={
            <Button color="secondary" size="sm" iconLeading={ArrowLeft} href="/admin/boekingen">
              Terug
            </Button>
          }
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Hoofdkolom */}
          <div className="space-y-6 lg:col-span-2">
            {/* Status & acties */}
            <Card>
              <CardHeader title="Status" subtitle="Werk de status van deze boeking bij." />
              <div className="space-y-4 px-5 py-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold tracking-wider text-quaternary uppercase">Huidig:</span>
                  <BadgeWithDot type="pill-color" color={sb.color} size="md">{sb.label}</BadgeWithDot>
                  <BadgeWithDot type="pill-color" color={pb.color} size="md">{pb.label}</BadgeWithDot>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    color="secondary"
                    iconLeading={CheckCircle}
                    isDisabled={anyLoading || booking.status === "confirmed"}
                    onClick={() => updateMutation.mutate({ status: "confirmed" })}
                  >
                    Bevestigen
                  </Button>
                  <Button
                    size="sm"
                    color="secondary"
                    iconLeading={CheckCircle}
                    isDisabled={anyLoading || booking.status === "completed"}
                    onClick={() => updateMutation.mutate({ status: "completed" })}
                  >
                    Voltooien
                  </Button>
                  <Button
                    size="sm"
                    color="tertiary-destructive"
                    iconLeading={XCircle}
                    isDisabled={anyLoading || booking.status === "cancelled"}
                    onClick={() => updateMutation.mutate({ status: "cancelled" })}
                  >
                    Annuleren
                  </Button>
                  <span className="mx-1 hidden h-8 w-px bg-secondary sm:inline-block" />
                  <Button
                    size="sm"
                    color="secondary"
                    iconLeading={CurrencyEuroCircle}
                    isDisabled={anyLoading || booking.payment_status === "paid"}
                    onClick={() => updateMutation.mutate({ payment_status: "paid" })}
                  >
                    Markeer betaald
                  </Button>
                </div>
              </div>
            </Card>

            {/* Klant */}
            <Card>
              <CardHeader title="Klantgegevens" />
              <div className="px-5 py-5">
                <div className="flex items-start gap-4">
                  <Avatar size="lg" initials={getInitials(booking.customer_name)} alt={booking.customer_name} />
                  <div className="min-w-0 flex-1 space-y-2">
                    <p className="text-md font-semibold text-primary">{booking.customer_name}</p>
                    <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
                      <a
                        href={`mailto:${booking.customer_email}`}
                        className="inline-flex items-center gap-1.5 text-brand-secondary hover:underline"
                      >
                        <Mail01 aria-hidden="true" className="size-4" />
                        {booking.customer_email}
                      </a>
                      <a
                        href={`tel:${booking.customer_phone}`}
                        className="inline-flex items-center gap-1.5 text-brand-secondary hover:underline"
                      >
                        <Phone aria-hidden="true" className="size-4" />
                        {booking.customer_phone}
                      </a>
                    </div>
                    <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-tertiary">
                      <span>Betaalmethode: <span className="text-secondary">{booking.payment_method}</span></span>
                      <span>SMS gewenst: <span className="text-secondary">{booking.wants_sms ? "Ja" : "Nee"}</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Rit */}
            <Card>
              <CardHeader title="Ritdetails" />
              <div className="px-5 py-5">
                {/* Route */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-secondary text-fg-brand-primary">
                      <MarkerPin01 aria-hidden="true" className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold tracking-wider text-quaternary uppercase">Ophaaladres</p>
                      <p className="text-sm text-primary">{booking.pickup_address}</p>
                    </div>
                  </div>
                  <div className="ml-4 flex items-center gap-3 pl-0">
                    <span className="block h-6 w-px bg-secondary" />
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-success-secondary text-fg-success-secondary">
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold tracking-wider text-quaternary uppercase">Bestemming</p>
                      <p className="text-sm text-primary">{booking.destination_address}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-secondary pt-5 sm:grid-cols-3">
                  <Field icon={Calendar} label="Ophaaltijd" value={formatDateTime(booking.pickup_at)} />
                  {booking.return_at && (
                    <Field icon={Calendar} label="Retourtijd" value={formatDateTime(booking.return_at)} />
                  )}
                  <Field icon={Users01} label="Passagiers" value={booking.passengers} />
                  <Field label="Voertuig" value={<span className="capitalize">{booking.vehicle_type}</span>} />
                  <Field icon={MarkerPin01} label="Afstand" value={`${booking.distance_km} km`} />
                  <Field icon={Clock} label="Reistijd" value={`${booking.duration_min} min`} />
                  {booking.flight_number && (
                    <Field
                      icon={Plane}
                      label="Vlucht"
                      value={`${booking.flight_number}${booking.flight_airport_iata ? ` (${booking.flight_airport_iata})` : ""}`}
                    />
                  )}
                </div>

                {booking.notes && (
                  <div className="mt-5 rounded-lg border border-secondary bg-secondary_subtle p-4">
                    <p className="text-xs font-semibold tracking-wider text-quaternary uppercase">Notities</p>
                    <p className="mt-1 text-sm whitespace-pre-wrap text-secondary">{booking.notes}</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Zijbalk */}
          <div className="space-y-6">
            {/* Prijs */}
            <Card>
              <CardHeader title="Betaling" />
              <div className="space-y-3 px-5 py-5">
                <PriceRow label="Ritprijs" value={euro(booking.price_cents)} />
                {booking.return_price_cents != null && (
                  <PriceRow label="Retour" value={euro(booking.return_price_cents)} />
                )}
                <div className="flex items-center justify-between border-t border-secondary pt-3">
                  <span className="text-sm font-medium text-secondary">Totaal</span>
                  <span className="text-lg font-semibold text-primary">{euro(totalCents)}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm text-tertiary">Status</span>
                  <BadgeWithDot type="pill-color" color={pb.color} size="sm">{pb.label}</BadgeWithDot>
                </div>
              </div>
            </Card>

            {/* Moneybird */}
            <Card>
              <CardHeader title="Moneybird" subtitle="Offerte en facturatie." />
              <div className="space-y-3 px-5 py-5">
                {booking.moneybird_quote_id ? (
                  <div className="flex items-center gap-2 rounded-lg border border-secondary bg-success-secondary/40 px-3 py-2">
                    <CheckCircle aria-hidden="true" className="size-4 text-fg-success-secondary" />
                    <span className="text-sm text-secondary">Offerte aangemaakt</span>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    color="primary"
                    iconLeading={FilePlus02}
                    isLoading={quoteMutation.isPending}
                    showTextWhileLoading
                    isDisabled={anyLoading}
                    onClick={() => quoteMutation.mutate()}
                    className="w-full justify-center"
                  >
                    Offerte aanmaken
                  </Button>
                )}

                {booking.moneybird_quote_id && booking.moneybird_quote_url && (
                  <Button
                    size="sm"
                    color="secondary"
                    iconLeading={LinkExternal01}
                    href={booking.moneybird_quote_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full justify-center"
                  >
                    Bekijk in Moneybird
                  </Button>
                )}

                {booking.moneybird_quote_id && !booking.moneybird_invoice_id && (
                  <>
                    <Button
                      size="sm"
                      color="secondary"
                      iconLeading={Send01}
                      isLoading={sendQuoteMutation.isPending}
                      showTextWhileLoading
                      isDisabled={anyLoading}
                      onClick={() => sendQuoteMutation.mutate()}
                      className="w-full justify-center"
                    >
                      Offerte versturen per e-mail
                    </Button>
                    <Button
                      size="sm"
                      color="secondary"
                      iconLeading={FileCheck02}
                      isLoading={invoiceMutation.isPending}
                      showTextWhileLoading
                      isDisabled={anyLoading}
                      onClick={() => invoiceMutation.mutate()}
                      className="w-full justify-center"
                    >
                      Omzetten naar factuur
                    </Button>
                  </>
                )}

                {booking.moneybird_invoice_id && (
                  <div className="flex items-center gap-2 rounded-lg border border-secondary bg-success-secondary/40 px-3 py-2">
                    <CheckCircle aria-hidden="true" className="size-4 text-fg-success-secondary" />
                    <span className="text-sm text-secondary">Factuur aangemaakt</span>
                  </div>
                )}

                {!booking.moneybird_quote_id && !booking.moneybird_invoice_id && (
                  <p className="text-xs text-tertiary">Nog geen Moneybird-document gekoppeld.</p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={cx("overflow-hidden rounded-xl border border-secondary bg-primary", className)}>
      {children}
    </section>
  );
}

function CardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="border-b border-secondary px-5 py-4">
      <h2 className="text-md font-semibold text-primary">{title}</h2>
      {subtitle && <p className="mt-0.5 text-xs text-tertiary">{subtitle}</p>}
    </header>
  );
}

interface FieldProps {
  label: string;
  value: ReactNode;
  icon?: FC<SVGProps<SVGSVGElement>>;
}

function Field({ label, value, icon: Icon }: FieldProps) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-quaternary uppercase">
        {Icon && <Icon aria-hidden="true" className="size-3.5" />}
        {label}
      </p>
      <p className="mt-1 text-sm text-primary">{value}</p>
    </div>
  );
}

function PriceRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-secondary">{label}</span>
      <span className="font-medium text-primary">{value}</span>
    </div>
  );
}
