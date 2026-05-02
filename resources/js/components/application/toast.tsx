import type { FC, ReactNode, SVGProps } from "react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AlertCircle, CheckCircle, InfoCircle, X as XIcon } from "@untitledui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";

type ToastVariant = "success" | "error" | "info" | "warning";

interface Toast {
  id: number;
  variant: ToastVariant;
  title: string;
  description?: string;
}

interface ToastContextValue {
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

const variantConfig: Record<ToastVariant, { icon: FC<SVGProps<SVGSVGElement>>; color: "success" | "error" | "warning" | "brand" }> = {
  success: { icon: CheckCircle, color: "success" },
  error:   { icon: AlertCircle, color: "error" },
  warning: { icon: AlertCircle, color: "warning" },
  info:    { icon: InfoCircle,  color: "brand" },
};

let nextId = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback((variant: ToastVariant, title: string, description?: string) => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, variant, title, description }]);
    setTimeout(() => dismiss(id), 5000);
  }, [dismiss]);

  const value: ToastContextValue = {
    success: (t, d) => push("success", t, d),
    error:   (t, d) => push("error",   t, d),
    info:    (t, d) => push("info",    t, d),
    warning: (t, d) => push("warning", t, d),
    dismiss,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        role="region"
        aria-label="Meldingen"
        className="pointer-events-none fixed top-4 right-4 z-[60] flex w-full max-w-sm flex-col gap-3"
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const [visible, setVisible] = useState(false);
  const { icon, color } = variantConfig[toast.variant];

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div
      role="status"
      className={cx(
        "pointer-events-auto flex gap-3 rounded-xl border border-secondary bg-primary p-4 shadow-lg transition duration-200 ease-out",
        visible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
      )}
    >
      <FeaturedIcon icon={icon} size="md" color={color} theme="light" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-primary">{toast.title}</p>
        {toast.description && (
          <p className="mt-1 text-sm text-tertiary">{toast.description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Melding sluiten"
        className="-m-1 shrink-0 self-start rounded-md p-1 text-fg-quaternary transition duration-100 ease-linear hover:bg-primary_hover hover:text-fg-quaternary_hover"
      >
        <XIcon aria-hidden="true" className="size-4" />
      </button>
    </div>
  );
}
