import dotenv from "dotenv";

dotenv.config();

/**
 * JWT
 */
export const JWT_SECRET =
  process.env.JWT_SECRET || "super-secret-key-change-me";

export const JWT_EXPIRES_IN =
  process.env.JWT_EXPIRES_IN || "7d";

/**
 * Cookies — CRITICAL FOR AUTH
 */
export const COOKIE_NAME =
  process.env.COOKIE_NAME || "access_token";

/**
 * MUST be true in production (HTTPS on Render)
 */
export const COOKIE_SECURE = true;

/**
 * MUST be 'none' for cross-site cookies
 */
export const COOKIE_SAMESITE = "none";

/**
 * Cookie lifetime
 */
export const COOKIE_MAX_AGE_MS =
  Number(process.env.COOKIE_MAX_AGE_MS) ||
  7 * 24 * 60 * 60 * 1000;

/**
 * Server
 */
export const PORT = process.env.PORT || 5000;

/**
 * CORS — MUST MATCH FRONTEND EXACTLY
 */
export const CLIENT_ORIGIN =
  process.env.CLIENT_ORIGIN ||
  "https://omni-3825.onrender.com";
