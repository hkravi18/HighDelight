import express from "express";
const router = express.Router();

import { sendOtp, verifyOtp } from "../controllers/otp.controller";

router.post("/send", sendOtp);
router.post("/verify", verifyOtp);

export default router;
