import express from "express";
import cors from "cors";
import { pool } from "./connectDB.js";
import postRouter from "./routers/post.router.js";
import authRouter from "./routers/auth.router.js";

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", postRouter, authRouter);

app.listen(PORT, async () => {
  console.log(PORT);
  // pool.query("SELECT * FROM users WHERE id = 5", function (err, rows) {
  //   console.log(rows);
  // });
});
