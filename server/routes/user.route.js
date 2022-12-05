import express from "express";
import {
  getInfo,
  getListFollower,
  updateAvatar,
} from "../controllers/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getInfo);
router.patch("/updateAvatar", verifyToken, updateAvatar);
router.post("/getListFollower", verifyToken, getListFollower);

export default router;
