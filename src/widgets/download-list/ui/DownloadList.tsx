import { AnimatePresence } from "framer-motion";
import type { FC } from "react";

import { DownloadItem, useDeleteDownload, useDownloads } from "@/entities/download";
import { LoadingOverlay } from "@/shared/ui";

export const DownloadList: FC = () => {
  const { data, isLoading, error } = useDownloads();
  const deleteMutation = useDeleteDownload();

  const handleDelete = (hash: string) => {
    deleteMutation.mutate({ hash, deleteFiles: false });
  };

  if (isLoading && !data) {
    return <LoadingOverlay message="Загрузка..." />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-red-400 px-4">
        <svg className="w-12 h-12 sm:w-16 sm:h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="text-base sm:text-lg text-center">Не удалось загрузить загрузки</p>
        <p className="text-xs sm:text-sm mt-1 text-surface-500 text-center">
          Убедитесь, что клиент загрузок запущен
        </p>
      </div>
    );
  }

  const downloads = data?.downloads || [];

  if (downloads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-surface-500 px-4">
        <svg className="w-12 h-12 sm:w-16 sm:h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <p className="text-base sm:text-lg text-center">Загрузок пока нет</p>
        <p className="text-xs sm:text-sm mt-1 text-center">Найдите торренты и начните загрузку</p>
      </div>
    );
  }

  const activeDownloads = downloads.filter((d) => !d.isComplete);
  const completedDownloads = downloads.filter((d) => d.isComplete);

  return (
    <div className="space-y-4 sm:space-y-6">
      {activeDownloads.length > 0 && (
        <section>
          <h2 className="text-xs sm:text-sm font-medium text-surface-400 mb-2 sm:mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Активные ({activeDownloads.length})
          </h2>
          <div className="space-y-2 sm:space-y-3">
            <AnimatePresence>
              {activeDownloads.map((download) => (
                <DownloadItem
                  key={download.hash}
                  download={download}
                  onDelete={handleDelete}
                  isDeleting={deleteMutation.isPending}
                />
              ))}
            </AnimatePresence>
          </div>
        </section>
      )}

      {completedDownloads.length > 0 && (
        <section>
          <h2 className="text-xs sm:text-sm font-medium text-surface-400 mb-2 sm:mb-3">
            Завершённые ({completedDownloads.length})
          </h2>
          <div className="space-y-2 sm:space-y-3">
            <AnimatePresence>
              {completedDownloads.map((download) => (
                <DownloadItem
                  key={download.hash}
                  download={download}
                  onDelete={handleDelete}
                  isDeleting={deleteMutation.isPending}
                />
              ))}
            </AnimatePresence>
          </div>
        </section>
      )}
    </div>
  );
};
