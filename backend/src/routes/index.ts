import { Router } from "express";

import patientRoutes from "../modules/patient";
import doctorRoutes from "../modules/doctor";
import receptionistRoutes from "../modules/receptionist";
import authRoutes from "../modules/auth/auth.routes";
import appointmentRoutes from "../modules/appointment";
import adminRoutes from "../modules/admin";   // <-- ADD THIS

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "PulseOS Backend Running 🚀",
  });
});

// Authentication
router.use("/auth", authRoutes);

// Appointments
router.use("/appointments", appointmentRoutes);

// Admin
router.use("/admin", adminRoutes);   // <-- ADD THIS

router.use("/receptionist", receptionistRoutes);
router.use("/doctor", doctorRoutes);

router.use("/patient", patientRoutes);
export default router;