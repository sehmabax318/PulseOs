import { z } from "zod";

export const updatePatientSchema = z.object({
  name: z.string().min(3).optional(),

  phone: z.string().optional(),

  avatar: z.string().optional(),
});