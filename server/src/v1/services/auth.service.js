const { poolPg } = require("../../db/connection_postgres.js");

const addRefreshToken = async (userId, refreshToken) => {
  await poolPg.query(
    "INSERT INTO refresh_tokens (refresh_token, user_id) VALUES ($1, $2) RETURNING refresh_token",
    [refreshToken, userId]
  );
  return true;
};

const getRefreshToken = async ({ userId, refreshToken }) => {
  const { rows } = await poolPg.query(
    "SELECT * FROM refresh_tokens WHERE user_id = $1 AND refresh_token = $2",
    [userId, refreshToken]
  );
  return rows[0];
};

const updateRefreshToken = async (userId, refreshToken) => {
  await poolPg.query(
    "UPDATE refresh_tokens SET refresh_token = $1 WHERE user_id = $2",
    [refreshToken, userId]
  );
  return true;
};

const addUser = async (
  email,
  password,
  firstName,
  lastName,
  birthday,
  city,
  gender
) => {
  const { rows } = await poolPg.query(
    "INSERT INTO users (email, password, first_name, last_name, birthday, city, gender) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_id",
    [email, password, firstName, lastName, birthday, city, gender]
  );
  return rows[0];
};

const getEmailUser = async (email) => {
  const user = await poolPg.query(
    "SELECT user_id FROM users WHERE email = $1",
    [email]
  );
  return user;
};

module.exports = {
  addRefreshToken,
  getRefreshToken,
  updateRefreshToken,
  getEmailUser,
  addUser,
};
