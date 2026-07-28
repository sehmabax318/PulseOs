import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from "axios";
import type { ApiResponse } from "@/types/api";

// ---------------------------------------------------------------------------
// Axios Instance
// ---------------------------------------------------------------------------

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30_000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ---------------------------------------------------------------------------
// Request Interceptor — attach auth token
// ---------------------------------------------------------------------------

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Retrieve token from storage (adapt when auth provider is wired up)
    const token =
      typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// ---------------------------------------------------------------------------
// Response Interceptor — normalize errors, handle 401
// ---------------------------------------------------------------------------

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;

      // Unauthorized — clear credentials and redirect to login
      if (status === 401) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("access_token");
          // Redirect will be handled by auth provider once added
        }
      }

      // Forbidden
      if (status === 403) {
        console.error("[API] Forbidden — insufficient permissions");
      }
    }

    return Promise.reject(error);
  },
);

// ---------------------------------------------------------------------------
// Typed Request Helpers
// ---------------------------------------------------------------------------

/**
 * Typed GET request.
 */
export async function apiGet<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  const response = await api.get<ApiResponse<T>>(url, config);
  return response.data;
}

/**
 * Typed POST request.
 */
export async function apiPost<T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  const response = await api.post<ApiResponse<T>>(url, data, config);
  return response.data;
}

/**
 * Typed PUT request.
 */
export async function apiPut<T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  const response = await api.put<ApiResponse<T>>(url, data, config);
  return response.data;
}

/**
 * Typed PATCH request.
 */
export async function apiPatch<T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  const response = await api.patch<ApiResponse<T>>(url, data, config);
  return response.data;
}

/**
 * Typed DELETE request.
 */
export async function apiDelete<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  const response = await api.delete<ApiResponse<T>>(url, config);
  return response.data;
}

export default api;
