import express from "express";
import {
  getInfo,
  getListFollower,
  getOtherInfo,
  updateAvatar,
} from "../controllers/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getInfo);
router.post("/getOtherInfo", verifyToken, getOtherInfo);
router.patch("/updateAvatar", verifyToken, updateAvatar);
router.post("/getListFollower", verifyToken, getListFollower);

export default router;
