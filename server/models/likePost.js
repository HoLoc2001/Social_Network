import { sequelize } from "../connectDB.js";
import { DataTypes } from "sequelize";

const likePost = sequelize.define("like_post", {
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "posts",
      key: "id",
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "users",
      key: "id",
    },
  },
});
// likePost.drop();
// likePost.sync();
export default likePost;
