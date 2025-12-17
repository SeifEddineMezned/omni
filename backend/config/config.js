import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-me';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
export const COOKIE_NAME = process.env.COOKIE_NAME || 'access_token';
export const COOKIE_SECURE =
  process.env.COOKIE_SECURE === 'true' || process.env.NODE_ENV === 'production';
export const COOKIE_SAMESITE = process.env.COOKIE_SAMESITE || 'lax';
export const COOKIE_MAX_AGE_MS =
  Number(process.env.COOKIE_MAX_AGE_MS) || 7 * 24 * 60 * 60 * 1000;

export const PORT = process.env.PORT || 5000;
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';


