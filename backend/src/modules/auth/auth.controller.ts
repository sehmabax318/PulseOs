import { Request, Response, NextFunction } from "express";
import AuthService from "./auth.service";
import { registerSchema, loginSchema } from "./auth.validator";

class AuthController {
  /**
   * Register User
   */
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      // Validate request
      const validatedData = registerSchema.parse(req.body);

      // Register user
      const result = await AuthService.register(validatedData);

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Login User
   */
  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      // Validate request
      const validatedData = loginSchema.parse(req.body);

      // Login user
      const result = await AuthService.login(validatedData);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();