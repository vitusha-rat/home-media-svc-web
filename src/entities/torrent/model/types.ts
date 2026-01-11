// Тип медиа-контента для фильтрации
export type MediaType = "movies" | "tv" | "all";

// Качество видео (из поля category в ответе API)
export type VideoQuality = "4K" | "1080p" | "720p" | "Remux" | "WEB-DL" | "BluRay" | "Unknown";

export interface Torrent {
  id: string;
  title: string;
  size: string;
  sizeBytes: number;
  seeders: number;
  leechers: number;
  url: string;
  category: VideoQuality | null;
  isAtmos: boolean;
  is4k: boolean;
  downloadUrl?: string;
  indexerId?: number;
  posterUrl?: string;
}

export interface TorrentSearchParams {
  query: string;
  mediaType?: MediaType;
  minSeeders?: number;
  includeNoSeeders?: boolean;
  filterAtmos?: boolean;
  filter4k?: boolean;
}

export interface TorrentSearchResponse {
  success: boolean;
  count: number;
  results: Torrent[];
}

export interface DownloadTorrentRequest {
  guid: string;
  indexer_id: number;
  title: string;
  size: number;
  seeders: number;
  leechers: number;
  download_url?: string | null;
  info_url: string;
}
