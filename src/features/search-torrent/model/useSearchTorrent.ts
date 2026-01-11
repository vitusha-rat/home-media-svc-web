import { useState } from "react";

import { useSearchTorrents, type Torrent } from "@/entities/torrent";

function filterTorrents(
  results: Torrent[] | undefined,
  hideNoSeeders: boolean,
  minSeeders: number
) {
  if (!results) return [];

  return results.filter((torrent) => {
    if (hideNoSeeders && torrent.seeders === 0) return false;
    if (minSeeders > 0 && torrent.seeders < minSeeders) return false;
    return true;
  });
}

export function useSearchTorrent() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [category, setCategory] = useState<number | undefined>();
  const [filterAtmos, setFilterAtmos] = useState(false);
  const [filter4k, setFilter4k] = useState(false);
  const [minSeeders, setMinSeeders] = useState(0);
  const [hideNoSeeders, setHideNoSeeders] = useState(true);

  const { data, isLoading, error, isFetching } = useSearchTorrents({
    query: submittedQuery,
    category,
    filterAtmos,
    filter4k,
    enabled: submittedQuery.length >= 2,
  });

  const filteredTorrents = filterTorrents(
    data?.results,
    hideNoSeeders,
    minSeeders
  );

  const handleSearch = () => {
    if (query.trim().length >= 2) {
      setSubmittedQuery(query.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return {
    query,
    setQuery,
    category,
    setCategory,
    filterAtmos,
    setFilterAtmos,
    filter4k,
    setFilter4k,
    minSeeders,
    setMinSeeders,
    hideNoSeeders,
    setHideNoSeeders,
    torrents: filteredTorrents,
    totalCount: data?.count || 0,
    count: filteredTorrents.length,
    isLoading: isLoading || isFetching,
    error,
    handleSearch,
    handleKeyDown,
    hasSearched: submittedQuery.length >= 2,
  };
}
