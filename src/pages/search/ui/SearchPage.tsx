import type { FC } from "react";

import { SearchPanel } from "@/widgets/search-panel";

export const SearchPage: FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-surface-100">Search Torrents</h1>
        <p className="text-sm sm:text-base text-surface-400 mt-1">
          Find movies and TV shows across multiple torrent indexers
        </p>
      </div>
      <SearchPanel />
    </div>
  );
};
