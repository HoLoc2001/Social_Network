const { poolPg } = require("../../db/connection_postgres.js");

const getInfoUser = async (ownUserId, userId = null) => {
  try {
    if (userId) {
      const { rows } = await poolPg.query(
        "SELECT user_id, avatar,first_name,last_name, CONCAT(first_name, ' ', last_name) AS fullname, birthday, gender, city, EXISTS (SELECT user_id FROM follower WHERE follower_id = $1 AND user_id = $2) as hasFollower FROM users WHERE user_id = $2",
        [ownUserId, userId]
      );
      return rows[0];
    } else {
      const { rows } = await poolPg.query(
        "SELECT user_id, avatar,first_name,last_name, CONCAT(first_name, ' ', last_name) AS fullname, birthday, gender, city FROM users WHERE user_id = $1",
        [ownUserId]
      );

      return rows[0];
    }
  } catch (error) {
    return {
      code: 500,
      message: error.message,
    };
  }
};

const getTotalFollower = async (userId) => {
  try {
    const { rows } = await poolPg.query(
      "SELECT COUNT(1) as totalFollowers FROM follower WHERE user_id = $1",
      [userId]
    );
    return rows[0].totalfollowers;
  } catch (error) {
    return {
      code: 500,
      message: error.message,
    };
  }
};

const getTotalFollowing = async (userId) => {
  try {
    const { rows } = await poolPg.query(
      "SELECT COUNT(1) as totalFollowings FROM follower WHERE follower_id = $1",
      [userId]
    );
    return rows[0].totalfollowings;
  } catch (error) {
    return {
      code: 500,
      message: error.message,
    };
  }
};

const updateInfoUser = async (
  userId,
  avatar = DEFAULT,
  first_name = DEFAULT,
  last_name = DEFAULT,
  birthday = DEFAULT,
  gender = DEFAULT
) => {
  try {
    const { rows } = await poolPg.query(
      "UPDATE users SET avatar = $1, first_name = $2, last_name = $3, birthday = $4, gender = $5" +
        " WHERE user_id = $7 RETURNING avatar, first_name, last_name, birthday, gender",
      [avatar, first_name, last_name, birthday, gender, userId]
    );
    return rows[0];
  } catch (error) {
    return {
      code: 500,
      message: error.message,
    };
  }
};

const getListFollowers = async (userId) => {
  try {
    const { rows } = await poolPg.query(
      "SELECT follower.user_id, avatar, CONCAT(first_name, ' ', last_name) AS fullname FROM users INNER JOIN follower ON users.user_id = follower.user_id WHERE follower.follower_id = $1 ORDER BY follower.created_at DESC",
      [userId]
    );

    return rows;
  } catch (error) {
    return {
      code: 500,
      message: error.message,
    };
  }
};

const getListFollowings = async (userId) => {
  try {
    const { rows } = await poolPg.query(
      "SELECT follower.follower_id, avatar, CONCAT(first_name, ' ', last_name) AS fullname FROM users INNER JOIN follower ON users.user_id = follower.follower_id WHERE follower.user_id = $1",
      [userId]
    );
    console.log(rows);
    return rows;
  } catch (error) {
    return {
      code: 500,
      message: error.message,
    };
  }
};

const getListNotFollowers = async (userId) => {
  try {
    const { rows } = await poolPg.query(
      "SELECT user_id, avatar, CONCAT(first_name, ' ', last_name) AS fullname FROM users WHERE user_id != $1 AND user_id NOT IN (SELECT follower.user_id FROM follower WHERE follower.follower_id = $1) ORDER BY RANDOM () LIMIT 2",
      [userId]
    );

    return rows;
  } catch (error) {
    return {
      code: 500,
      message: error.message,
    };
  }
};

const getUserFollower = async (ownUserId, userId) => {
  try {
    const { rows } = await poolPg.query(
      "SELECT user_id FROM follower WHERE follower_id = $1 AND user_id = $2",
      [ownUserId, userId]
    );
    return rows;
  } catch (error) {
    return {
      code: 500,
      message: error.message,
    };
  }
};

const addFollower = async (userId, ownUserId) => {
  try {
    const { rows } = await poolPg.query(
      "INSERT INTO follower (user_id, follower_id) VALUES ($1, $2); ",
      [userId, ownUserId]
    );

    return rows;
  } catch (error) {
    return {
      code: 500,
      message: error.message,
    };
  }
};

const removeFollower = async (userId, ownUserId) => {
  try {
    console.log(userId, ownUserId);
    const rows = await poolPg.query(
      "DELETE FROM follower WHERE user_id = $1 AND follower_id = $2",
      [userId, ownUserId]
    );

    return rows;
  } catch (error) {
    return {
      code: 500,
      message: error.message,
    };
  }
};

module.exports = {
  getInfoUser,
  getListFollowers,
  getListFollowings,
  getListNotFollowers,
  getUserFollower,
  getTotalFollower,
  getTotalFollowing,
  updateInfoUser,
  addFollower,
  removeFollower,
};
