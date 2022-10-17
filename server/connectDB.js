import env from "dotenv";
import { Sequelize } from "sequelize";

env.config();

export const sequelize = new Sequelize(
  "social_network",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: "localhost",
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
      timezone: "+07:00", // timezone vietnam
    },
    timezone: "+07:00", // timezone vietnam
    // operatorsAliases: false,
  }
);

export const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Successfully connected to our db");
  } catch (error) {
    console.log(error);
  }
};
