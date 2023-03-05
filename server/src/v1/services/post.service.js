const { poolPg } = require("../../db/connection_postgres");

const getMyPostsService = async ({ userId, page }) => {
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

const addPostService = async ({ userId, content, images }) => {
  const { rows } = await poolPg.query(
    "INSERT INTO posts(user_id, post_content, images) VALUES($1, $2, $3)",
    [userId, content, images]
  );
  return rows[0];
};

module.exports = {
  getMyPostsService,
  addPostService,
};
