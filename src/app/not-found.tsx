import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";

/**
 * Custom 404 page with clean design and navigation back.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6">
      {/* Icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
        <FileQuestion className="h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
      </div>

      {/* Text */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-foreground">404</h1>
        <h2 className="mt-2 text-lg font-medium text-foreground">
          Page not found
        </h2>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>

      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110 active:scale-[0.98]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}
