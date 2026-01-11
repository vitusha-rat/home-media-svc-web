import type { FC, ReactNode } from "react";

import { cn } from "@/shared/lib";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "accent";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-surface-800 text-surface-300 border-surface-700",
  success: "bg-green-500/10 text-green-400 border-green-500/30",
  warning: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  error: "bg-red-500/10 text-red-400 border-red-500/30",
  info: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  accent: "bg-accent-500/10 text-accent-400 border-accent-500/30",
};

export const Badge: FC<BadgeProps> = ({
  variant = "default",
  children,
  className,
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
