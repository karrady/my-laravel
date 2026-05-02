import type { FC, ReactNode, SVGProps } from "react";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

interface EmptyStateProps {
  icon: FC<SVGProps<SVGSVGElement>>;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <FeaturedIcon icon={icon} size="lg" color="gray" theme="modern" />
      <div className="max-w-md">
        <p className="text-md font-semibold text-primary">{title}</p>
        {description && <p className="mt-1 text-sm text-tertiary">{description}</p>}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
