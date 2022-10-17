import { sequelize } from "../connectDB.js";
import { DataTypes } from "sequelize";

const photoPost = sequelize.define("photo_post", {
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "posts",
      key: "id",
    },
  },
  index: {
    type: DataTypes.TINYINT,
    allowNull: false,
    primaryKey: true,
  },
  photo: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
});
// photoPost.drop();
// photoPost.sync();
export default photoPost;
