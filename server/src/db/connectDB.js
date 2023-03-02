require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST_LOCAL,
  // port: process.env.DB_PORT_LOCAL,
  user: process.env.DB_USERNAME_LOCAL,
  database: process.env.DB_NAME_LOCAL,
  password: process.env.DB_PASSWORD_LOCAL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
