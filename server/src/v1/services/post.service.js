const { poolPg } = require("../../db/connection_postgres");

const getUserPosts = async (userId, page) => {
  try {
    const { rows } = await poolPg.query(
      "SELECT *, EXISTS (SELECT * from post_like WHERE post_like.post_id = posts.post_id AND post_like.user_id = $1) as isLike FROM posts" +
        " WHERE user_id = $1 LIMIT 5 OFFSET $2",
      [userId, page]
    );
    return rows[0];
  } catch (error) {
    return {
      code: 500,
      message: error.message,
    };
  }
};

const addPost = async (userId, content, images) => {
  const { rows } = await poolPg.query(
    "INSERT INTO posts(user_id, post_content, images) VALUES($1, $2, $3) RETURNING *",
    [userId, content, images]
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
    "UPDATE posts SET list_like = ARRAY_APPEND(list_like, $1) AND total_like = total_like + 1 WHERE post_id = $2 RETURNING total_like",
    [userId, postId]
  );
  return rows[0];
};

const updateDecrLikePost = async (postId, userId) => {
  const { rows } = await poolPg.query(
    "UPDATE posts SET list_like = ARRAY_REMOVE(list_like, $1) AND total_like = total_like - 1 WHERE post_id = $2 RETURNING total_like",
    [userId, postId]
  );
  return rows[0];
};

const getUserIsLike = async (postId, userId) => {
  const rows = await poolPg.query(
    "SELECT post_id FROM posts WHERE post_id = $1 AND ANY(list_like) = $2",
    [postId, userId]
  );
  return rows;
};

module.exports = {
  getUserPosts,
  addPost,
  updatePost,
  updateIncrLikePost,
  updateDecrLikePost,
  getUserIsLike,
};
