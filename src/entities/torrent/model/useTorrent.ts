import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { torrentApi } from "../api/torrentApi";
import type { DownloadTorrentRequest, TorrentSearchParams } from "./types";

export const torrentKeys = {
  all: ["torrents"] as const,
  search: (params: Omit<TorrentSearchParams, "query"> & { query: string }) =>
    [...torrentKeys.all, "search", params] as const,
};

interface UseSearchTorrentsParams extends TorrentSearchParams {
  enabled?: boolean;
}

export function useSearchTorrents({
  query,
  mediaType = "movies",
  minSeeders = 0,
  includeNoSeeders = true,
  filterAtmos,
  filter4k,
  enabled = true,
}: UseSearchTorrentsParams) {
  return useQuery({
    queryKey: torrentKeys.search({ query, mediaType, minSeeders, includeNoSeeders, filterAtmos, filter4k }),
    queryFn: () =>
      torrentApi.search({
        query,
        mediaType,
        minSeeders,
        includeNoSeeders,
        filterAtmos,
        filter4k,
      }),
    enabled: enabled && query.length >= 2,
    staleTime: 1000 * 60 * 5,
  });
}

export function useDownloadTorrent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: DownloadTorrentRequest) => torrentApi.download(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["downloads"] });
    },
  });
}
