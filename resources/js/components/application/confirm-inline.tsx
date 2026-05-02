import { useEffect, useRef, useState } from "react";
import type { FC, SVGProps } from "react";
import { Trash01 } from "@untitledui/icons";

interface ConfirmInlineProps {
  onConfirm: () => void;
  isLoading?: boolean;
  label?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  icon?: FC<SVGProps<SVGSVGElement>>;
}

export function ConfirmInline({
  onConfirm,
  isLoading,
  label = "Verwijderen",
  confirmLabel = "Weet je het zeker?",
  cancelLabel = "Annuleren",
  icon: Icon = Trash01,
}: ConfirmInlineProps) {
  const [armed, setArmed] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!armed) return;
    timer.current = window.setTimeout(() => setArmed(false), 4000);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [armed]);

  if (!armed) {
    return (
      <button
        type="button"
        onClick={() => setArmed(true)}
        disabled={isLoading}
        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-error-primary transition duration-100 ease-linear hover:bg-error-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Icon aria-hidden="true" className="size-4" />
        <span>{label}</span>
      </button>
    );
  }

  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={() => {
          setArmed(false);
          onConfirm();
        }}
        disabled={isLoading}
        className="inline-flex items-center rounded-lg bg-error-solid px-2.5 py-1.5 text-sm font-semibold text-white transition duration-100 ease-linear hover:bg-error-solid_hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Bezig…" : confirmLabel}
      </button>
      <button
        type="button"
        onClick={() => setArmed(false)}
        disabled={isLoading}
        className="inline-flex items-center rounded-lg px-2.5 py-1.5 text-sm font-medium text-tertiary transition duration-100 ease-linear hover:bg-primary_hover hover:text-secondary disabled:cursor-not-allowed disabled:opacity-50"
      >
        {cancelLabel}
      </button>
    </span>
  );
}
