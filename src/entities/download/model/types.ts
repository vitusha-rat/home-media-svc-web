export type DownloadStatus =
  | "queued"
  | "downloading"
  | "paused"
  | "completed"
  | "seeding"
  | "error"
  | "stalled"
  | "checking"
  | "moving";

export interface Download {
  hash: string;
  name: string;
  size: number;
  sizeFormatted: string;
  progress: number;
  status: DownloadStatus;
  downloadSpeed: number;
  downloadSpeedFormatted: string;
  uploadSpeed: number;
  uploadSpeedFormatted: string;
  eta: number | null;
  etaFormatted: string;
  addedOn: string | null;
  isComplete: boolean;
  seeds: number;
  peers: number;
  tracker: string;
  savePath: string;
  downloaded: number;
  downloadedFormatted: string;
  uploaded: number;
  uploadedFormatted: string;
  ratio: number;
  availability: number;
  timeActive: number;
  timeActiveFormatted: string;
  // Информация о перемещении
  isMoving?: boolean;
  moveProgress?: number;
  moveDestination?: string | null;
}

export interface DownloadsListResponse {
  success: boolean;
  count: number;
  downloads: Download[];
}
