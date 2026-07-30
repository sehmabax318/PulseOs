import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";
import ReceptionistController from "./receptionist.controller";

const router = Router();

/**
 * Verify QR
 */
router.post(
  "/verify-qr",
  authMiddleware,
  roleMiddleware("receptionist"),
  (req, res) => ReceptionistController.verifyQR(req, res)
);

/**
 * Check-In Patient
 */
router.patch(
  "/check-in/:id",
  authMiddleware,
  roleMiddleware("receptionist"),
  (req, res) => ReceptionistController.checkInPatient(req, res)
);

/**
 * Waiting Queue
 */
router.get(
  "/queue",
  authMiddleware,
  roleMiddleware("receptionist"),
  (req, res) => ReceptionistController.getQueue(req, res)
);

export default router;