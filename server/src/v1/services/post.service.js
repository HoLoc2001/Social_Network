const { poolPg } = require("../../db/connection_postgres");

const getUserPosts = async (userId, ownUserId, page) => {
  try {
    const { rows } = await poolPg.query(
      `SELECT posts.*, ARRAY_LENGTH("list_like",1) as total_like ,CONCAT(users.first_name, ' ', users.last_name) AS fullname,users.avatar, ('${ownUserId}' = ANY(list_like)) as isLike FROM posts` +
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
      `SELECT DISTINCT posts.*, CONCAT(users.first_name, ' ', users.last_name) AS fullname, users.avatar FROM (SELECT follower.user_id FROM follower WHERE follower.follower_id = $1) as followers ` +
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

const getPost = async (userId, postId) => {
  try {
    const { rows } = await poolPg.query(
      `SELECT DISTINCT posts.*, ARRAY_LENGTH("list_like",1) as total_like , CONCAT(users.first_name, ' ', users.last_name) AS fullname, users.avatar, ('${userId}' = ANY(list_like)) as isLike FROM  ` +
        "posts INNER JOIN users ON posts.user_id = users.user_id WHERE posts.post_id = $1",
      [postId]
    );
    return rows[0];
  } catch (error) {
    return {
      code: 500,
      message: error.message,
    };
  }
};

const getListLike = async (listUser) => {
  try {
    console.log(listUser);
    const { rows } = await poolPg.query(
      "SELECT user_id, CONCAT(first_name, ' ', last_name) AS fullname, avatar FROM users WHERE user_id = ANY($1)",
      [listUser]
    );
    return rows;
  } catch (error) {
    return {
      code: 500,
      message: error.message,
    };
  }
};

const getCommentPost = async (postId) => {
  try {
    const { rows } = await poolPg.query(
      "SELECT users.user_id, users.avatar, CONCAT(users.first_name, ' ', users.last_name) AS fullname, post_comments.comment_id, post_comments.post_id, post_comments.comment_content FROM users INNER JOIN post_comments ON users.user_id = post_comments.user_id WHERE post_id = $1 ORDER BY post_comments.created_at DESC",
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

const addCommentPost = async (postId, userId, content) => {
  try {
    const { rows } = await poolPg.query(
      "INSERT INTO post_comments (user_id, post_id, comment_content) VALUES ($1, $2, $3) RETURNING comment_id",
      [userId, postId, content]
    );

    return rows[0].comment_id;
  } catch (error) {
    return {
      code: 500,
      message: error.message,
    };
  }
};

const updateIncrTotalComment = async (postId) => {
  try {
    const { rows } = await poolPg.query(
      "UPDATE posts SET total_comment = total_comment + 1 WHERE post_id = $1 RETURNING total_comment",
      [postId]
    );

    return rows[0].total_comment;
  } catch (error) {
    return {
      code: 500,
      message: error.message,
    };
  }
};

const updateDecrTotalComment = async (postId) => {
  try {
    const { rows } = await poolPg.query(
      "UPDATE posts SET total_comment = total_comment - 1 WHERE post_id = $1 RETURNING total_comment",
      [postId]
    );

    return rows[0].total_comment;
  } catch (error) {
    return {
      code: 500,
      message: error.message,
    };
  }
};

const getTotalComment = async (postId) => {
  try {
    const { rows } = await poolPg.query(
      "SELECT total_comment FROM posts WHERE post_id = $1",
      [postId]
    );

    return rows[0].total_comment;
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

const updateComment = async (commentId, content, userId) => {
  const { rows } = await poolPg.query(
    "UPDATE post_comments SET comment_content = $1 WHERE comment_id = $2 AND user_id = $3",
    [content, commentId, userId]
  );
  return rows;
};

const updateIncrLikePost = async (postId, userId) => {
  const { rows } = await poolPg.query(
    "UPDATE posts SET list_like = ARRAY_APPEND(list_like, $1) WHERE post_id = $2 RETURNING list_like",
    [userId, postId]
  );
  return rows[0];
};

const updateDecrLikePost = async (postId, userId) => {
  const { rows } = await poolPg.query(
    "UPDATE posts SET list_like = ARRAY_REMOVE(list_like, $1) WHERE post_id = $2 RETURNING list_like",
    [userId, postId]
  );
  return rows[0];
};

const getUserIsLike = async (postId, userId) => {
  const rows = await poolPg.query(
    "SELECT post_id FROM posts WHERE post_id = $1 AND $2 = ANY(list_like)",
    [postId, userId]
  );
  return rows;
};

const deletePost = async (postId, userId) => {
  const { rows } = await poolPg.query(
    "DELETE FROM posts WHERE post_id = $1 AND user_id = $2 RETURNING post_id",
    [postId, userId]
  );
  return rows[0].post_id;
};

const deleteComment = async (comment_id, postId, userId) => {
  const { rows } = await poolPg.query(
    "DELETE FROM post_comments WHERE comment_id = $1 AND post_id = $2 AND user_id = $3 RETURNING post_id, comment_id ",
    [comment_id, postId, userId]
  );
  return rows[0];
};

const deleteComments = async (postId, userId) => {
  const { rows } = await poolPg.query(
    "DELETE FROM post_comments WHERE post_id = $1 AND EXISTS (SELECT 1 FROM posts WHERE post_id = $1 AND user_id = $2) RETURNING post_id ",
    [postId, userId]
  );
  return rows[0];
};

module.exports = {
  getPosts,
  getPost,
  getUserPosts,
  getListLike,
  getCommentPost,
  getUserIsLike,
  getTotalComment,
  addCommentPost,
  addPost,
  updatePost,
  updateIncrTotalComment,
  updateDecrTotalComment,
  updateComment,
  updateIncrLikePost,
  updateDecrLikePost,
  deletePost,
  deleteComment,
  deleteComments,
};
