const express = require("express");
const router = express.Router();
const fileUploader = require("../configs/cloudinary");
const uploadImg = require("../controllers/cloudinary_upload.controller");

router.post("/cloudinary-upload", fileUploader.array("file"), uploadImg);

module.exports = router;
