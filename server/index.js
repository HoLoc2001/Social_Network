import express from "express";
import cors from "cors";
import { pool } from "./connectDB.js";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", postRoute, authRoute);
app.use("/api/user", userRoute);

app.listen(PORT, async () => {
  console.log(PORT);
});
