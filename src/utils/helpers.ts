// ---------------------------------------------------------------------------
// Utility Helpers — PulseOS
// ---------------------------------------------------------------------------

/**
 * Format a date string into a human-readable format.
 */
export function formatDate(
  date: string | Date,
  options?: Intl.DateTimeFormatOptions,
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  };

  return new Intl.DateTimeFormat("en-US", defaultOptions).format(
    typeof date === "string" ? new Date(date) : date,
  );
}

/**
 * Format a date string to include time.
 */
export function formatDateTime(date: string | Date): string {
  return formatDate(date, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Get initials from a name (first + last).
 */
export function getInitials(firstName: string, lastName?: string): string {
  const first = firstName?.charAt(0)?.toUpperCase() ?? "";
  const last = lastName?.charAt(0)?.toUpperCase() ?? "";
  return `${first}${last}`;
}

/**
 * Async sleep utility (useful for development/testing).
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate a random ID string.
 */
export function generateId(): string {
  return crypto.randomUUID();
}

/**
 * Truncate a string to a maximum length with ellipsis.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}…`;
}

/**
 * Debounce a function call.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Safely parse JSON with a fallback value.
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * Check if code is running on the client side.
 */
export function isClient(): boolean {
  return typeof window !== "undefined";
}
