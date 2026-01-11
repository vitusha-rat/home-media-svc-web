import { motion } from "framer-motion";
import type { FC } from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "@/shared/config";
import { Card, CardContent } from "@/shared/ui";

export const HomePage: FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-surface-100 mb-4">
          Welcome to Media Manager
        </h1>
        <p className="text-lg text-surface-400 max-w-2xl mx-auto">
          Search for movies and TV shows across multiple torrent indexers, download them via your download client,
          and manage your Plex library - all in one place.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <Link to={ROUTES.SEARCH}>
          <Card variant="interactive" className="h-full">
            <CardContent className="flex flex-col items-center text-center py-8">
              <div className="w-16 h-16 bg-primary-600/20 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-surface-100 mb-2">
                Search Torrents
              </h2>
              <p className="text-surface-400">
                Find movies and TV shows with Dolby Atmos and 4K quality filters
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to={ROUTES.DOWNLOADS}>
          <Card variant="interactive" className="h-full">
            <CardContent className="flex flex-col items-center text-center py-8">
              <div className="w-16 h-16 bg-accent-600/20 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-surface-100 mb-2">
                Downloads
              </h2>
              <p className="text-surface-400">
                Monitor download progress and manage your queue
              </p>
            </CardContent>
          </Card>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-12 text-center text-surface-500 text-sm"
      >
        <p>Powered by Prowlarr, Transmission/qBittorrent, and Plex</p>
      </motion.div>
    </div>
  );
};
