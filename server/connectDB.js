import env from "dotenv";
import mysql from "mysql2/promise";

env.config();

// export const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   {
//     dialect: "mysql",
//     host: "localhost",
//     dialectOptions: {
//       dateStrings: true,
//       typeCast: true,
//       timezone: "+07:00", // timezone vietnam
//     },
//     timezone: "+07:00", // timezone vietnam
//     // operatorsAliases: false,
//   }
// );

// export const connectToDb = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Successfully connected to our db");
//   } catch (error) {
//     console.log(error);
//   }
// };

export const pool = mysql.createPool({
  host: "localhost",
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
