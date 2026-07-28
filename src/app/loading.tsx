import { Activity } from "lucide-react";

/**
 * Global loading state shown during route transitions.
 * Uses the PulseOS branding with a subtle animation.
 */
export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
      <div className="relative">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Activity className="h-8 w-8 animate-pulse text-primary" strokeWidth={1.5} />
        </div>
        {/* Outer pulse ring */}
        <div className="absolute -inset-2 animate-ping rounded-3xl border border-primary/10" />
      </div>
      <p className="text-sm font-medium text-muted-foreground animate-pulse">
        Loading…
      </p>
    </div>
  );
}
