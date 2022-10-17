import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import { sequelize, connectToDb } from "./connectDB.js";
import apiRouter from "./routers/auth.js";
import apiRouter1 from "./routers/post.js";
import argon2 from "argon2";

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", apiRouter, apiRouter1);
// app.use("/api1", apiRouter1);

app.get("/", (req, res) => {
  res.json({ name: "Ho Tan Loc" });
});

app.listen(PORT, async () => {
  console.log(PORT);

  await connectToDb();
});
