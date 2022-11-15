import express from "express";
import { getInfo } from "../controllers/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getInfo);

export default router;
