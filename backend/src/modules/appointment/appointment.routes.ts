import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import AppointmentController from "./appointment.controller";

const router = Router();

router.post(
  "/",
  authMiddleware,
  (req, res) => AppointmentController.createAppointment(req, res)
);

router.get("/", (req, res) =>
  AppointmentController.getAppointments(req, res)
);

router.patch("/:id", (req, res) =>
  AppointmentController.updateStatus(req, res)
);

export default router;