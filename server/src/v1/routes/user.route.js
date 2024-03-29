const express = require("express");
const userController = require("../controllers/user.controller.js");
const verifyToken = require("../middleware/verifyToken.js");

const router = express.Router();

router.get("/", verifyToken, userController.getInfo);

router.post("/getOtherInfo", verifyToken, userController.getOtherInfo);

router.patch("/updateInfoUser", verifyToken, userController.updateInfoUser);

router.post("/getListFollower", verifyToken, userController.getListFollower);

router.post("/getListFollowing", verifyToken, userController.getListFollowing);

router.post(
  "/getListUserSearch",
  verifyToken,
  userController.getListUserSearch
);

router.post("/getNotFollower", verifyToken, userController.getNotFollower);

router.post("/addFollower", verifyToken, userController.addFollower);

router.post("/removeFollower", verifyToken, userController.removeFollower);

module.exports = router;
