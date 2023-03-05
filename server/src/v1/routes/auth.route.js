const express = require("express");
const verifyToken = require("../middleware/verifyToken.js");
const authController = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/refreshToken", authController.refreshToken);

router.post("/signup", authController.sighUp);

router.post("/signin", authController.sighIn);

router.post("/checkEmail", authController.checkEmail);

router.post("/checkPass", verifyToken, authController.checkPass);

router.post("/updatePass", verifyToken, authController.updatePass);

router.post("/sendMailPass", authController.sendMailPass);

module.exports = router;
