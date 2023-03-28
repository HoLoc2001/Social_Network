const pool = require("../../db/connectDB");
const userServices = require("../services/user.service");

const getInfo = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userServices.getInfoUser(userId);
    const totalFollowers = await userServices.getTotalFollower(userId);
    const totalFollowings = await userServices.getTotalFollowing(userId);
    if (!user.user_id) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    res.json({
      success: true,
      user: { ...user, totalFollowers, totalFollowings },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getOtherInfo = async (req, res) => {
  try {
    const { userId } = req.body;
    const ownUserId = req.userId;
    const user = await userServices.getInfoUser(ownUserId, userId);
    const totalFollowers = await userServices.getTotalFollower(userId);
    const totalFollowings = await userServices.getTotalFollowing(userId);
    if (!user.user_id) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    res.json({
      success: true,
      user: { ...user, totalFollowers, totalFollowings },
    });
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

const updateInfoUser = async (req, res) => {
  try {
    const { avatar, firstName, lastName, birthday, gender } = req.body;
    const userId = req.userId;
    const InfoUser = await userServices.updateInfoUser(
      userId,
      avatar,
      firstName,
      lastName,
      birthday,
      gender
    );
    _io.emit("notification-updateUser", userId);

    res.json({ success: true, InfoUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getListFollower = async (req, res) => {
  try {
    const userId = req.body.user_id || req.userId;
    const listFollower = await userServices.getListFollowers(userId);

    res.json({ listFollower });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getNotFollower = async (req, res) => {
  try {
    const userId = req.userId;
    const listNotFollower = await userServices.getListNotFollowers(userId);

    res.json({ listNotFollower });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateFollower = async (req, res) => {
  try {
    const { userId } = req.body;
    const ownUserId = req.userId;
    const hasFollower = await userServices.getUserFollower(ownUserId, userId);
    if (hasFollower) {
    }

    res.json({ success: true, data: row[0], totalFollow: rowFollower[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const addFollower = async (req, res) => {
  try {
    const { userId } = req.body;
    const ownUserId = req.userId;
    await userServices.addFollower(userId, ownUserId);
    const totalFollowers = await userServices.getTotalFollower(userId);
    const totalFollowings = await userServices.getTotalFollowing(ownUserId);
    const listFollower = await userServices.getListFollowers(ownUserId);

    res.json({ totalFollowers, totalFollowings, listFollower });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const removeFollower = async (req, res) => {
  try {
    const { userId } = req.body;
    const ownUserId = req.userId;
    await userServices.removeFollower(userId, ownUserId);
    const totalFollowers = await userServices.getTotalFollower(userId);
    const totalFollowings = await userServices.getTotalFollowing(ownUserId);
    const listFollower = await userServices.getListFollowers(ownUserId);

    res.json({ totalFollowers, totalFollowings, listFollower });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getListUserSearch = async (req, res) => {
  try {
    let { textSearch } = req.body;
    textSearch = textSearch.trim().replaceAll(/\s+/g, "&");

    const listUsers = await userServices.getListUserSearch(textSearch);

    res.json({ success: true, listUsers });
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

const getListFollowing = async (req, res) => {
  try {
    const userId = req.body.user_id || req.userId;
    const listFollowing = await userServices.getListFollowings(userId);

    res.json({ listFollowing });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getInfo,
  getOtherInfo,
  getNotFollower,
  getListUserSearch,
  getListLike,
  getListFollower,
  getListFollowing,
  addFollower,
  removeFollower,
  updateFollower,
  updateInfoUser,
  updateInfo,
};
