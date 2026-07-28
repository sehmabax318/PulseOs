// ---------------------------------------------------------------------------
// Core Application Types — PulseOS
// ---------------------------------------------------------------------------

/**
 * User roles for role-based access control (RBAC).
 * Extend as new roles are introduced.
 */
export enum Role {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  DOCTOR = "doctor",
  NURSE = "nurse",
  RECEPTIONIST = "receptionist",
  PATIENT = "patient",
  LAB_TECHNICIAN = "lab_technician",
  PHARMACIST = "pharmacist",
}

/**
 * Base user representation.
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  avatar?: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Pagination metadata returned by list endpoints.
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Standard API response wrapper.
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

/**
 * Paginated API response wrapper.
 */
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: PaginationMeta;
  message?: string;
}

/**
 * Generic ID type for flexibility (string UUID or number).
 */
export type ID = string;

/**
 * Timestamp fields shared across most entities.
 */
export interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

/**
 * Base entity with common fields.
 */
export interface BaseEntity extends Timestamps {
  id: ID;
}
