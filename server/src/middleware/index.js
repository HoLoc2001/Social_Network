const express = require("express");
const cors = require("cors");
const compression = require("compression");

const app = express();

app.use(cors());
app.use(compression());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

module.exports = app;
