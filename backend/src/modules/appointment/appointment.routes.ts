import { Router } from "express";
import { roleMiddleware } from "../../middleware/role.middleware";
import { authMiddleware } from "../../middleware/auth.middleware";
import AppointmentController from "./appointment.controller";

const router = Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("patient"),
  (req, res) => AppointmentController.createAppointment(req, res)
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("receptionist", "doctor", "admin"),
  (req, res) => AppointmentController.getAppointments(req, res)
);

export default router;