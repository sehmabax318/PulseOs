import Appointment, {
  AppointmentStatus,
} from "../appointment/appointment.model";

class ReceptionistService {
  /**
   * Verify QR Token
   */
  async verifyQR(token: string) {
    const appointment = await Appointment.findOne({
      qrToken: token,
    })
      .populate("patient", "name email phone")
      .populate("doctor", "name");

    if (!appointment) {
      throw new Error("Invalid QR Code");
    }

    return {
      success: true,
      appointment,
    };
  }

  /**
   * Check-In Patient
   */
  async checkInPatient(appointmentId: string) {
    console.log("Received ID:", appointmentId, "Length:", appointmentId.length);
   const appointment = await Appointment.findOneAndUpdate(
  { _id: appointmentId },
      {
        status: AppointmentStatus.CHECKED_IN,
        checkedInAt: new Date(),
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
      message: "Patient checked in successfully",
      appointment,
    };
  }

  /**
   * Get Waiting Queue
   */
  async getQueue() {
    const appointments = await Appointment.find({
      status: AppointmentStatus.CHECKED_IN,
    })
      .sort({
        queueNumber: 1,
      })
      .populate("patient", "name")
      .populate("doctor", "name");

    return {
      success: true,
      queue: appointments,
    };
  }
}

export default new ReceptionistService();