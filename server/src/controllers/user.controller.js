const pool = require("../helpers/connectDB.js");

const getInfo = async (req, res) => {
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

const getOtherInfo = async (req, res) => {
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

const updateInfo = async (req, res) => {
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

const updateUser = async (req, res) => {
  try {
    const { avatar, fullname } = req.body;
    const [row] = await pool.execute("call updateUser(?, ?, ?)", [
      req.userId,
      fullname,
      avatar,
    ]);
    _io.emit("notification-updateUser", row[0][0]);

    res.json({ success: true, user: row[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getListFollower = async (req, res) => {
  try {
    const userId = req.userId;
    const [row] = await pool.execute("call get_list_follower(?)", [userId]);

    res.json({ success: true, data: row[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getNotFollower = async (req, res) => {
  try {
    const userId = req.userId;
    const [row] = await pool.execute("call get_not_follower(?)", [userId]);

    res.json({ success: true, data: row[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const addFollower = async (req, res) => {
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

const getListUserSearch = async (req, res) => {
  try {
    const { data } = req.body;
    const [row] = await pool.execute("call get_search_name(?)", [data]);

    res.json({ success: true, data: row[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getListLike = async (req, res) => {
  try {
    const { postId } = req.body;
    const [row] = await pool.execute("call get_list_like(?)", [postId]);

    res.json({ success: true, data: row[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//  const getListFollower = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const [row] = await pool.execute("call get_list_follower(?)", [userId]);

//     res.json({ success: true, data: row[0] });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

const getListFollowing = async (req, res) => {
  try {
    const { userId } = req.body;
    const [row] = await pool.execute("call get_list_following(?)", [userId]);

    res.json({ success: true, data: row[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getInfo,
  getOtherInfo,
  updateInfo,
  updateUser,
  getListFollower,
  getNotFollower,
  addFollower,
  getListUserSearch,
  getListLike,
  getListFollower,
  getListFollowing,
};
