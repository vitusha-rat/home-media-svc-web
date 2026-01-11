import { apiClient } from "@/shared/api";

import type { Download, DownloadsListResponse, DownloadStatus } from "../model/types";

interface ApiDownload {
  hash: string;
  name: string;
  size: number;
  size_formatted: string;
  progress: number;
  status: DownloadStatus;
  download_speed: number;
  download_speed_formatted: string;
  upload_speed: number;
  upload_speed_formatted: string;
  eta: number | null;
  eta_formatted: string;
  added_on: string | null;
  is_complete: boolean;
  seeds: number;
  peers: number;
  tracker: string;
  save_path: string;
  downloaded: number;
  downloaded_formatted: string;
  uploaded: number;
  uploaded_formatted: string;
  ratio: number;
  availability: number;
  time_active: number;
  time_active_formatted: string;
  // Информация о перемещении
  is_moving?: boolean;
  move_progress?: number;
  move_destination?: string | null;
}

interface ApiDownloadsResponse {
  success: boolean;
  count: number;
  downloads: ApiDownload[];
}

function mapDownload(apiDownload: ApiDownload): Download {
  return {
    hash: apiDownload.hash,
    name: apiDownload.name,
    size: apiDownload.size,
    sizeFormatted: apiDownload.size_formatted,
    progress: apiDownload.progress,
    status: apiDownload.status,
    downloadSpeed: apiDownload.download_speed,
    downloadSpeedFormatted: apiDownload.download_speed_formatted,
    uploadSpeed: apiDownload.upload_speed,
    uploadSpeedFormatted: apiDownload.upload_speed_formatted,
    eta: apiDownload.eta,
    etaFormatted: apiDownload.eta_formatted,
    addedOn: apiDownload.added_on,
    isComplete: apiDownload.is_complete,
    seeds: apiDownload.seeds,
    peers: apiDownload.peers,
    tracker: apiDownload.tracker,
    savePath: apiDownload.save_path,
    downloaded: apiDownload.downloaded,
    downloadedFormatted: apiDownload.downloaded_formatted,
    uploaded: apiDownload.uploaded,
    uploadedFormatted: apiDownload.uploaded_formatted,
    ratio: apiDownload.ratio,
    availability: apiDownload.availability,
    timeActive: apiDownload.time_active,
    timeActiveFormatted: apiDownload.time_active_formatted,
    isMoving: apiDownload.is_moving ?? false,
    moveProgress: apiDownload.move_progress ?? 0,
    moveDestination: apiDownload.move_destination ?? null,
  };
}

export const downloadApi = {
  getAll: async (status?: DownloadStatus): Promise<DownloadsListResponse> => {
    const response = await apiClient.get<ApiDownloadsResponse>("/downloads", {
      params: { status },
    });

    return {
      success: response.data.success,
      count: response.data.count,
      downloads: response.data.downloads.map(mapDownload),
    };
  },

  getOne: async (hash: string): Promise<Download> => {
    const response = await apiClient.get<ApiDownload>(`/downloads/${hash}`);
    return mapDownload(response.data);
  },

  delete: async (hash: string, deleteFiles = false): Promise<void> => {
    await apiClient.delete(`/downloads/${hash}`, {
      data: { delete_files: deleteFiles },
    });
  },

  processCompleted: async (): Promise<{
    success: boolean;
    processedCount: number;
    scannedPlex: boolean;
    removedTorrents: string[];
  }> => {
    const response = await apiClient.post<{
      success: boolean;
      processed_count: number;
      scanned_plex: boolean;
      removed_torrents: string[];
    }>("/process-completed");

    return {
      success: response.data.success,
      processedCount: response.data.processed_count,
      scannedPlex: response.data.scanned_plex,
      removedTorrents: response.data.removed_torrents,
    };
  },

  scanPlexLibrary: async (): Promise<{
    success: boolean;
    scannedSections: string[];
    message: string;
  }> => {
    const response = await apiClient.post<{
      success: boolean;
      scanned_sections: string[];
      message: string;
    }>("/scan-plex");

    return {
      success: response.data.success,
      scannedSections: response.data.scanned_sections,
      message: response.data.message,
    };
  },
};
