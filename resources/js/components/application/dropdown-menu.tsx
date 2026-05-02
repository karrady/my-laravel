import type { FC, ReactNode, SVGProps } from "react";
import { DotsHorizontal } from "@untitledui/icons";
import {
  Button as AriaButton,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuTrigger as AriaMenuTrigger,
  Popover as AriaPopover,
} from "react-aria-components";
import { cx } from "@/utils/cx";

interface DropdownMenuProps {
  trigger?: ReactNode;
  ariaLabel?: string;
  children: ReactNode;
  placement?: "bottom end" | "bottom start" | "top end" | "top start";
}

export function DropdownMenu({
  trigger,
  ariaLabel = "Acties",
  children,
  placement = "bottom end",
}: DropdownMenuProps) {
  return (
    <AriaMenuTrigger>
      <AriaButton
        aria-label={ariaLabel}
        className={cx(
          "inline-flex size-9 cursor-pointer items-center justify-center rounded-lg text-fg-quaternary outline-brand transition duration-100 ease-linear hover:bg-primary_hover hover:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2",
        )}
      >
        {trigger ?? <DotsHorizontal aria-hidden="true" className="size-5" />}
      </AriaButton>
      <AriaPopover
        placement={placement}
        offset={4}
        className={cx(
          "min-w-44 origin-top-right rounded-xl border border-secondary_alt bg-primary py-1.5 shadow-lg outline-none",
          "entering:animate-in entering:fade-in entering:zoom-in-95 entering:duration-100",
          "exiting:animate-out exiting:fade-out exiting:zoom-out-95 exiting:duration-75",
        )}
      >
        <AriaMenu className="outline-none">{children}</AriaMenu>
      </AriaPopover>
    </AriaMenuTrigger>
  );
}

interface DropdownItemProps {
  icon?: FC<SVGProps<SVGSVGElement>>;
  children: ReactNode;
  onAction?: () => void;
  destructive?: boolean;
  href?: string;
}

export function DropdownItem({ icon: Icon, children, onAction, destructive, href }: DropdownItemProps) {
  return (
    <AriaMenuItem
      onAction={onAction}
      href={href}
      className={cx(
        "flex cursor-pointer items-center gap-2.5 px-3 py-2 text-sm outline-none transition duration-100 ease-linear",
        destructive
          ? "text-error-primary hover:bg-error-primary focus:bg-error-primary"
          : "text-secondary hover:bg-primary_hover hover:text-primary focus:bg-primary_hover focus:text-primary",
      )}
    >
      {Icon && <Icon aria-hidden="true" className="size-4 shrink-0" />}
      <span className="flex-1">{children}</span>
    </AriaMenuItem>
  );
}

interface DropdownDividerProps {
  className?: string;
}

export function DropdownDivider({ className }: DropdownDividerProps) {
  return <div className={cx("my-1 h-px bg-secondary", className)} />;
}
