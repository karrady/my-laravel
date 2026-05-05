import { FormEvent, useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { useBookingStore } from "@/stores/booking-store";
import { ArrowLeft, ArrowRight } from "@untitledui/icons";

interface Step3Props {
  onNext: () => void;
  onBack: () => void;
}

interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ label, hint, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-secondary">{label}</label>
      {children}
      {error ? (
        <p className="text-xs text-error-primary">{error}</p>
      ) : hint ? (
        <p className="text-xs text-tertiary">{hint}</p>
      ) : null}
    </div>
  );
}

const inputCls =
  "rounded-lg border border-primary bg-primary px-3.5 py-2.5 text-sm text-primary shadow-xs outline-none transition duration-100 ease-linear placeholder:text-placeholder focus:border-brand focus:ring-2 focus:ring-brand/20";

const invalidCls =
  "rounded-lg border border-error bg-primary px-3.5 py-2.5 text-sm text-primary shadow-xs outline-none focus:ring-2 focus:ring-error/20";

export function Step3Contact({ onNext, onBack }: Step3Props) {
  const { step3, setStep3, step2 } = useBookingStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { step1, setConfirmation, setStep } = useBookingStore();

  const validate = () => {
    const e: Record<string, string> = {};
    if (!step3.customerName.trim()) e.customerName = "Vul uw naam in.";
    if (!step3.customerEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.customerEmail = "Vul een geldig e-mailadres in.";
    if (!step3.customerPhone.trim() || step3.customerPhone.length < 8) e.customerPhone = "Vul een geldig telefoonnummer in.";
    return e;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);
    try {
      const payload = {
        pickup_address: step1.pickupAddress,
        pickup_lat: step1.pickupLat,
        pickup_lng: step1.pickupLng,
        destination_address: step1.destinationAddress,
        destination_lat: step1.destinationLat,
        destination_lng: step1.destinationLng,
        pickup_at: step1.pickupAt,
        return_at: step1.returnAt || undefined,
        passengers: step1.passengers,
        vehicle_type: step2.vehicleType,
        customer_name: step3.customerName,
        customer_email: step3.customerEmail,
        customer_phone: step3.customerPhone,
        flight_number: step3.flightNumber || undefined,
        notes: step3.notes || undefined,
        wants_sms: step3.wantsSms,
        payment_method: step3.paymentMethod,
      };

      const res = await fetch("/api/v1/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        setConfirmation({ bookingNumber: data.booking_number });
        onNext();
      } else {
        const data = await res.json();
        setErrors({ submit: data.error ?? "Er is een fout opgetreden. Probeer opnieuw." });
      }
    } catch {
      setErrors({ submit: "Verbindingsfout. Controleer uw internet en probeer opnieuw." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Naam *" error={errors.customerName}>
          <input
            type="text"
            value={step3.customerName}
            placeholder="Uw volledige naam"
            onChange={(e) => setStep3({ customerName: e.target.value })}
            className={errors.customerName ? invalidCls : inputCls}
            autoComplete="name"
          />
        </Field>

        <Field label="Telefoonnummer *" error={errors.customerPhone}>
          <input
            type="tel"
            value={step3.customerPhone}
            placeholder="+31 6 12345678"
            onChange={(e) => setStep3({ customerPhone: e.target.value })}
            className={errors.customerPhone ? invalidCls : inputCls}
            autoComplete="tel"
          />
        </Field>
      </div>

      <Field label="E-mailadres *" error={errors.customerEmail} hint="U ontvangt een bevestiging op dit adres.">
        <input
          type="email"
          value={step3.customerEmail}
          placeholder="naam@voorbeeld.nl"
          onChange={(e) => setStep3({ customerEmail: e.target.value })}
          className={errors.customerEmail ? invalidCls : inputCls}
          autoComplete="email"
        />
      </Field>

      <Field label="Vluchtnummer (optioneel)" hint="Optioneel, voor uw eigen referentie.">
        <input
          type="text"
          value={step3.flightNumber}
          placeholder="Bijv. KL1234"
          onChange={(e) => setStep3({ flightNumber: e.target.value })}
          className={inputCls}
          autoComplete="off"
        />
      </Field>

      <Field label="Opmerkingen (optioneel)">
        <textarea
          value={step3.notes}
          placeholder="Bijzonderheden, speciale wensen…"
          rows={3}
          onChange={(e) => setStep3({ notes: e.target.value })}
          className={inputCls + " resize-none"}
        />
      </Field>

      <div className="flex flex-col gap-4 rounded-xl border border-secondary bg-secondary p-5">
        <p className="text-sm font-medium text-secondary">Betaalmethode</p>
        <div className="flex flex-col gap-3">
          {(["in_taxi_pin", "in_taxi_cash"] as const).map((method) => (
            <label key={method} className="flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="payment_method"
                value={method}
                checked={step3.paymentMethod === method}
                onChange={() => setStep3({ paymentMethod: method })}
                className="size-4 border-secondary text-brand"
              />
              <span className="text-sm text-primary">
                {method === "in_taxi_pin" ? "Pinnen in de taxi" : "Contant in de taxi"}
              </span>
            </label>
          ))}
        </div>

        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={step3.wantsSms}
            onChange={(e) => setStep3({ wantsSms: e.target.checked })}
            className="size-4 rounded border-secondary text-brand"
          />
          <span className="text-sm text-primary">SMS-bevestiging ontvangen</span>
        </label>
      </div>

      {errors.submit && (
        <p className="rounded-lg border border-error_subtle bg-error-primary px-4 py-3 text-sm text-error-primary">
          {errors.submit}
        </p>
      )}

      <div className="flex justify-between">
        <Button color="secondary" iconLeading={ArrowLeft} onClick={onBack} disabled={isSubmitting}>
          Terug
        </Button>
        <Button type="submit" iconTrailing={ArrowRight} isLoading={isSubmitting} showTextWhileLoading>
          Boeking bevestigen
        </Button>
      </div>
    </form>
  );
}
