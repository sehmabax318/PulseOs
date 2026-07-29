import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes";
import appointmentRoutes from "../modules/appointment";

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

export default router;