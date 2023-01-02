import jwt from "jsonwebtoken";
import argon2 from "argon2";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import { pool } from "../connectDB.js";

const myOAuth2Client = new OAuth2Client(
  process.env.GOOGLE_MAILER_CLIENT_ID,
  process.env.GOOGLE_MAILER_CLIENT_SECRET
);

myOAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
});

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
    if (!user[0]?.id)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect fullname or pass" });

    const id = user[0].id;
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

export const sendMailPass = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) throw new Error("Please provide email!");
    const myAccessTokenObject = await myOAuth2Client.getAccessToken();
    const myAccessToken = myAccessTokenObject?.token;
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.ADMIN_EMAIL_ADDRESS,
        clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
        clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
        refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
        accessToken: myAccessToken,
      },
    });

    const [row] = await pool.query("call get_id(?)", [email]);
    const userId = row[0][0].id;
    let newPass = Math.random().toString(36).slice(-8);
    const hashPass = await argon2.hash(newPass);
    await pool.query("call update_password(?,?)", [userId, hashPass]);

    // mailOption là những thông tin gửi từ phía client lên thông qua API
    const mailOptions = {
      to: email, // Gửi đến ai?
      subject: "Social Network gửi mật khẩu", // Tiêu đề email
      html: `Mật khẩu mới của bạn là: ${newPass}`, // Nội dung email
    };
    // Gọi hành động gửi email
    await transport.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: "Email sent successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, errors: error.message });
  }
};
