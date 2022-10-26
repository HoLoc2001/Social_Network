import express from "express";
import cors from "cors";
import { sequelize, connectToDb } from "./connectDB.js";
import apiRouter from "./routers/auth.js";
import postRouter from "./routers/post.js";

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", postRouter, apiRouter);

app.listen(PORT, async () => {
  console.log(PORT);
  await connectToDb();
});
