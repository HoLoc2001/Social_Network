import express from "express";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/verifyToken.js";
import {
  checkEmail,
  checkPass,
  refreshToken,
  sendMailPass,
  sighIn,
  sighUp,
  updatePass,
} from "../controllers/auth.controller.js";
import { pool } from "../connectDB.js";

const router = express.Router();

router.post("/refreshToken", refreshToken);

router.post("/signup", sighUp);

router.post("/signin", sighIn);

router.post("/checkEmail", checkEmail);

router.post("/checkPass", verifyToken, checkPass);

router.post("/updatePass", verifyToken, updatePass);

router.post("/sendMailPass", sendMailPass);

export default router;
