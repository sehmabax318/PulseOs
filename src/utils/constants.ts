// ---------------------------------------------------------------------------
// Application Constants — PulseOS
// ---------------------------------------------------------------------------

/**
 * Application metadata.
 */
export const APP_NAME = "PulseOS";
export const APP_TAGLINE = "The Operating System for Connected Care";
export const APP_DESCRIPTION =
  "PulseOS is a modern healthcare platform that connects patients, doctors, and care teams for seamless, coordinated care.";
export const APP_VERSION = "0.1.0";

/**
 * Route definitions for the application.
 * Centralized to avoid magic strings throughout the codebase.
 */
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",

  // Role-based dashboards
  DASHBOARD: "/dashboard",
  ADMIN: "/admin",
  DOCTOR: "/doctor",
  PATIENT: "/patient",
  RECEPTIONIST: "/receptionist",
  NURSE: "/nurse",

  // Shared
  PROFILE: "/profile",
  SETTINGS: "/settings",
  NOTIFICATIONS: "/notifications",
} as const;

/**
 * API endpoint paths (appended to the base URL).
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
  },
  USERS: {
    LIST: "/users",
    DETAIL: (id: string) => `/users/${id}`,
  },
} as const;

/**
 * Local storage keys.
 */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  THEME: "theme",
  USER: "user",
} as const;

/**
 * Pagination defaults.
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  LIMITS: [10, 25, 50, 100],
} as const;

/**
 * Theme constants.
 */
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;
