import { Router } from "express";
import AuthController from "./auth.controller";

const router = Router();

// Register
router.post("/register", AuthController.register);

// Login
router.post("/login", AuthController.login);

export default router;