import { NextFunction, Request, Response } from "express";

export const roleMiddleware =
  (...allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userRole = String(req.user.role).trim().toLowerCase();
    const roles = allowedRoles.map((role) =>
      String(role).trim().toLowerCase()
    );

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You don't have permission.",
      });
    }

    next();
  };