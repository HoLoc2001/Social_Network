import { sequelize } from "../connectDB.js";
import { DataTypes } from "sequelize";

const Posts = sequelize.define("Posts", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  totalLike: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  totalComment: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  totalPhoto: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
});
// Posts.drop();
// Posts.sync();
export default Posts;
