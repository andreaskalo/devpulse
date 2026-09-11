import express from "express";
import {
  getCurrentUser,
  logout,
  register,
} from "../controllers/authController.js";
import { login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", getCurrentUser);
router.post("/logout", logout);

export default router;
