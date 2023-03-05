const { Router } = require("express");
const uploadCloud = require("../configs/cloudinary");
const postRoute = require("./post.route");
const userRoute = require("./user.route");
const authRoute = require("./auth.route");

const router = Router();

router.apply("/v1/uploads", uploadCloud);
router.apply("/v1", postRoute, authRoute);
router.apply("/v1/user", userRoute);

module.exports = router;
