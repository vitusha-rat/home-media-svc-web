import { apiClient } from "@/shared/api";

import type {
  DownloadTorrentRequest,
  Torrent,
  TorrentSearchResponse,
} from "../model/types";

interface SearchParams {
  query: string;
  category?: number;
  filterAtmos?: boolean;
  filter4k?: boolean;
}

interface ApiTorrent {
  id: string;
  title: string;
  size: string;
  size_bytes: number;
  seeders: number;
  leechers: number;
  url: string;
  category: string | null;
  is_atmos: boolean;
  is_4k: boolean;
  download_url?: string;
  indexer_id?: number;
  poster_url?: string;
}

interface ApiSearchResponse {
  success: boolean;
  count: number;
  results: ApiTorrent[];
}

function mapTorrent(apiTorrent: ApiTorrent): Torrent {
  return {
    id: apiTorrent.id,
    title: apiTorrent.title,
    size: apiTorrent.size,
    sizeBytes: apiTorrent.size_bytes,
    seeders: apiTorrent.seeders,
    leechers: apiTorrent.leechers,
    url: apiTorrent.url,
    category: apiTorrent.category,
    isAtmos: apiTorrent.is_atmos,
    is4k: apiTorrent.is_4k,
    downloadUrl: apiTorrent.download_url,
    indexerId: apiTorrent.indexer_id,
    posterUrl: apiTorrent.poster_url,
  };
}

export const torrentApi = {
  search: async ({
    query,
    category,
    filterAtmos,
    filter4k,
  }: SearchParams): Promise<TorrentSearchResponse> => {
    const response = await apiClient.get<ApiSearchResponse>("/torrents/search", {
      params: {
        q: query,
        category,
        filter_atmos: filterAtmos,
        filter_4k: filter4k,
      },
    });

    return {
      success: response.data.success,
      count: response.data.count,
      results: response.data.results.map(mapTorrent),
    };
  },

  download: async (request: DownloadTorrentRequest) => {
    const response = await apiClient.post("/torrents/download", request);
    return response.data;
  },
};
