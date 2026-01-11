import { useState } from "react";

import { useSearchTorrents, type MediaType } from "@/entities/torrent";

export function useSearchTorrent() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [mediaType, setMediaType] = useState<MediaType>("movies");
  const [filterAtmos, setFilterAtmos] = useState(false);
  const [filter4k, setFilter4k] = useState(false);
  const [minSeeders, setMinSeeders] = useState(0);
  const [includeNoSeeders, setIncludeNoSeeders] = useState(true);

  const { data, isLoading, error, isFetching } = useSearchTorrents({
    query: submittedQuery,
    mediaType,
    minSeeders,
    includeNoSeeders,
    filterAtmos,
    filter4k,
    enabled: submittedQuery.length >= 2,
  });

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
    mediaType,
    setMediaType,
    filterAtmos,
    setFilterAtmos,
    filter4k,
    setFilter4k,
    minSeeders,
    setMinSeeders,
    includeNoSeeders,
    setIncludeNoSeeders,
    torrents: data?.results || [],
    count: data?.count || 0,
    isLoading: isLoading || isFetching,
    error,
    handleSearch,
    handleKeyDown,
    hasSearched: submittedQuery.length >= 2,
  };
}
