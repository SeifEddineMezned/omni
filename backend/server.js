import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { PORT, CLIENT_ORIGIN } from "./config/config.js";
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";
import { auth } from "./middlewares/auth.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

/**
 * ✅ CORS — MUST MATCH FRONTEND EXACTLY
 */
app.use(
  cors({
    origin: CLIENT_ORIGIN, // e.g. https://omni-3825.onrender.com
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/**
 * Public routes (no auth)
 */
app.use("/auth", authRoutes);
app.use("/public", publicRoutes);

/**
 * Auth middleware applies AFTER login
 */
app.use(auth);

/**
 * Protected routes
 */
app.use("/protected", protectedRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
