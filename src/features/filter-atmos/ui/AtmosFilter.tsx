import type { FC } from "react";

import { cn } from "@/shared/lib";

interface AtmosFilterProps {
  filterAtmos: boolean;
  onFilterAtmosChange: (value: boolean) => void;
  filter4k: boolean;
  onFilter4kChange: (value: boolean) => void;
  hideNoSeeders?: boolean;
  onHideNoSeedersChange?: (value: boolean) => void;
  minSeeders?: number;
  onMinSeedersChange?: (value: number) => void;
}

interface FilterCheckboxProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  className?: string;
}

const FilterCheckbox: FC<FilterCheckboxProps> = ({
  checked,
  onChange,
  label,
  className,
}) => (
  <label
    className={cn(
      "flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200",
      checked
        ? "bg-primary-600/20 text-primary-400 border border-primary-500/30"
        : "bg-surface-800/50 text-surface-400 border border-surface-700 hover:border-surface-600",
      className
    )}
  >
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="sr-only"
    />
    <div
      className={cn(
        "w-4 h-4 rounded border-2 flex items-center justify-center transition-colors",
        checked
          ? "bg-primary-600 border-primary-600"
          : "border-surface-500"
      )}
    >
      {checked && (
        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
    <span className="text-sm font-medium">{label}</span>
  </label>
);

export const AtmosFilter: FC<AtmosFilterProps> = ({
  filterAtmos,
  onFilterAtmosChange,
  filter4k,
  onFilter4kChange,
  hideNoSeeders = true,
  onHideNoSeedersChange,
  minSeeders = 0,
  onMinSeedersChange,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm text-surface-500">Фильтры:</span>
      <FilterCheckbox
        checked={filterAtmos}
        onChange={onFilterAtmosChange}
        label="Dolby Atmos"
      />
      <FilterCheckbox
        checked={filter4k}
        onChange={onFilter4kChange}
        label="4K UHD"
      />
      {onHideNoSeedersChange && (
        <FilterCheckbox
          checked={hideNoSeeders}
          onChange={onHideNoSeedersChange}
          label="Скрыть без сидов"
        />
      )}
      {onMinSeedersChange && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-800/50 border border-surface-700">
          <span className="text-sm text-surface-400">Мин. сидов:</span>
          <input
            type="number"
            min={0}
            max={100}
            value={minSeeders}
            onChange={(e) => onMinSeedersChange(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-14 px-2 py-1 text-sm bg-surface-900 border border-surface-600 rounded text-surface-200 focus:outline-none focus:border-primary-500"
          />
        </div>
      )}
    </div>
  );
};
