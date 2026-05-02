import type { ReactNode } from "react";
import { X as XIcon } from "@untitledui/icons";
import {
  Dialog as AriaDialog,
  Heading as AriaHeading,
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
} from "react-aria-components";
import { cx } from "@/utils/cx";

interface SlideOverProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl";
  children: ReactNode;
  footer?: ReactNode;
}

const sizes = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function SlideOver({
  isOpen,
  onOpenChange,
  title,
  description,
  size = "md",
  children,
  footer,
}: SlideOverProps) {
  return (
    <AriaModalOverlay
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable
      className={cx(
        "fixed inset-0 z-50 flex justify-end bg-overlay/70 backdrop-blur-xs",
        "entering:animate-in entering:fade-in entering:duration-200",
        "exiting:animate-out exiting:fade-out exiting:duration-150",
      )}
    >
      <AriaModal
        className={cx(
          "h-full w-full bg-primary shadow-2xl outline-none",
          sizes[size],
          "entering:animate-in entering:slide-in-from-right entering:duration-200",
          "exiting:animate-out exiting:slide-out-to-right exiting:duration-150",
        )}
      >
        <AriaDialog className="flex h-full flex-col outline-none">
          {({ close }) => (
            <>
              <header className="flex items-start justify-between gap-4 border-b border-secondary px-6 py-5">
                <div className="min-w-0">
                  <AriaHeading slot="title" className="text-lg font-semibold text-primary">
                    {title}
                  </AriaHeading>
                  {description && (
                    <p className="mt-1 text-sm text-tertiary">{description}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Sluiten"
                  className="-m-2 rounded-lg p-2 text-fg-quaternary transition duration-100 ease-linear hover:bg-primary_hover hover:text-fg-quaternary_hover"
                >
                  <XIcon aria-hidden="true" className="size-5" />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

              {footer && (
                <footer className="border-t border-secondary px-6 py-4">{footer}</footer>
              )}
            </>
          )}
        </AriaDialog>
      </AriaModal>
    </AriaModalOverlay>
  );
}
