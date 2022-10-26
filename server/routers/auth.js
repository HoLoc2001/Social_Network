import express from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/verifyToken.js";
import usersModel from "../models/users.js";
import refreshTokenModel from "../models/refreshToken.js";

const router = express.Router();

// @route GET api/auth
// @decs Check if user is logged in
// @access Public
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await usersModel.findOne({
      attributes: { exclude: ["password"] },
      where: { id: req.userId },
    });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/refreshToken", (req, res) => {
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
      { userId: data.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ accessToken });
  });
});

// @route POST api/auth/signup
// @desc SignUp user
// @access Public
router.post("/signup", async (req, res) => {
  const { username, password, code, fullname, birthday, address } = req.body;

  // Simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username and/or password" });

  try {
    const user = await usersModel.findOne({
      where: { username },
    });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Username already taken" });
    //All good
    const hashedPassword = await argon2.hash(password);
    const newUser = usersModel.build({
      username,
      password: hashedPassword,
      code,
      fullname,
      birthday,
      address,
    });
    await newUser.save();

    //Return Token
    const accessToken = jwt.sign(
      { userId: newUser.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const refreshToken = jwt.sign(
      { userId: newUser.id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "60d",
      }
    );

    let date = new Date();
    date.setDate(date.getDate() + 60);

    const newRefreshToken = refreshTokenModel.build({
      refreshToken,
      expiredTime: date,
    });

    try {
      await newRefreshToken.save();
    } catch (error) {
      res.json(error);
    }

    res.json({
      success: true,
      message: "User create successfully",
      accessToken,
      refreshToken,
      newRefreshToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/auth/signin
// @desc SignIn user
// @access Public
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username and/or password" });

  try {
    //Check for existing user
    const user = await usersModel.findOne({
      where: { username },
    });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });

    //Username found
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });

    //Return Token
    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "60d",
      }
    );

    let date = new Date();
    date.setDate(date.getDate() + 60);

    const newRefreshToken = refreshTokenModel.build({
      refreshToken,
      expiredTime: date,
    });

    try {
      await newRefreshToken.save();
    } catch (error) {
      res.json(error);
    }

    res.json({
      success: true,
      message: "User logged in successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

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
