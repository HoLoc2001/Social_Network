import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { pool } from "../connectDB.js";

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.sendStatus(401);
    }

    const [row] = await pool.query("call get_refresh_token(?)", [refreshToken]);
    if (!row[0]) {
      res.sendStatus(403);
    }
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, data) => {
        if (err) {
          res.sendStatus(403);
        }

        await pool.query("call delete_refresh_token(?)", [refreshToken]);

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

        await pool.query(
          "call add_refresh_token(?)",
          [newRefreshToken],
          function (err, rows, fields) {
            console.log(err);
          }
        );

        res.json({ accessToken, refreshToken: newRefreshToken });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const sighUp = async (req, res) => {
  const { email, password, fullname, birthday } = req.body;
  // Simple validation
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing fullname and/or password" });

  try {
    const [user] = await pool.execute("call get_user_by_email(?)", [email]);

    if (user[0].length)
      return res
        .status(400)
        .json({ success: false, message: "fullname already taken" });

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
      token: { accessToken, refreshToken },
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
      .json({ success: false, message: "Missing fullname and/or password" });

  try {
    const [user] = await pool.execute(
      "select id, password from users where email = ?",
      [email]
    );
    const id = user[0].id;

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect fullname or password" });

    const passwordValid = await argon2.verify(user[0].password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect fullname or password" });

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
      token: { accessToken, refreshToken },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const checkEmail = async (req, res) => {
  const { email } = req.body;
  if (!email)
    return res.status(400).json({ success: false, message: "Missing email" });

  try {
    const [user] = await pool.execute("call get_user_by_email(?)", [email]);

    if (!user[0].length) return res.status(200).json({ success: false });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const checkPass = async (req, res) => {
  try {
    const { pass } = req.body;
    const userId = req.userId;
    if (!pass)
      return res
        .status(400)
        .json({ success: false, message: "Missing password" });

    const [row] = await pool.query("call get_pass_by_userId(?)", [userId]);
    const passwordValid = await argon2.verify(row[0][0].password, pass);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updatePass = async (req, res) => {
  try {
    const { pass } = req.body;
    const userId = req.userId;

    const hashPass = await argon2.hash(pass);
    await pool.query("call update_password(?,?)", [userId, hashPass]);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
