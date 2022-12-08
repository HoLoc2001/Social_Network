import express from "express";
import {
  addFollower,
  getInfo,
  getListFollower,
  getNotFollower,
  getOtherInfo,
  updateUser,
} from "../controllers/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getInfo);
router.post("/getOtherInfo", verifyToken, getOtherInfo);
router.patch("/updateUser", verifyToken, updateUser);
router.post("/getListFollower", verifyToken, getListFollower);
router.post("/getNotFollower", verifyToken, getNotFollower);
router.post("/addFollower", verifyToken, addFollower);

export default router;
