import crypto from "crypto";
import QRCode from "qrcode";
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
    // Generate Queue Number
    const queueNumber =
      (await Appointment.countDocuments({
        appointmentDate: data.appointmentDate,
        department: data.department,
      })) + 1;

    // Generate Appointment ID
    const appointmentId =
      "APT-" + Date.now().toString().slice(-6);

    // Generate Secure Token
    const qrToken = crypto.randomBytes(32).toString("hex");
console.log("Appointment Request Body:", data);
console.log("Doctor ID:", data.doctorId);
    // Create Appointment
   const appointment = await Appointment.create({
  appointmentId,
  patient: patientId,
  doctor: data.doctorId,

  appointmentDate: data.appointmentDate,
  appointmentTime: data.appointmentTime,

  department: data.department,
  reason: data.reason,

  queueNumber,
  qrToken,
});
    // Generate QR Image
    const qrCode = await QRCode.toDataURL(qrToken);

    return {
      success: true,
      message: "Appointment created successfully",
      appointment,
      qrCode,
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