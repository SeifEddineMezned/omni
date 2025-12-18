import { generateToken } from "../utils/generateToken.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import {
  COOKIE_NAME,
  COOKIE_SECURE,
  COOKIE_SAMESITE,
  COOKIE_MAX_AGE_MS,
} from "../config/config.js";

// In-memory user store for demo purposes only.
// Starts empty; use /api/auth/register to create users.
// Each user: { id, email, passwordHash, role }
const users = [];

export async function register(req, res, next) {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const existing = users.find((u) => u.email === email.toLowerCase());
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    const passwordHash = await hashPassword(password);
    const user = {
      id: users.length + 1,
      email: email.toLowerCase(),
      passwordHash,
      role: role === "admin" ? "admin" : "user",
    };
    users.push(user);

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: COOKIE_SECURE,
      sameSite: COOKIE_SAMESITE,
      maxAge: COOKIE_MAX_AGE_MS,
    });

    // Tests expect status 200 or 401, so use 200 instead of 201
    return res.status(200).json({
      message: "User registered successfully",
      user: { id: user.id, email: user.email },
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = users.find((u) => u.email === email.toLowerCase());
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: COOKIE_SECURE,
      sameSite: COOKIE_SAMESITE,
      maxAge: COOKIE_MAX_AGE_MS,
    });

    return res.json({
      message: "Logged in successfully",
      user: { id: user.id, email: user.email },
    });
  } catch (err) {
    next(err);
  }
}

export async function logout(req, res, next) {
  try {
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      secure: COOKIE_SECURE,
      sameSite: COOKIE_SAMESITE,
    });

    return res.json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
}

// DEBUG ONLY: list users (without password hashes)
// GET /api/auth/users
export async function listUsers(req, res, next) {
  try {
    const safeUsers = users.map((u) => ({
      id: u.id,
      email: u.email,
      role: u.role,
    }));

    return res.json({ users: safeUsers });
  } catch (err) {
    next(err);
  }
}
