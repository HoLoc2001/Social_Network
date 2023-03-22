const { poolPg } = require("../../db/connection_postgres.js");

const getInfoUser = async (userId) => {
  try {
    const { rows } = await poolPg.query(
      "SELECT user_id, avatar, CONCAT(first_name, ' ', last_name) AS fullname, birthday, gender, city FROM users WHERE user_id = $1",
      [userId]
    );
    // const [rows] = await pool.execute("call get_user(?)", [userId]);
    return rows[0];
  } catch (error) {
    return {
      code: 500,
      message: error.message,
    };
  }
};

const updateUser = async (
  userId,
  avatar = DEFAULT,
  first_name = DEFAULT,
  last_name = DEFAULT,
  birthday = DEFAULT,
  gender = DEFAULT,
  city = DEFAULT
) => {
  try {
    const { rows } = await poolPg.query(
      "UPDATE users SET avatar = $1, first_name = $2, last_name = $3, birthday = $4, gender = $5, city = $6" +
        " WHERE user_id = $7 RETURNING avatar, first_name, last_name, birthday, gender, city;",
      [avatar, first_name, last_name, birthday, gender, city, userId]
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
      "SELECT follower.user_id, avatar, CONCAT(first_name, ' ', last_name) AS fullname FROM users INNER JOIN follower ON users.user_id = follower.user_id WHERE follower.follower_id = $1",
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

const getListNotFollowers = async (userId) => {
  try {
    const { rows } = await poolPg.query(
      "SELECT user_id, avatar, CONCAT(first_name, ' ', last_name) AS fullname FROM users WHERE user_id != $1 AND user_id NOT IN (SELECT follower.user_id FROM follower WHERE follower.follower_id = $1) LIMIT 2",
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

module.exports = {
  getInfoUser,
  getListFollowers,
  getListNotFollowers,
  updateUser,
};
