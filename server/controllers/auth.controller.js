import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { pool } from "../connectDB.js";

export const getInfo = async (req, res) => {
  try {
    await pool.execute("call get_user(?)", [2], function (err, rows) {
      console.log(rows[0][0].id);
    });
    const user = 0;
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
  let date = new Date();
  const { username, password, email, fullname, birthday, city } = req.body;

  // Simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username and/or password" });

  try {
    const [user] = await pool.execute(
      "select * from users where username = ?",
      [username]
    );

    if (user.length)
      return res
        .status(400)
        .json({ success: false, message: "Username already taken" });

    //All good
    const hashedPassword = await argon2.hash(password);

    const [userId] = await pool.execute("call add_user(?, ?, ?, ?, ?, ?, ?)", [
      username,
      email,
      hashedPassword,
      fullname,
      birthday,
      city,
      date,
    ]);

    //Return Token
    const accessToken = jwt.sign(
      { userId: userId[0][0].id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const refreshToken = jwt.sign(
      { userId: userId[0][0].id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "60d",
      }
    );

    await pool.execute("call add_refresh_token(?, ?)", [refreshToken, date]);

    res.json({
      success: true,
      message: "User create successfully",
      accessToken,
      refreshToken,
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
    const [user] = await pool.execute(
      "select * from users where username = ?",
      [username]
    );
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });
    //Username found

    const passwordValid = await argon2.verify(user[0].password, password);
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
    await pool.execute("call add_refresh_token(?, ?)", [refreshToken, date]);

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
