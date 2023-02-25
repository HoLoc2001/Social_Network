const express = require("express");
require("dotenv").config();
const { Server } = require("socket.io");
const { createServer } = require("http");
const middleware = require("./middleware/index");
const postRoute = require("./routes/post.route.js");
const authRoute = require("./routes/auth.route.js");
const userRoute = require("./routes/user.route.js");
const { connectSocket } = require("./services/socket.service.js");
require("./helpers/connection_postgres.js");
require("./helpers/connectDB");

const PORT = process.env.PORT;
const app = express();
const server = createServer(app);
const socketIo = new Server(server, { cors: { origin: "*" } });

global._io = socketIo;

app.use(middleware);
app.use("/api", postRoute, authRoute);
app.use("/api/user", userRoute);

socketIo.on("connection", connectSocket);

server.listen(PORT, () => {
  console.log(PORT);
});
