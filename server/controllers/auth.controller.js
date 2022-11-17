import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { pool } from "../connectDB.js";

export const sighUp = async (req, res) => {
  const { email, password, fullname, birthday } = req.body;
  // Simple validation
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username and/or password" });

  try {
    const [user] = await pool.execute("call get_user_by_email(?)", [email]);

    if (user.length)
      return res
        .status(400)
        .json({ success: false, message: "Username already taken" });

    //All good
    const hashedPassword = await argon2.hash(password);

    const [userId] = await pool.execute("call add_user(?, ?, ?, ?)", [
      email,
      hashedPassword,
      fullname,
      birthday,
    ]);

    const id = userId[0][0].id;
    //Return Token
    const accessToken = jwt.sign(
      { userId: id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const refreshToken = jwt.sign(
      { userId: id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "60d",
      }
    );

    await pool.execute("call add_refresh_token(?)", [refreshToken]);

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
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username and/or password" });

  try {
    //Check for existing user
    const [user] = await pool.execute(
      "select id, password from users where email = ?",
      [email]
    );
    const id = user[0].id;
    console.log(id);

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
      { userId: id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign(
      { userId: id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "60d",
      }
    );

    await pool.execute("call add_refresh_token(?)", [refreshToken]);

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
