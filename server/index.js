import express from "express";
import cors from "cors";
import { connectToDb, pool } from "./connectDB.js";
import apiRouter from "./routers/auth.js";
import postRouter from "./routers/post.js";

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", postRouter, apiRouter);

app.listen(PORT, async () => {
  console.log(PORT);
  // pool.query("SELECT * FROM users WHERE id = 5", function (err, rows) {
  //   console.log(rows);
  // });
});
