"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

/**
 * Global error boundary.
 * Catches runtime errors and provides a retry mechanism.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("[PulseOS Error]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6">
      {/* Icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
        <AlertTriangle className="h-8 w-8 text-destructive" strokeWidth={1.5} />
      </div>

      {/* Text */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground">
          Something went wrong
        </h2>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          An unexpected error occurred. Please try again or contact support if
          the problem persists.
        </p>
      </div>

      {/* Retry button */}
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110 active:scale-[0.98]"
      >
        <RotateCcw className="h-4 w-4" />
        Try Again
      </button>
    </div>
  );
}
