import express from "express";
import { registerUser } from "../controllers/userController.js";
import { login, logout, verifyOTP } from "../controllers/authController.js";

const router = express.Router();

// registration and login processes
router.post("/login", login);
router.post("/register", registerUser);
router.post("/verifyotp", verifyOTP);
router.get("/logout", logout);

export default router;
