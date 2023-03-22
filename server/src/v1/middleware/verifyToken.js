const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Access token not found" });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    if (error.message === "jwt expired") {
      return res.status(403).json({ tokenExpired: true });
    }
    console.log(error);
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};

module.exports = verifyToken;
