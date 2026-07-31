import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";
import PatientController from "./patient.controller";


const router = Router();

/**
 * Get Patient Profile
 */
router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("patient"),
  (req, res) => PatientController.getProfile(req, res)
);

/**
 * Update Patient Profile
 */
router.patch(
  "/profile",
  authMiddleware,
  roleMiddleware("patient"),
  (req, res) => PatientController.updateProfile(req, res)
);

/**
 * Get My Appointments
 */
router.get(
  "/appointments",
  authMiddleware,
  roleMiddleware("patient"),
  (req, res) => PatientController.getAppointments(req, res)
);

/**
 * Get Appointment Details
 */
router.get(
  "/appointments/:id",
  authMiddleware,
  roleMiddleware("patient"),
  (req, res) => PatientController.getAppointmentById(req, res)
);

export default router;