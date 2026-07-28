import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { env } from "./config/env";
import routes from "./routes";
import {
  notFoundHandler,
  errorHandler,
} from "./middleware/error.middleware";

const app = express();

// ===============================
// CORS Configuration
// ===============================
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

// ===============================
// Built-in Middleware
// ===============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ===============================
// API Routes
// ===============================
app.use("/api/v1", routes);

// ===============================
// Error Handling Middleware
// ===============================
app.use(notFoundHandler);
app.use(errorHandler);

export default app;