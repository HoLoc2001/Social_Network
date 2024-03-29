"use strict";

const { Pool } = require("pg");

process.env.TZ = "Asia/Ho_Chi_Minh";

const poolPg = new Pool({
  connectionString: process.env.DB_PG_HOST_URL,
  // host: process.env.DB_PG_HOST,
  // database: process.env.DB_PG_NAME,
  // port: process.env.DB_PG_PORT,
  // user: process.env.DB_PG_USERNAME,
  // password: process.env.DB_PG_PASSWORD,
  // ssl: true,
  max: 20,
});

poolPg
  .query("SET TIME ZONE +7;")
  .catch((err) => console.error("Error executing query", err.stack));

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    poolPg.connect((err, client, release) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log(`Connected to the database postgres`);
      }
    });
  }

  static getInstance() {
    try {
      if (!Database.instance) {
        Database.instance = new Database();
      }

      return Database.instance;
    } catch (error) {}
  }
}

const instancePG = Database.getInstance();
module.exports = { instancePG, poolPg };
