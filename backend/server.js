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

// CORS configuration to work with React + Axios (withCredentials: true)
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true, // Allow cookies to be sent
  })
);

app.use(auth);

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/public", publicRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
