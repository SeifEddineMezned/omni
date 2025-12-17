import jwt from "jsonwebtoken";
import { COOKIE_NAME, JWT_SECRET } from "../config/config.js";

export function auth(req, res, next) {
  const token = req.cookies[COOKIE_NAME];

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    req.user = null;
    return next();
  }
}

export function isAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  return next();
}
