import { pool } from "../connectDB.js";

export const getInfo = async (req, res) => {
  try {
    const [rows] = await pool.execute("call get_user(?)", [req.userId]);
    const user = rows[0];
    if (!user.length) {
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

export const updateInfo = async (req, res) => {
  try {
    const [rows] = await pool.execute("call get_user(?)", [req.userId]);
    const user = rows[0];
    if (!user.length) {
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

export const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const [row] = await pool.execute("call updateAvatar(?, ?)", [
      req.userId,
      avatar,
    ]);

    res.json({ success: true, avatar: row[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getListFollower = async (req, res) => {
  try {
    const userId = req.userId;
    const [row] = await pool.execute("call get_list_follower(?)", [userId]);

    res.json({ success: true, data: row[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
