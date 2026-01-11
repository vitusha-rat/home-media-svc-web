import type { FC } from "react";

import { useDownloadTorrentFeature } from "@/features/download-torrent";
import { AtmosFilter } from "@/features/filter-atmos";
import { SearchBar, SearchResults, useSearchTorrent } from "@/features/search-torrent";

export const SearchPanel: FC = () => {
  const {
    query,
    setQuery,
    filterAtmos,
    setFilterAtmos,
    filter4k,
    setFilter4k,
    hideNoSeeders,
    setHideNoSeeders,
    minSeeders,
    setMinSeeders,
    torrents,
    count,
    totalCount,
    isLoading,
    handleSearch,
    handleKeyDown,
    hasSearched,
  } = useSearchTorrent();

  const { downloadingId, handleDownload } = useDownloadTorrentFeature();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-3 sm:space-y-4">
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onSearch={handleSearch}
          onKeyDown={handleKeyDown}
          isLoading={isLoading}
        />
        <AtmosFilter
          filterAtmos={filterAtmos}
          onFilterAtmosChange={setFilterAtmos}
          filter4k={filter4k}
          onFilter4kChange={setFilter4k}
          hideNoSeeders={hideNoSeeders}
          onHideNoSeedersChange={setHideNoSeeders}
          minSeeders={minSeeders}
          onMinSeedersChange={setMinSeeders}
        />
      </div>

      {hasSearched && count !== totalCount && (
        <p className="text-xs text-surface-500 px-1">
          Показано {count} из {totalCount} результатов (отфильтровано {totalCount - count})
        </p>
      )}

      <SearchResults
        torrents={torrents}
        count={count}
        isLoading={isLoading}
        hasSearched={hasSearched}
        onDownload={handleDownload}
        downloadingId={downloadingId}
      />
    </div>
  );
};
