"use strict";

const { Pool } = require("pg");

process.env.TZ = "Asia/Ho_Chi_Minh";

const poolPg = new Pool({
  host: process.env.DB_PG_HOST,
  database: process.env.DB_PG_NAME,
  port: process.env.DB_PG_PORT,
  user: process.env.DB_PG_USERNAME,
  password: process.env.DB_PG_PASSWORD,
  max: 20,
});

poolPg
  .query("SET TIME ZONE +7")
  .catch((err) => console.error("Error executing query", err.stack));

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    poolPg.connect((err, client, release) => {
      if (err) {
        console.log(err);
      }
      console.log(`Connected to the database postgres`);
    });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instancePG = Database.getInstance();
module.exports = { instancePG, poolPg };
