import Appointment from "./appointment.model";
import {
  CreateAppointmentDto,
  UpdateAppointmentStatusDto,
} from "./appointment.types";

class AppointmentService {
  /**
   * Create Appointment
   */
  async createAppointment(
    patientId: string,
    data: CreateAppointmentDto
  ) {
    const appointment = await Appointment.create({
      patient: patientId,
      appointmentDate: data.appointmentDate,
      department: data.department,
      reason: data.reason,
    });

    return {
      success: true,
      message: "Appointment created successfully",
      appointment,
    };
  }

  /**
   * Get All Appointments
   */
  async getAppointments() {
    const appointments = await Appointment.find()
      .populate("patient", "name email phone")
      .populate("doctor", "name email");

    return {
      success: true,
      appointments,
    };
  }

  /**
   * Update Appointment Status
   */
  async updateStatus(
    appointmentId: string,
    data: UpdateAppointmentStatusDto
  ) {
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        status: data.status,
        doctor: data.doctorId,
      },
      {
        new: true,
      }
    );

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    return {
      success: true,
      message: "Appointment updated successfully",
      appointment,
    };
  }
}

export default new AppointmentService();