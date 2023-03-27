const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const nodemailer = require("nodemailer");
const { OAuth2Client, auth } = require("google-auth-library");
const signToken = require("../utils/signToken");
const authService = require("../services/auth.service");
const validation = require("../utils/validation");

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.sendStatus(401);
    }
    const token = await authService.getRefreshToken({ refreshToken });

    if (!token) {
      res.sendStatus(403);
    }

    let accessToken, newRefreshToken;
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, data) => {
        if (err) {
          res.sendStatus(403);
        }

        accessToken = await signToken.signAccessToken(data.userId);

        newRefreshToken = await signToken.signRefreshToken(data.userId);

        await authService.updateRefreshToken(data.userId, newRefreshToken);
        res.json({
          accessToken,
          refreshToken: newRefreshToken,
        });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const sighUp = async (req, res) => {
  try {
    const { email, password, firstName, lastName, birthday, gender } = req.body;

    const { error } = validation.signUpValidate({
      email,
      password,
      firstName,
      lastName,
      birthday,
      gender,
    });

    if (error) return res.status(400).json({ message: error.message });

    const user = await authService.getEmailUser(email);

    if (user.rowCount)
      return res
        .status(400)
        .json({ success: false, message: "email already taken" });

    const hashedPassword = await argon2.hash(password);

    const { user_id } = await authService.addUser(
      email,
      hashedPassword,
      firstName,
      lastName,
      birthday,
      gender
    );

    const accessToken = signToken.signAccessToken(user_id);

    const refreshToken = signToken.signRefreshToken(user_id);

    await authService.addRefreshToken(user_id, refreshToken);

    res.json({
      message: "User create successfully",
      token: { accessToken, refreshToken },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const sighIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = validation.signInValidate({ email, password });

    if (error)
      return res.status(400).json({ success: false, message: error.message });

    const user = await authService.signIn(email);

    if (!user.user_id)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });

    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });

    //Return Tokens
    const accessToken = signToken.signAccessToken(user.user_id);
    const refreshToken = signToken.signRefreshToken(user.user_id);

    await authService.addRefreshToken(user.user_id, refreshToken);

    res.json({
      success: true,
      message: "User logged in successfully",
      token: { accessToken, refreshToken },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const { error } = validation.emailValidate({ email });

    if (error) return res.status(400).json({ message: error.message });

    const user = await authService.getEmailUser(email);

    if (user.rowCount) return res.status(200).json({ hasEmail: true });
    return res.status(200).json({ hasEmail: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const userId = req.userId;

    const { error } = validation.passwordValidate({ password, newPassword });
    if (error) return res.status(400).json({ message: error.message });

    const user = await authService.getPassword(userId);
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    const hashNewPassword = await argon2.hash(newPassword);

    await authService.updatePassword(userId, hashNewPassword);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const sendMailPass = async (req, res) => {
  try {
    const { email } = req.body;
    const { error } = validation.emailValidate({ email });
    if (error) throw new Error(error.message);
    const myOAuth2Client = new OAuth2Client(
      process.env.GOOGLE_MAILER_CLIENT_ID,
      process.env.GOOGLE_MAILER_CLIENT_SECRET
    );
    myOAuth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
    });
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

    const user = await authService.getEmailUser(email);
    let newPassword = Math.random().toString(36).slice(-8);
    const hashPassword = await argon2.hash(newPassword);
    await authService.updatePassword(user.user_id, hashPassword);
    // mailOption là những thông tin gửi từ phía client lên thông qua API
    const mailOptions = {
      to: email, // Gửi đến ai?
      subject: "Social Network gửi mật khẩu", // Tiêu đề email
      html: `Mật khẩu mới của bạn là: ${newPassword}`, // Nội dung email
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

module.exports = {
  refreshToken,
  sighUp,
  sighIn,
  checkEmail,
  updatePassword,
  sendMailPass,
};
