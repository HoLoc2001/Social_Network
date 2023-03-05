const jwt = require("jsonwebtoken");
class SignToken {
  signAccessToken(userId) {
    jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
  }

  signRefreshToken(userId) {
    jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });
  }
}

module.exports = new SignToken();
