import env from "dotenv";
import mysql from "mysql2/promise";

env.config();

export const pool = mysql.createPool({
  host: "localhost",
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
