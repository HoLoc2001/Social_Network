import { sequelize } from "../connectDB.js";
import { DataTypes } from "sequelize";

const commentPost = sequelize.define("comment_post", {
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
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
// commentPost.drop();
// commentPost.sync();
export default commentPost;
