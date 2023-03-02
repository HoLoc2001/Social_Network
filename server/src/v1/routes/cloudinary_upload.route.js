const express = require("express");
const router = express.Router();
const fileUploader = require("../configs/cloudinary");

router.post(
  "/cloudinary-upload",
  fileUploader.single("file"),
  (req, res, next) => {
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }

    console.log(req.file.path);
    res.json({ secure_url: req.file.path });
  }
);

module.exports = router;
