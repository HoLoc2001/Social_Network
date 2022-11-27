import express from "express";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/verifyToken.js";
import {
  checkEmail,
  refreshToken,
  sighIn,
  sighUp,
} from "../controllers/auth.controller.js";
import { pool } from "../connectDB.js";

const router = express.Router();

router.post("/refreshToken", refreshToken);

router.post("/signup", sighUp);

router.post("/signin", sighIn);

router.post("/checkEmail", checkEmail);

export default router;
