import type { FC } from "react";

import { useDownloadTorrentFeature } from "@/features/download-torrent";
import { AtmosFilter } from "@/features/filter-atmos";
import { MediaTypeSelector, SearchBar, SearchResults, useSearchTorrent } from "@/features/search-torrent";

export const SearchPanel: FC = () => {
  const {
    query,
    setQuery,
    mediaType,
    setMediaType,
    filterAtmos,
    setFilterAtmos,
    filter4k,
    setFilter4k,
    includeNoSeeders,
    setIncludeNoSeeders,
    minSeeders,
    setMinSeeders,
    torrents,
    count,
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
        <MediaTypeSelector
          value={mediaType}
          onChange={setMediaType}
        />
        <AtmosFilter
          filterAtmos={filterAtmos}
          onFilterAtmosChange={setFilterAtmos}
          filter4k={filter4k}
          onFilter4kChange={setFilter4k}
          includeNoSeeders={includeNoSeeders}
          onIncludeNoSeedersChange={setIncludeNoSeeders}
          minSeeders={minSeeders}
          onMinSeedersChange={setMinSeeders}
        />
      </div>

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
