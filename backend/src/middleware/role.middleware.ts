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

    // Normalize values
    const userRole = String(req.user.role).trim().toLowerCase();
    const roles = allowedRoles.map((role) =>
      String(role).trim().toLowerCase()
    );

    console.log("\n========== ROLE MIDDLEWARE ==========");
    console.log("Allowed Roles:", roles);
    console.log("Received Role:", JSON.stringify(userRole));
    console.log("Allowed Role:", JSON.stringify(roles[0]));
    console.log("Received Length:", userRole.length);
    console.log("Allowed Length:", roles[0].length);
    console.log(
      "Received Char Codes:",
      [...userRole].map((c) => c.charCodeAt(0))
    );
    console.log(
      "Allowed Char Codes:",
      [...roles[0]].map((c) => c.charCodeAt(0))
    );
    console.log("includes():", roles.includes(userRole));
    console.log("=====================================\n");

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You don't have permission.",
      });
    }

    next();
  };