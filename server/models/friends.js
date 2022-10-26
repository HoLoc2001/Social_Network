import { sequelize } from "../connectDB.js";
import { DataTypes } from "sequelize";

const friends = sequelize.define("friends", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
  totalFriends: {
    type: DataTypes.SMALLINT,
    defaultValue: 0,
  },
});

// friends.sync();
export default friends;
