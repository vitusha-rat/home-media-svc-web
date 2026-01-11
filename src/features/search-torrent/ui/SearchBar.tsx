import type { FC } from "react";

import { Button, Input } from "@/shared/ui";

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
}

export const SearchBar: FC<SearchBarProps> = ({
  query,
  onQueryChange,
  onSearch,
  onKeyDown,
  isLoading,
}) => {
  return (
    <div className="flex gap-3">
      <Input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Search for movies or TV shows..."
        className="flex-1"
        leftIcon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        }
      />
      <Button
        onClick={onSearch}
        isLoading={isLoading}
        disabled={query.trim().length < 2}
      >
        Search
      </Button>
    </div>
  );
};
