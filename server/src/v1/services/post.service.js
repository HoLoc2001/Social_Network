const { poolPg } = require("../../db/connection_postgres");

const getUserPosts = async (userId, ownUserId, page) => {
  try {
    const { rows } = await poolPg.query(
      `SELECT posts.*, CONCAT(users.first_name, ' ', users.last_name) AS fullname,users.avatar, ('${ownUserId}' = ANY(list_like)) as isLike FROM posts` +
        " INNER JOIN users ON posts.user_id = users.user_id WHERE posts.user_id = $1 ORDER BY posts.created_at DESC LIMIT 5 OFFSET $2",
      [userId, page]
    );
    return rows;
  } catch (error) {
    return {
      code: 500,
      message: error.message,
    };
  }
};

const getPosts = async (userId, page) => {
  try {
    const { rows } = await poolPg.query(
      `SELECT DISTINCT posts.*, CONCAT(users.first_name, ' ', users.last_name) AS fullname, users.avatar, ('${userId}' = ANY(list_like)) as isLike FROM (SELECT follower.user_id FROM follower WHERE follower.follower_id = $1) as followers ` +
        "INNER JOIN posts ON followers.user_id = posts.user_id or posts.user_id = $1 INNER JOIN users ON posts.user_id = users.user_id ORDER BY posts.created_at DESC LIMIT 5 OFFSET $2",
      [userId, page]
    );
    return rows;
  } catch (error) {
    return {
      code: 500,
      message: error.message,
    };
  }
};

const getListLike = async (postId) => {
  try {
    const { rows } = await poolPg.query(
      "SELECT users.user_id, CONCAT(users.first_name, ' ', users.last_name) AS fullname, users.avatar FROM users " +
        "INNER JOIN posts ON users.user_id = ANY(posts.list_like) WHERE posts.post_id = $1",
      [postId]
    );
    return rows;
  } catch (error) {
    return {
      code: 500,
      message: error.message,
    };
  }
};

const addPost = async (userId, content, urlImages) => {
  const { rows } = await poolPg.query(
    "INSERT INTO posts(user_id, post_content, images) VALUES($1, $2, $3) RETURNING *",
    [userId, content, urlImages]
  );
  return rows[0];
};

const updatePost = async (postId, userId, content, images) => {
  const { rows } = await poolPg.query(
    "UPDATE posts SET post_content = $1, images = $2 WHERE post_id = $3 AND user_id = $4 RETURNING post_id, post_content, images",
    [content, images, postId, userId]
  );
  return rows[0];
};

const updateIncrLikePost = async (postId, userId) => {
  const { rows } = await poolPg.query(
    "UPDATE posts SET list_like = ARRAY_APPEND(list_like, $1), total_like = total_like + 1 WHERE post_id = $2 RETURNING list_like",
    [userId, postId]
  );
  return rows[0];
};

const updateDecrLikePost = async (postId, userId) => {
  const { rows } = await poolPg.query(
    "UPDATE posts SET list_like = ARRAY_REMOVE(list_like, $1), total_like = total_like - 1 WHERE post_id = $2 RETURNING list_like",
    [userId, postId]
  );
  return rows[0];
};

const getUserIsLike = async (postId, userId) => {
  const rows = await poolPg.query(
    "SELECT post_id FROM posts WHERE post_id = $1 AND $2 = ANY(list_like)",
    [postId, userId]
  );
  console.log(rows);
  return rows;
};

module.exports = {
  getPosts,
  getUserPosts,
  getListLike,
  addPost,
  updatePost,
  updateIncrLikePost,
  updateDecrLikePost,
  getUserIsLike,
};
