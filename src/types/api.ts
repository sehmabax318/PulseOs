// ---------------------------------------------------------------------------
// API-specific Types — PulseOS
// ---------------------------------------------------------------------------

import type { AxiosError } from "axios";

/**
 * Shape of error responses from the API.
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  statusCode: number;
}

/**
 * Typed Axios error with our API error shape.
 */
export type ApiError = AxiosError<ApiErrorResponse>;

/**
 * Standard API response wrapper (re-exported for convenience).
 */
export type { ApiResponse, PaginatedResponse } from "./index";

/**
 * Login request payload.
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Login response payload.
 */
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * Token refresh request payload.
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Query parameters for paginated list endpoints.
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
