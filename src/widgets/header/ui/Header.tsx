import type { FC } from "react";
import { Link, useLocation } from "react-router-dom";

import { useScanPlexLibrary } from "@/entities/download";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib";
import { ROUTES } from "@/shared/config";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const NavLink: FC<NavLinkProps> = ({ to, children, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative",
        "border-b-2 border-transparent",
        isActive
          ? "text-primary-400 border-b-primary-500 bg-primary-600/10"
          : "text-surface-400 hover:text-surface-100 hover:bg-surface-800/50"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {icon}
      {children}
    </Link>
  );
};

export const Header: FC = () => {
  const scanPlexMutation = useScanPlexLibrary();

  const handleScanPlex = () => {
    scanPlexMutation.mutate(undefined, {
      onSuccess: (data) => {
        if (data.success) {
          alert(`Plex library scan started successfully!\nScanned sections: ${data.scannedSections.join(", ")}`);
        } else {
          alert(`Failed to scan Plex library: ${data.message}`);
        }
      },
      onError: (error) => {
        alert(`Error scanning Plex library: ${error instanceof Error ? error.message : "Unknown error"}`);
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-surface-950/80 backdrop-blur-xl border-b border-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          <Link to={ROUTES.HOME} className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-surface-100">Media Manager</h1>
              <p className="text-xs text-surface-500">Plex + Prowlarr</p>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleScanPlex}
              isLoading={scanPlexMutation.isPending}
              leftIcon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              }
              className="hidden sm:inline-flex"
              title="Scan Plex Library"
            >
              Scan Plex
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleScanPlex}
              isLoading={scanPlexMutation.isPending}
              className="sm:hidden p-2"
              title="Scan Plex Library"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </Button>

            {/* Разделитель между кнопкой действия и навигацией */}
            <div className="h-6 w-px bg-surface-700" aria-hidden="true" />

            <nav className="flex items-center gap-1 sm:gap-2" aria-label="Main navigation">
              <NavLink
                to={ROUTES.SEARCH}
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
              >
                <span className="hidden sm:inline">Search</span>
              </NavLink>
              <NavLink
                to={ROUTES.DOWNLOADS}
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                }
              >
                <span className="hidden sm:inline">Downloads</span>
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
