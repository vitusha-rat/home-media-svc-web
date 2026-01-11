import type { FC } from "react";

import { cn } from "@/shared/lib";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

export const Spinner: FC<SpinnerProps> = ({ size = "md", className }) => {
  return (
    <svg
      className={cn("animate-spin text-primary-500", sizeStyles[size], className)}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
};

interface SkeletonProps {
  className?: string;
}

export const Skeleton: FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "animate-pulse bg-surface-800 rounded-lg",
        className
      )}
    />
  );
};

interface LoadingOverlayProps {
  message?: string;
}

export const LoadingOverlay: FC<LoadingOverlayProps> = ({
  message = "Загрузка...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <Spinner size="lg" />
      <p className="text-surface-400 text-sm">{message}</p>
    </div>
  );
};
