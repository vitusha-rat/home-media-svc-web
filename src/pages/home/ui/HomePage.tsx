import { motion } from "framer-motion";
import type { FC } from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "@/shared/config";
import { Card, CardContent } from "@/shared/ui";

export const HomePage: FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-surface-100 mb-3 sm:mb-4">
          Добро пожаловать в Media Manager
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-surface-400 max-w-2xl mx-auto px-2">
          Ищите фильмы и сериалы в различных торрент-индексерах, скачивайте их через клиент загрузок
          и управляйте библиотекой Plex — всё в одном месте.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid sm:grid-cols-2 gap-4 sm:gap-6"
      >
        <Link to={ROUTES.SEARCH}>
          <Card variant="interactive" className="h-full">
            <CardContent className="flex flex-col items-center text-center py-6 sm:py-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-600/20 rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-surface-100 mb-2">
                Поиск торрентов
              </h2>
              <p className="text-sm sm:text-base text-surface-400 px-2">
                Найдите фильмы и сериалы с фильтрами Dolby Atmos и 4K качества
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to={ROUTES.DOWNLOADS}>
          <Card variant="interactive" className="h-full">
            <CardContent className="flex flex-col items-center text-center py-6 sm:py-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent-600/20 rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-surface-100 mb-2">
                Загрузки
              </h2>
              <p className="text-sm sm:text-base text-surface-400 px-2">
                Отслеживайте прогресс загрузки и управляйте очередью
              </p>
            </CardContent>
          </Card>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 sm:mt-12 text-center text-surface-500 text-xs sm:text-sm px-4"
      >
        <p>Управление медиа-библиотекой</p>
      </motion.div>
    </div>
  );
};
