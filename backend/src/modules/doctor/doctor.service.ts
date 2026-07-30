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
  async startConsultation(appointmentId: string) {
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        status: AppointmentStatus.IN_CONSULTATION,
        consultationStartedAt: new Date(),
      },
      {
        new: true,
      }
    )
      .populate("patient", "name email phone")
      .populate("doctor", "name");

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    return {
      success: true,
      message: "Consultation started",
      appointment,
    };
  }

  /**
   * Complete Consultation
   */
  async completeConsultation(appointmentId: string) {
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        status: AppointmentStatus.COMPLETED,
        completedAt: new Date(),
      },
      {
        new: true,
      }
    )
      .populate("patient", "name email phone")
      .populate("doctor", "name");

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    return {
      success: true,
      message: "Consultation completed",
      appointment,
    };
  }
}

export default new DoctorService();