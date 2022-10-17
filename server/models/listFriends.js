import { sequelize } from "../connectDB.js";
import { DataTypes } from "sequelize";

const listFriends = sequelize.define("list_friends", {
  friendId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: "friends",
      key: "id",
    },
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
// listFriends.sync();
export default listFriends;
