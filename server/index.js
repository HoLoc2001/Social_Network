import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import { connectSocket } from "./services/Socket.service.js";

const PORT = process.env.PORT;
const app = express();
const server = createServer(app);
const socketIo = new Server(server, { cors: { origin: "*" } });

global._io = socketIo;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/api", postRoute, authRoute);
app.use("/api/user", userRoute);

socketIo.on("connection", connectSocket);

// app.listen(PORT, async () => {
//   console.log(PORT);
// });

server.listen(PORT, () => {
  console.log(PORT);
});
