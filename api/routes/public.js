import express from "express";
import AuthController from "../controllers/AuthController.js";

const router = express.Router();
const authController = new AuthController;

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/request-reset", authController.requestPasswordReset);
router.post("/reset-password", authController.resetPassword);

export default router;