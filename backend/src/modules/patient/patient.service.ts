import User from "../../models/user.model";
import Appointment from "../appointment/appointment.model";
import { UpdatePatientDto } from "./patient.types";

class PatientService {
  /**
   * Get Patient Profile
   */
  async getProfile(patientId: string) {
    const patient = await User.findById(patientId).select("-password");

    if (!patient) {
      throw new Error("Patient not found");
    }

    return {
      success: true,
      patient,
    };
  }

  /**
   * Update Patient Profile
   */
  async updateProfile(
    patientId: string,
    data: UpdatePatientDto
  ) {
    const patient = await User.findByIdAndUpdate(
      patientId,
      data,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!patient) {
      throw new Error("Patient not found");
    }

    return {
      success: true,
      message: "Profile updated successfully.",
      patient,
    };
  }

  /**
   * Get My Appointments
   */
  async getAppointments(patientId: string) {
    const appointments = await Appointment.find({
      patient: patientId,
    })
      .populate("doctor", "name email")
      .sort({
        appointmentDate: -1,
      });

    return {
      success: true,
      appointments,
    };
  }

  /**
   * Get Appointment Details
   */
  async getAppointmentById(
    patientId: string,
    appointmentId: string
  ) {
    const appointment = await Appointment.findOne({
      _id: appointmentId,
      patient: patientId,
    })
      .populate("doctor", "name email")
      .populate("patient", "name email phone");

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    return {
      success: true,
      appointment,
    };
  }
}

export default new PatientService();