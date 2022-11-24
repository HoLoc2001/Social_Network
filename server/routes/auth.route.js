import express from "express";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/verifyToken.js";
import { checkEmail, sighIn, sighUp } from "../controllers/auth.controller.js";
import { pool } from "../connectDB.js";

const router = express.Router();

router.post("/refreshToken", (req, res) => {
  const authHeader = req.header("Authorization");
  const refreshToken = authHeader && authHeader.split(" ")[1];
  if (!refreshToken) {
    res.sendStatus(401);
  }

  if (!refreshTokenModel.findOne({ where: { refreshToken } })) {
    res.sendStatus(403);
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, data) => {
      if (err) {
        res.sendStatus(403);
      }

      await pool.query("delete from refresh_tokens where refreshToken = ?", [
        refreshToken,
      ]);

      const accessToken = jwt.sign(
        { userId: data.userId },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );
      const newRefreshToken = jwt.sign(
        { userId: data.userId },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "30d",
        }
      );

      let date = new Date();

      await pool.query(
        "INSERT INTO refresh_tokens values (?, ?)",
        [newRefreshToken, date],
        function (err, rows, fields) {
          console.log(err);
          console.log(rows);
        }
      );

      res.json({ accessToken, newRefreshToken });
    }
  );
});

router.post("/signup", sighUp);

router.post("/signin", sighIn);

router.post("/checkemail", checkEmail);

export default router;
