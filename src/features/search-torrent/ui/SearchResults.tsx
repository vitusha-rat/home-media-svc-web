import { AnimatePresence, motion } from "framer-motion";
import type { FC } from "react";

import type { Torrent } from "@/entities/torrent";
import { TorrentCard } from "@/entities/torrent";
import { LoadingOverlay } from "@/shared/ui";

interface SearchResultsProps {
  torrents: Torrent[];
  count: number;
  isLoading: boolean;
  hasSearched: boolean;
  onDownload: (torrent: Torrent) => void;
  downloadingId: string | null;
}

export const SearchResults: FC<SearchResultsProps> = ({
  torrents,
  count,
  isLoading,
  hasSearched,
  onDownload,
  downloadingId,
}) => {
  if (isLoading) {
    return <LoadingOverlay message="Searching..." />;
  }

  if (!hasSearched) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-surface-500 px-4">
        <svg className="w-12 h-12 sm:w-16 sm:h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p className="text-base sm:text-lg text-center">Enter a search query to find torrents</p>
        <p className="text-xs sm:text-sm mt-1 text-center">Minimum 2 characters required</p>
      </div>
    );
  }

  if (torrents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-surface-500 px-4">
        <svg className="w-12 h-12 sm:w-16 sm:h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
        <p className="text-base sm:text-lg text-center">No results found</p>
        <p className="text-xs sm:text-sm mt-1 text-center">Try a different search query</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      <p className="text-xs sm:text-sm text-surface-400">
        Found {count} result{count !== 1 ? "s" : ""}
      </p>
      <motion.div
        className="grid gap-2 sm:gap-3"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
      >
        <AnimatePresence>
          {torrents.map((torrent) => (
            <motion.div
              key={torrent.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <TorrentCard
                torrent={torrent}
                onDownload={onDownload}
                isDownloading={downloadingId === torrent.id}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
