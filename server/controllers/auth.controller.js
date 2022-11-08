import jwt from "jsonwebtoken";
import argon2 from "argon2";

import Users from "../models/users.js";
import RefreshToken from "../models/refreshToken.js";

export const getInfo = async (req, res) => {
  try {
    const user = await Users.findOne({
      attributes: { exclude: ["password"] },
      where: { id: req.userId },
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const sighUp = async (req, res) => {
  const { username, password, code, fullname, birthday, address } = req.body;

  // Simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username and/or password" });

  try {
    const user = await Users.findOne({
      where: { username },
    });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Username already taken" });
    //All good
    const hashedPassword = await argon2.hash(password);
    const newUser = Users.build({
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

    const newRefreshToken = RefreshToken.build({
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
};

export const sighIn = async (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username and/or password" });

  try {
    //Check for existing user
    const user = await Users.findOne({
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

    const newRefreshToken = RefreshToken.build({
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
};
