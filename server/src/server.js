const express = require("express");
require("dotenv").config();
const { Server } = require("socket.io");
const { createServer } = require("http");
const { connectSocket } = require("./v1/services/socket.service.js");
const route_v1 = require("./v1/routes/index.route.js");
require("./db/connection_postgres").instancePG;
require("./db/connectDB");

const PORT = process.env.PORT;
const app = express();
const server = createServer(app);
const socketIo = new Server(server, { cors: { origin: "*" } });

global._io = socketIo;

app.use(require("./v1/middleware/index"));
app.use("/api", route_v1);

socketIo.on("connection", connectSocket);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
