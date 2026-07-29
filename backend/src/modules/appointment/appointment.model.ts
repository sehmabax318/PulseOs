import mongoose, { Schema, Document } from "mongoose";

export enum AppointmentStatus {
  PENDING = "pending",
  APPROVED = "approved",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export interface IAppointment extends Document {
  patient: mongoose.Types.ObjectId;
  doctor?: mongoose.Types.ObjectId;

  appointmentDate: Date;
  department: string;
  reason: string;

  queueNumber: number;

  status: AppointmentStatus;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
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
      default: AppointmentStatus.PENDING,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model<IAppointment>("Appointment", AppointmentSchema);

export default Appointment;