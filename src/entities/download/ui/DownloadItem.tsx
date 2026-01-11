import { motion } from "framer-motion";
import type { FC } from "react";

import { Badge, Card, Progress } from "@/shared/ui";

import type { Download, DownloadStatus } from "../model/types";

interface DownloadItemProps {
  download: Download;
  onDelete?: (hash: string) => void;
  isDeleting?: boolean;
}

const statusConfig: Record<DownloadStatus, { label: string; variant: "default" | "success" | "warning" | "error" | "info" }> = {
  queued: { label: "В очереди", variant: "default" },
  downloading: { label: "Загрузка", variant: "info" },
  paused: { label: "Пауза", variant: "warning" },
  completed: { label: "Завершено", variant: "success" },
  seeding: { label: "Раздача", variant: "success" },
  error: { label: "Ошибка", variant: "error" },
  stalled: { label: "Застопорено", variant: "warning" },
  checking: { label: "Проверка", variant: "default" },
  moving: { label: "Перемещение", variant: "info" },
};

export const DownloadItem: FC<DownloadItemProps> = ({
  download,
  onDelete,
  isDeleting,
}) => {
  const config = statusConfig[download.status];
  const isError = download.status === "error";
  const isDownloading = download.status === "downloading";
  const isSeeding = download.status === "seeding";
  const isStalled = download.status === "stalled";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className="group">
        <div className="flex flex-col gap-2 sm:gap-3">
          <div className="flex items-start justify-between gap-2 sm:gap-4">
            <h3 className="text-xs sm:text-sm font-medium text-surface-100 line-clamp-2 flex-1">
              {download.name}
            </h3>
            <Badge variant={config.variant} className="text-xs flex-shrink-0">{config.label}</Badge>
          </div>

          <Progress value={download.progress} size="md" />
          
          {download.isMoving && download.moveProgress !== undefined && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-surface-400">
                <span>Перемещение:</span>
                <span className="text-surface-200">{download.moveProgress.toFixed(1)}%</span>
              </div>
              <Progress value={download.moveProgress} size="sm" className="h-1" />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-surface-400">
            <div className="flex justify-between">
              <span>Прогресс:</span>
              <span className="text-surface-200">{download.progress.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Размер:</span>
              <span className="text-surface-200">{download.sizeFormatted}</span>
            </div>
            <div className="flex justify-between">
              <span>Скачано:</span>
              <span className="text-surface-200">{download.downloadedFormatted}</span>
            </div>
            <div className="flex justify-between">
              <span>Отдано:</span>
              <span className="text-surface-200">{download.uploadedFormatted}</span>
            </div>
            <div className="flex justify-between">
              <span>Сиды:</span>
              <span className="text-green-400">{download.seeds}</span>
            </div>
            <div className="flex justify-between">
              <span>Пиры:</span>
              <span className="text-blue-400">{download.peers}</span>
            </div>
            {(isDownloading || isStalled) && (
              <>
                <div className="flex justify-between">
                  <span>Скорость:</span>
                  <span className="text-green-400">↓ {download.downloadSpeedFormatted}</span>
                </div>
                <div className="flex justify-between">
                  <span>ETA:</span>
                  <span className="text-surface-200">{download.etaFormatted}</span>
                </div>
              </>
            )}
            {isSeeding && (
              <>
                <div className="flex justify-between">
                  <span>Отдача:</span>
                  <span className="text-blue-400">↑ {download.uploadSpeedFormatted}</span>
                </div>
                <div className="flex justify-between">
                  <span>Рейтинг:</span>
                  <span className="text-surface-200">{download.ratio.toFixed(2)}</span>
                </div>
              </>
            )}
            <div className="flex justify-between">
              <span>Активен:</span>
              <span className="text-surface-200">{download.timeActiveFormatted}</span>
            </div>
            <div className="flex justify-between">
              <span>Доступность:</span>
              <span className={download.availability >= 1 ? "text-green-400" : "text-yellow-400"}>
                {(download.availability * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          {isError && (
            <div className="mt-1 p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-xs text-red-400">
                Ошибка загрузки. Проверьте доступность сидов ({download.seeds}) и трекера.
              </p>
              {download.tracker && (
                <p className="text-xs text-surface-500 mt-1 truncate">
                  Трекер: {download.tracker}
                </p>
              )}
            </div>
          )}

          {isStalled && download.seeds === 0 && (
            <div className="mt-1 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-xs text-yellow-400">
                Нет доступных сидов. Загрузка приостановлена.
              </p>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-surface-800 gap-2">
            <span className="text-xs text-surface-500 truncate flex-1 min-w-0" title={download.savePath}>
              {download.savePath}
            </span>

            {onDelete && (
              <button
                onClick={() => onDelete(download.hash)}
                disabled={isDeleting}
                className="p-1.5 text-surface-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 disabled:opacity-50"
                title="Удалить"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
