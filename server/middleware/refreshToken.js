import jwt from "jsonwebtoken";
import refreshTokenModel from "../models/refreshToken.js";

const refreshToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const refreshToken = authHeader && authHeader.split(" ")[1];
    if (!refreshToken) {
      res.sendStatus(401);
    }
  
    if (!refreshTokenModel.findOne({ where: { refreshToken } })) {
      res.sendStatus(403);
    }
  
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
      if (err) {
        res.sendStatus(403);
      }
      console.log(data);
      const accessToken = jwt.sign(
        { username: data.username, age: data.age },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.json({ accessToken });
    });
});