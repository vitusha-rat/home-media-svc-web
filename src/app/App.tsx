import type { FC } from "react";

import { AppRouter, QueryProvider } from "./providers";

export const App: FC = () => {
  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  );
};
