import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { torrentApi } from "../api/torrentApi";
import type { DownloadTorrentRequest } from "./types";

export const torrentKeys = {
  all: ["torrents"] as const,
  search: (query: string, category?: number, filterAtmos?: boolean, filter4k?: boolean) =>
    [...torrentKeys.all, "search", { query, category, filterAtmos, filter4k }] as const,
};

interface UseSearchTorrentsParams {
  query: string;
  category?: number;
  filterAtmos?: boolean;
  filter4k?: boolean;
  enabled?: boolean;
}

export function useSearchTorrents({
  query,
  category,
  filterAtmos,
  filter4k,
  enabled = true,
}: UseSearchTorrentsParams) {
  return useQuery({
    queryKey: torrentKeys.search(query, category, filterAtmos, filter4k),
    queryFn: () =>
      torrentApi.search({
        query,
        category,
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
