import { motion } from "framer-motion";
import type { FC } from "react";

import { cn } from "@/shared/lib";
import { Badge, Card } from "@/shared/ui";

import type { Torrent, VideoQuality } from "../model/types";

interface TorrentCardProps {
  torrent: Torrent;
  onDownload?: (torrent: Torrent) => void;
  isDownloading?: boolean;
}

// Функция для определения варианта бейджа качества
function getQualityBadgeVariant(quality: VideoQuality): "info" | "success" | "warning" | "accent" | "default" {
  switch (quality) {
    case "4K":
      return "info";
    case "Remux":
      return "success";
    case "1080p":
    case "BluRay":
      return "accent";
    case "WEB-DL":
      return "warning";
    case "720p":
    default:
      return "default";
  }
}

export const TorrentCard: FC<TorrentCardProps> = ({
  torrent,
  onDownload,
  isDownloading,
}) => {
  const hasNoSeeders = torrent.seeders === 0;
  const hasLowSeeders = torrent.seeders > 0 && torrent.seeders < 3;

  return (
    <Card 
      variant="interactive" 
      className={cn(
        "group",
        hasNoSeeders && "border-red-500/30 bg-red-500/5",
        hasLowSeeders && "border-yellow-500/30 bg-yellow-500/5"
      )}
    >
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {torrent.posterUrl && (
          <div className="flex-shrink-0 flex justify-center sm:justify-start">
            <img
              src={torrent.posterUrl}
              alt={torrent.title}
              className="w-16 h-24 sm:w-20 sm:h-28 object-cover rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
        )}
        <div className="flex flex-col gap-2 sm:gap-3 flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 sm:gap-4">
            <h3 className="text-sm font-medium text-surface-100 line-clamp-2 flex-1">
              {torrent.title}
            </h3>
            <div className="flex flex-wrap gap-1.5 flex-shrink-0 justify-end">
              {torrent.category && torrent.category !== "Unknown" && (
                <Badge variant={getQualityBadgeVariant(torrent.category)}>
                  {torrent.category}
                </Badge>
              )}
              {torrent.isAtmos && <Badge variant="accent">Atmos</Badge>}
            </div>
          </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-surface-400">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {torrent.size}
          </span>
          <span className={cn(
            "flex items-center gap-1 font-medium",
            hasNoSeeders ? "text-red-400" : hasLowSeeders ? "text-yellow-400" : "text-green-400"
          )}>
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" transform="rotate(-90 12 12)" />
            </svg>
            {torrent.seeders} сидов
          </span>
          <span className="flex items-center gap-1 text-blue-400">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" transform="rotate(90 12 12)" />
            </svg>
            {torrent.leechers} пиров
          </span>
        </div>

        {hasNoSeeders && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg"
          >
            <p className="text-xs text-red-400 flex items-center gap-1.5">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Нет раздающих! Загрузка невозможна.
            </p>
          </motion.div>
        )}

        {hasLowSeeders && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg"
          >
            <p className="text-xs text-yellow-400 flex items-center gap-1.5">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Мало раздающих. Скорость может быть низкой.
            </p>
          </motion.div>
        )}

        {onDownload && (
          <button
            onClick={() => onDownload(torrent)}
            disabled={isDownloading || hasNoSeeders}
            className={cn(
              "mt-1 w-full py-2 px-3 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2",
              hasNoSeeders 
                ? "bg-surface-700 cursor-not-allowed opacity-50" 
                : "bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {isDownloading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Добавление...
              </>
            ) : hasNoSeeders ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                Недоступно
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Скачать
              </>
            )}
          </button>
        )}
        </div>
      </div>
    </Card>
  );
};
