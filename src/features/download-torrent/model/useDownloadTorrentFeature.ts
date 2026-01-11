import { useState } from "react";

import type { Torrent } from "@/entities/torrent";
import { useDownloadTorrent } from "@/entities/torrent";

export function useDownloadTorrentFeature() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const downloadMutation = useDownloadTorrent();

  const handleDownload = async (torrent: Torrent) => {
    setDownloadingId(torrent.id);

    try {
      await downloadMutation.mutateAsync({
        guid: torrent.id,
        indexer_id: torrent.indexerId ?? 1,
        title: torrent.title,
        size: torrent.sizeBytes,
        seeders: torrent.seeders,
        leechers: torrent.leechers,
        download_url: torrent.downloadUrl || null,
        info_url: torrent.url,
      });
    } finally {
      setDownloadingId(null);
    }
  };

  return {
    downloadingId,
    handleDownload,
    isDownloading: downloadMutation.isPending,
    error: downloadMutation.error,
  };
}
