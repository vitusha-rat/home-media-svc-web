import type { FC, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared/lib";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "interactive";
}

export const Card: FC<CardProps> = ({
  children,
  variant = "default",
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-surface-900/50 border border-surface-800 rounded-xl p-4",
        "backdrop-blur-sm",
        variant === "interactive" &&
          "hover:border-surface-700 hover:bg-surface-900/70 transition-all duration-200 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardHeader: FC<CardHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn("flex items-center justify-between mb-3", className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export const CardTitle: FC<CardTitleProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h3
      className={cn("text-lg font-semibold text-surface-100", className)}
      {...props}
    >
      {children}
    </h3>
  );
};

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardContent: FC<CardContentProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn("text-surface-300", className)} {...props}>
      {children}
    </div>
  );
};
