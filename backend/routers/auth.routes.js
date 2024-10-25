import express from "express";
import {
  forgotPassword,
  loginUser,
  logout,
  resetPassword,
  signupController,
  verifyUser,
} from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/verify/:id", verifyUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);

export default router;
