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
 * ✅ CORS — MUST be first
 */
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/**
 * ✅ Explicitly handle preflight requests
 */
app.options("*", cors());

/**
 * ✅ Public routes (NO auth here)
 */
app.use("/auth", authRoutes);
app.use("/public", publicRoutes);

/**
 * ✅ Auth middleware ONLY after public routes
 */
app.use(auth);

/**
 * ✅ Protected routes
 */
app.use("/protected", protectedRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
