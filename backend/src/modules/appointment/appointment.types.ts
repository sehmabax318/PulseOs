export interface CreateAppointmentDto {
  appointmentDate: Date;
  department: string;
  reason: string;
}

export interface UpdateAppointmentStatusDto {
  status: "approved" | "completed" | "cancelled";
  doctorId?: string;
}

export interface AppointmentResponse {
  success: boolean;
  message: string;
  appointment?: unknown;
}