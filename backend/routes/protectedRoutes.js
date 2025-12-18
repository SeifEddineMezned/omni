import { Router } from "express";
import { auth, isAuth } from "../middlewares/auth.js";

const router = Router();

router.get("/profile", auth, isAuth, (req, res) => {
  return res.json({
    message: "This is a protected profile route",
    user: req.user,
  });
});

export default router;
