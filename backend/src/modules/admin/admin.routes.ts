import { Router } from "express";
import * as AdminController from "./admin.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleMiddleware } from "../../middleware/role.middleware";

const router = Router();

// Create Doctor / Receptionist / Admin
router.post(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  AdminController.createUser
);

// Get All Users
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  AdminController.getAllUsers
);

// Get User By ID
router.get(
  "/users/:id",
  authMiddleware,
  roleMiddleware("admin"),
  AdminController.getUserById
);

// Update User
router.patch(
  "/users/:id",
  authMiddleware,
  roleMiddleware("admin"),
  AdminController.updateUser
);

// Activate / Deactivate User
router.patch(
  "/users/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  AdminController.changeUserStatus
);

// Delete User
router.delete(
  "/users/:id",
  authMiddleware,
  roleMiddleware("admin"),
  AdminController.deleteUser
);

export default router;