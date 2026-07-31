import { z } from "zod";

export const createAppointmentSchema = z.object({
  doctorId: z.string().min(1, "Doctor is required"),

  appointmentDate: z.coerce.date(),

  appointmentTime: z
    .string()
    .min(1, "Appointment time is required"),

  department: z
    .string()
    .min(2, "Department is required"),

  reason: z
    .string()
    .min(5, "Reason must be at least 5 characters"),
});

export const updateAppointmentStatusSchema = z.object({
  status: z.enum([
    "approved",
    "completed",
    "cancelled",
  ]),

  doctorId: z.string().optional(),
});