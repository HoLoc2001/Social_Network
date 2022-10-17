import { sequelize } from "../connectDB.js";
import { DataTypes } from "sequelize";
import Posts from "./posts.js";

const Users = sequelize.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  fullname: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  birthday: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.BLOB,
  },
});

// Users.sync();
export default Users;
