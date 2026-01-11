import type { FC } from "react";

import { DownloadList } from "@/widgets/download-list";

export const DownloadsPage: FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-surface-100">Загрузки</h1>
        <p className="text-sm sm:text-base text-surface-400 mt-1">
          Отслеживайте и управляйте активными загрузками
        </p>
      </div>
      <DownloadList />
    </div>
  );
};
