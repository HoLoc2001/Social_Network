const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const logger = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(compression());
app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  logger("combined", {
    stream: fs.createWriteStream(path.join(__dirname, "../logs/access.log"), {
      flags: "a",
    }),
  })
);

module.exports = app;
