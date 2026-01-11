export interface Torrent {
  id: string;
  title: string;
  size: string;
  sizeBytes: number;
  seeders: number;
  leechers: number;
  url: string;
  category: string | null;
  isAtmos: boolean;
  is4k: boolean;
  downloadUrl?: string;
  indexerId?: number;
  posterUrl?: string;
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
