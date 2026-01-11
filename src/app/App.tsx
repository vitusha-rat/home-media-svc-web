import type { FC } from "react";

import { AppRouter, QueryProvider, CertificateCheckProvider } from "./providers";

export const App: FC = () => {
  return (
    <CertificateCheckProvider>
      <QueryProvider>
        <AppRouter />
      </QueryProvider>
    </CertificateCheckProvider>
  );
};
