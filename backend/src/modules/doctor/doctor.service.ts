import Appointment, {
  AppointmentStatus,
} from "../appointment/appointment.model";

class DoctorService {
  /**
   * Get Today's Queue
   */
  async getTodayQueue(doctorId: string) {
    const appointments = await Appointment.find({
      doctor: doctorId,
      status: AppointmentStatus.CHECKED_IN,
    })
      .sort({
        queueNumber: 1,
      })
      .populate("patient", "name email phone");

    return {
      success: true,
      queue: appointments,
    };
  }

  /**
   * Start Consultation
   */
  async startConsultation(
    appointmentId: string,
    doctorId: string
  ) {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    // Ownership check
    if (
      !appointment.doctor ||
      appointment.doctor.toString() !== doctorId
    ) {
      throw new Error(
        "You are not authorized to access this appointment."
      );
    }

    // Status validation
    if (appointment.status !== AppointmentStatus.CHECKED_IN) {
      throw new Error(
        "Only checked-in appointments can be started."
      );
    }

    appointment.status = AppointmentStatus.IN_CONSULTATION;
    appointment.consultationStartedAt = new Date();

    await appointment.save();

    await appointment.populate("patient", "name email phone");
    await appointment.populate("doctor", "name");

    return {
      success: true,
      message: "Consultation started successfully.",
      appointment,
    };
  }

  /**
   * Complete Consultation
   */
  async completeConsultation(
    appointmentId: string,
    doctorId: string
  ) {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    // Ownership check
    if (
      !appointment.doctor ||
      appointment.doctor.toString() !== doctorId
    ) {
      throw new Error(
        "You are not authorized to access this appointment."
      );
    }

    // Status validation
    if (
      appointment.status !== AppointmentStatus.IN_CONSULTATION
    ) {
      throw new Error(
        "Only active consultations can be completed."
      );
    }

    appointment.status = AppointmentStatus.COMPLETED;
    appointment.completedAt = new Date();

    await appointment.save();

    await appointment.populate("patient", "name email phone");
    await appointment.populate("doctor", "name");

    return {
      success: true,
      message: "Consultation completed successfully.",
      appointment,
    };
  }
}

export default new DoctorService();