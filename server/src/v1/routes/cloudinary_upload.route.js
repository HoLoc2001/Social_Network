const express = require("express");
const router = express.Router();
const fileUploader = require("../configs/cloudinary");
const uploadImg = require("../controllers/cloudinary_upload.controller");
const verifyToken = require("../middleware/verifyToken");

router.post(
  "/cloudinary-upload",
  verifyToken,
  fileUploader.array("file"),
  uploadImg
);

module.exports = router;
