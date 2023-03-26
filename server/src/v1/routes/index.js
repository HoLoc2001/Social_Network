const { Router } = require("express");
const uploadCloud = require("../routes/cloudinary_upload.route");
const postRoute = require("./post.route");
const userRoute = require("./user.route");
const authRoute = require("./auth.route");

const router = Router();

router.use("/uploads", uploadCloud);
router.use("/post", postRoute);
router.use("/auth", authRoute);
router.use("/user", userRoute);

module.exports = router;
