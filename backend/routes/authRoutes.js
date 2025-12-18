import { Router } from "express";
import {
  login,
  logout,
  register,
  listUsers,
} from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/users", listUsers);

export default router;
