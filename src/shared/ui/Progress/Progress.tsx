import type { FC } from "react";

import { cn } from "@/shared/lib";

interface ProgressProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};

export const Progress: FC<ProgressProps> = ({
  value,
  max = 100,
  size = "md",
  showLabel = false,
  className,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "w-full bg-surface-800 rounded-full overflow-hidden",
          sizeStyles[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300 ease-out",
            percentage === 100
              ? "bg-green-500"
              : "bg-gradient-to-r from-primary-600 to-primary-400"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-surface-400 mt-1">{percentage.toFixed(1)}%</p>
      )}
    </div>
  );
};
