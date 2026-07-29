import { z } from "zod";
import { UserRole } from "../../models/user.model";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  role: z.enum([
    UserRole.DOCTOR,
    UserRole.RECEPTIONIST,
    UserRole.ADMIN,
  ]),

  phone: z
    .string()
    .optional(),

  avatar: z
    .string()
    .optional(),
});

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2)
    .optional(),

  phone: z
    .string()
    .optional(),

  avatar: z
    .string()
    .optional(),

  isActive: z
    .boolean()
    .optional(),
});