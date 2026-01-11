import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { FC, ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
    },
    mutations: {
      retry: 0,
    },
  },
});

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
