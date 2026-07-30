import { AppointmentStatus } from "./appointment.model";

export interface CreateAppointmentDto {
  appointmentDate: Date;
  appointmentTime: string;
  department: string;
  reason: string;
}

export interface UpdateAppointmentStatusDto {
  status: AppointmentStatus;
  doctorId?: string;
}

export interface AppointmentResponse {
  success: boolean;
  message: string;
  appointment?: unknown;
}