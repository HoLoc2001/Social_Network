const { poolPg } = require("../../db/connection_postgres.js");

const addRefreshToken = async (userId, refreshToken) => {
  await poolPg.query(
    "INSERT INTO refresh_tokens (refresh_token, user_id) VALUES ($1, $2);",
    [refreshToken, userId]
  );
  return true;
};

const getRefreshToken = async ({ refreshToken }) => {
  const { rows } = await poolPg.query(
    "SELECT refresh_token, user_id FROM refresh_tokens WHERE refresh_token = $1;",
    [refreshToken]
  );
  return rows;
};

const updateRefreshToken = async (userId, refreshToken) => {
  try {
    console.log(userId, refreshToken);
    await poolPg.query(
      "UPDATE refresh_tokens SET refresh_token = $1 WHERE user_id = $2;",
      [refreshToken, userId]
    );
    return true;
  } catch (error) {}
};

const signIn = async (email) => {
  const { rows } = await poolPg.query(
    "SELECT user_id, password FROM users WHERE email = $1;",
    [email]
  );
  return rows[0];
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
    "INSERT INTO users (email, password, first_name, last_name, birthday, city, gender) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_id;",
    [email, password, firstName, lastName, birthday, city, gender]
  );
  return rows[0];
};

const getEmailUser = async (email) => {
  const user = await poolPg.query(
    "SELECT user_id FROM users WHERE email = $1;",
    [email]
  );
  return user;
};

const getPassword = async (userId) => {
  const { rows } = await poolPg.query(
    "SELECT password FROM users WHERE user_id = $1;",
    [userId]
  );
  return rows[0];
};

const updatePassword = async (userId, password) => {
  const { rows } = await poolPg.query(
    "UPDATE users SET password = $1 WHERE user_id = $2;",
    [password, userId]
  );
  return rows[0];
};

module.exports = {
  addRefreshToken,
  getRefreshToken,
  updateRefreshToken,
  signIn,
  getEmailUser,
  addUser,
  getPassword,
  updatePassword,
};
