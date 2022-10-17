import { sequelize } from "../connectDB.js";
import { DataTypes } from "sequelize";

const refreshToken = sequelize.define("refresh_tokens", {
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  expiredTime: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});
// refreshToken.sync();
export default refreshToken;
