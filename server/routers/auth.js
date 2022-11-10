import express from "express";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/verifyToken.js";
import { getInfo, sighIn, sighUp } from "../controllers/auth.controller.js";
import { pool } from "../connectDB.js";

const router = express.Router();

// @route GET api/
router.get("/", verifyToken, getInfo);

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

// @route POST api/signup
router.post("/signup", sighUp);

// @route POST api/signin
router.post("/signin", sighIn);

export default router;

// -----------------------------------------------------------------------------------

// import express from "express";
// const router = express.Router();
// import User from "../models/usersModel.js";

// const app = express();
// app.use(express.json());

// router.get("/todos", async (request, response) => {
//   const users = await User.findAll();

//   response.status(200).json(users);
// });

// router.post("/todos", async (request, response) => {
//   const { content, description } = request.body;
//   console.log(description);
//   const newUser = User.build({
//     content: content,
//     description: description,
//   });

//   try {
//     await newUser.save();

//     response.status(201).json(newUser);
//   } catch (error) {
//     response.json(error);
//   }
// });

// router.get("/todo/:id", async (request, response) => {
//   const User = await User.findOne({
//     where: {
//       id: request.params.id,
//     },
//   });

//   response.status(200).json(User);
// });

// router.patch("/todo/:id", async (request, response) => {
//   const user = await user.findOne({
//     where: {
//       id: request.params.id,
//     },
//   });

//   const { is_complete } = request.body;

//   await user.set({
//     is_complete,
//   });

//   await user.save();

//   response.status(200).json(user);
// });

// router.put("/todo/:id", async (request, response) => {
//   const user = await User.findOne({
//     where: {
//       id: request.params.id,
//     },
//   });

//   const { is_complete, content, description } = request.body;

//   await user.set({
//     is_complete: is_complete,
//     content: content,
//     description: description,
//   });

//   await user.save();

//   response.status(200).json(user);
// });

// router.delete("/todo/:id", async (request, response) => {
//   const user = await User.findOne({
//     where: {
//       id: request.params.id,
//     },
//   });

//   await user.destroy();

//   response.status(204).json({});
// });

// export default router;
