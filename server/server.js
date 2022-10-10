import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get("/api", (req, res) => {
  res.json();
});

app.listen(PORT, () => console.log(PORT));
