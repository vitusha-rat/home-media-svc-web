import type { FC } from "react";

import { DownloadList } from "@/widgets/download-list";

export const DownloadsPage: FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-surface-100">Downloads</h1>
        <p className="text-surface-400 mt-1">
          Monitor and manage your active downloads
        </p>
      </div>
      <DownloadList />
    </div>
  );
};
