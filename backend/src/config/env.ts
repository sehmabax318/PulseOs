import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) || 8000,

  NODE_ENV: process.env.NODE_ENV || "development",

  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb://localhost:27017/pulseos",

  JWT_SECRET:
    process.env.JWT_SECRET ||
    "replace_with_a_long_random_secret",

  CLIENT_URL:
    process.env.CLIENT_URL ||
    "http://localhost:3000",
};