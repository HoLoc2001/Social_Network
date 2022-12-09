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

export const getOtherInfo = async (req, res) => {
  try {
    const { userId } = req.body;
    const [rows] = await pool.execute("call get_user(?)", [userId]);
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

export const updateUser = async (req, res) => {
  try {
    const { avatar, fullname } = req.body;
    const [row] = await pool.execute("call updateUser(?, ?, ?)", [
      req.userId,
      fullname,
      avatar,
    ]);

    res.json({ success: true, user: row[0] });
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

export const getNotFollower = async (req, res) => {
  try {
    const userId = req.userId;
    const [row] = await pool.execute("call get_not_follower(?)", [userId]);

    res.json({ success: true, data: row[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const addFollower = async (req, res) => {
  try {
    const { user } = req.body;
    const userId = req.userId;
    const [row] = await pool.execute("call add_follower(?, ?)", [user, userId]);
    const [rowFollower] = await pool.execute("call get_total_follower(?, ?)", [
      user,
      userId,
    ]);

    res.json({ success: true, data: row[0], totalFollow: rowFollower[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
