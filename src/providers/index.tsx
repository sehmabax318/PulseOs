"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { QueryProvider } from "./query-provider";

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Composed provider tree for the entire application.
 * Order matters — outermost providers are initialized first.
 *
 * Add new providers here as the application grows:
 * - AuthProvider
 * - SocketProvider
 * - NotificationProvider
 * - etc.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
}
