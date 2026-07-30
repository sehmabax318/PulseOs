import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";
import DoctorController from "./doctor.controller";

const router = Router();

/**
 * Today's Queue
 */
router.get(
  "/queue",
  authMiddleware,
  roleMiddleware("doctor"),
  (req, res) => DoctorController.getTodayQueue(req, res)
);

/**
 * Start Consultation
 */
router.patch(
  "/start/:id",
  authMiddleware,
  roleMiddleware("doctor"),
  (req, res) => DoctorController.startConsultation(req, res)
);

/**
 * Complete Consultation
 */
router.patch(
  "/complete/:id",
  authMiddleware,
  roleMiddleware("doctor"),
  (req, res) => DoctorController.completeConsultation(req, res)
);

export default router;