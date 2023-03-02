"use strict";

const { Pool } = require("pg");

const poolPg = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "pass",
  database: "social",
  max: 20,
});

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
