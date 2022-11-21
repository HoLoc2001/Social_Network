import express from "express";
import cors from "cors";
import http from "http";
// import io from "socket.io";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
// import connectSocket from "./services/Socket.service.js";

const PORT = process.env.PORT;
const app = express();
const server = http.createServer(app);

// io(server, {
//   cors: {
//     origin: "*",
//   },
// });

// global._io = io;

app.use(cors());
app.use(express.json());
app.use("/api", postRoute, authRoute);
app.use("/api/user", userRoute);

// io.on("connection", connectSocket);

app.listen(PORT, async () => {
  console.log(PORT);
});
