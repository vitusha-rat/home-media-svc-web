import type { FC } from "react";

import type { MediaType } from "@/entities/torrent";
import { cn } from "@/shared/lib";

interface MediaTypeSelectorProps {
  value: MediaType;
  onChange: (value: MediaType) => void;
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const TabButton: FC<TabButtonProps> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200",
      active
        ? "bg-primary-600 text-white shadow-lg shadow-primary-600/25"
        : "bg-surface-800/50 text-surface-400 hover:text-surface-200 hover:bg-surface-700/50 border border-surface-700"
    )}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export const MediaTypeSelector: FC<MediaTypeSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs sm:text-sm text-surface-500 mr-1">Тип:</span>
      <TabButton
        active={value === "movies"}
        onClick={() => onChange("movies")}
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
        }
        label="Фильмы"
      />
      <TabButton
        active={value === "tv"}
        onClick={() => onChange("tv")}
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        }
        label="Сериалы"
      />
      <TabButton
        active={value === "all"}
        onClick={() => onChange("all")}
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        }
        label="Всё"
      />
    </div>
  );
};
