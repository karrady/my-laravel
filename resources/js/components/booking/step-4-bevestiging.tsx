import { Button } from "@/components/base/buttons/button";
import { useBookingStore } from "@/stores/booking-store";
import { Car01, Calendar, CheckCircle, MarkerPin01, Phone } from "@untitledui/icons";

const VEHICLE_LABELS: Record<string, string> = {
  sedan: "Comfort Sedan",
  business: "Business Class",
  taxibus: "Taxi Bus",
};

function formatEur(cents: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(cents / 100);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function Step4Bevestiging() {
  const { confirmation, step1, step2, step3, reset } = useBookingStore();

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-success-secondary">
          <CheckCircle className="size-8 text-success-primary" aria-hidden />
        </div>
        <h2 className="text-2xl font-bold text-primary">Boeking bevestigd!</h2>
        <p className="text-secondary">
          Uw boekingnummer is{" "}
          <span className="font-mono font-semibold text-brand-secondary">
            {confirmation.bookingNumber}
          </span>
        </p>
        <p className="max-w-md text-sm text-tertiary">
          U ontvangt een bevestiging op <strong>{step3.customerEmail}</strong>. Onze chauffeur neemt
          contact met u op voor de rit.
        </p>
      </div>

      <div className="w-full max-w-md rounded-xl border border-secondary bg-primary p-6 shadow-xs">
        <h3 className="mb-4 text-sm font-semibold text-secondary">Overzicht</h3>
        <dl className="flex flex-col gap-4">
          <div className="flex gap-3">
            <MarkerPin01 className="mt-0.5 size-4 shrink-0 text-fg-tertiary" aria-hidden />
            <div>
              <dt className="text-xs text-tertiary">Van</dt>
              <dd className="text-sm text-primary">{step1.pickupAddress}</dd>
            </div>
          </div>
          <div className="flex gap-3">
            <MarkerPin01 className="mt-0.5 size-4 shrink-0 text-fg-tertiary" aria-hidden />
            <div>
              <dt className="text-xs text-tertiary">Naar</dt>
              <dd className="text-sm text-primary">{step1.destinationAddress}</dd>
            </div>
          </div>
          <div className="flex gap-3">
            <Calendar className="mt-0.5 size-4 shrink-0 text-fg-tertiary" aria-hidden />
            <div>
              <dt className="text-xs text-tertiary">Datum &amp; tijd</dt>
              <dd className="text-sm text-primary">{formatDate(step1.pickupAt)}</dd>
              {step1.returnAt && (
                <dd className="mt-0.5 text-sm text-secondary">
                  Terugreis: {formatDate(step1.returnAt)}
                </dd>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <Car01 className="mt-0.5 size-4 shrink-0 text-fg-tertiary" aria-hidden />
            <div>
              <dt className="text-xs text-tertiary">Voertuig</dt>
              <dd className="text-sm text-primary">
                {VEHICLE_LABELS[step2.vehicleType ?? "sedan"]}
              </dd>
            </div>
          </div>
          <div className="border-t border-secondary pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-secondary">Totaal</span>
              <span className="text-lg font-bold text-primary">
                {formatEur(step2.priceCents ?? 0)}
              </span>
            </div>
            {step2.returnPriceCents && (
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs text-tertiary">Terugreis</span>
                <span className="text-sm text-secondary">
                  {formatEur(step2.returnPriceCents)}
                </span>
              </div>
            )}
            <p className="mt-1 text-xs text-tertiary">
              Betaling:{" "}
              {step3.paymentMethod === "in_taxi_pin" ? "Pinnen in de taxi" : "Contant in de taxi"}
            </p>
          </div>
        </dl>
      </div>

      <div className="flex flex-col items-center gap-3">
        <p className="text-sm text-tertiary">Vragen? Bel ons:</p>
        <a
          href="tel:+31852128302"
          className="flex items-center gap-2 text-lg font-semibold text-brand-secondary hover:text-brand-secondary_hover"
        >
          <Phone className="size-5" aria-hidden />
          085 212 83 02
        </a>
        <Button color="secondary" onClick={reset}>
          Nieuwe boeking maken
        </Button>
      </div>
    </div>
  );
}
