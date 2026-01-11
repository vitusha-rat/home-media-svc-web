import type { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DownloadsPage } from "@/pages/downloads";
import { HomePage } from "@/pages/home";
import { SearchPage } from "@/pages/search";
import { ROUTES } from "@/shared/config";
import { Header } from "@/widgets/header";

export const AppRouter: FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface-950">
        <Header />
        <main>
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.SEARCH} element={<SearchPage />} />
            <Route path={ROUTES.DOWNLOADS} element={<DownloadsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};
