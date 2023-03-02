const express = require("express");
const uploadCloud = require("../configs/cloudinary");
const postRoute = require("./post.route");
const userRoute = require("./user.route");
const authRoute = require("./auth.route");

const router = express.Router();

app.use("/v1/uploads", uploadCloud);
app.use("/v1", postRoute, authRoute);
app.use("/v1/user", userRoute);

module.exports = router;
