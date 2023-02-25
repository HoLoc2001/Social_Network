const express = require("express");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken.js");
const {
  checkEmail,
  checkPass,
  refreshToken,
  sendMailPass,
  sighIn,
  sighUp,
  updatePass,
} = require("../controllers/auth.controller.js");
const { pool } = require("../helpers/connectDB.js");

const router = express.Router();

router.post("/refreshToken", refreshToken);

router.post("/signup", sighUp);

router.post("/signin", sighIn);

router.post("/checkEmail", checkEmail);

router.post("/checkPass", verifyToken, checkPass);

router.post("/updatePass", verifyToken, updatePass);

router.post("/sendMailPass", sendMailPass);

module.exports = router;
