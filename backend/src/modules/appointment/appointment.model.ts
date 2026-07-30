import mongoose, { Schema, Document } from "mongoose";
import crypto from "crypto";

export enum AppointmentStatus {
  BOOKED = "booked",
  CHECKED_IN = "checked_in",
  IN_CONSULTATION = "in_consultation",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export interface IAppointment extends Document {
  appointmentId: string;

  patient: mongoose.Types.ObjectId;
  doctor?: mongoose.Types.ObjectId;

  appointmentDate: Date;
  appointmentTime: string;

  department: string;
  reason: string;

  queueNumber: number;

  status: AppointmentStatus;

  qrToken?: string;

  checkedInAt?: Date;

  consultationStartedAt?: Date;

  completedAt?: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    appointmentId: {
      type: String,
      unique: true,
    },

    patient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    doctor: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    appointmentDate: {
      type: Date,
      required: true,
    },

    appointmentTime: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    reason: {
      type: String,
      required: true,
    },

    queueNumber: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: Object.values(AppointmentStatus),
      default: AppointmentStatus.BOOKED,
    },

    qrToken: {
      type: String,
      default: "",
    },

    checkedInAt: {
      type: Date,
    },

    consultationStartedAt: {
      type: Date,
    },

    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

AppointmentSchema.pre("save", async function () {
  if (!this.appointmentId) {
    this.appointmentId =
      "APT-" +
      crypto.randomBytes(3).toString("hex").toUpperCase();
  }
});

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model<IAppointment>("Appointment", AppointmentSchema);

export default Appointment;