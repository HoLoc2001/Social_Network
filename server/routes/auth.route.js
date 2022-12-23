import express from "express";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/verifyToken.js";
import {
  checkEmail,
  checkPass,
  refreshToken,
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

export default router;
