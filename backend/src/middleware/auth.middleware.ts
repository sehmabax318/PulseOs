import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserRole } from "../models/user.model";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("=================================");
    console.log("AUTH HEADER:", authHeader);
    console.log("JWT SECRET:", process.env.JWT_SECRET);
    console.log("=================================");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as {
      id: string;
      role: UserRole;
    };

    console.log("JWT VERIFIED ✅");
    console.log(decoded);

    console.log("req.user before next:", {
  id: decoded.id,
  role: decoded.role,
});

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (err) {
    console.log("JWT ERROR:", err);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};