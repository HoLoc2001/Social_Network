"use strict";

const express = require("express");
require("dotenv").config();
const { Server } = require("socket.io");
const { createServer } = require("http");
const createError = require("http-errors");
const { connectSocket } = require("./v1/services/socket.service.js");
const routesV1 = require("./v1/routes/index");
require("./db/connection_postgres").instancePG;
require("./db/connection_redis");
require("./db/connectDB");

const PORT = process.env.PORT;
const app = express();
const server = createServer(app);
const socketIo = new Server(server, { cors: { origin: "*" } });

global._io = socketIo;
socketIo.on("connection", connectSocket);
app.use(require("./v1/middleware/index"));
app.use("/api/v1", routesV1);

app.use((req, res, next) => {
  next(createError.NotFound("This route does not exist"));
});

app.use((err, req, res, next) => {
  res.json({
    status: err.status || 500,
    message: err.message,
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
