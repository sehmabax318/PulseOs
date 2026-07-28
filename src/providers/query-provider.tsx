"use client";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * TanStack Query provider with sensible defaults for a healthcare SaaS.
 * - 5 minute stale time (data stays fresh longer, reducing unnecessary refetches)
 * - 1 retry on failure
 * - No refetch on window focus (prevents unexpected data refreshes in clinical contexts)
 */
export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            retry: 1,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
          },
          mutations: {
            retry: 0,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
