const { poolPg } = require("../../db/connection_postgres.js");

const postImage = async ({ images, userId, postId }) => {
  try {
    const { rows } = await poolPg.query("INSERT INTO posts ");
  } catch (error) {}
};
