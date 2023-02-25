const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "pass",
  database: "social",
  max: 20,
});

pool.connect((err, client, release) => {
  if (err) {
    console.log(err);
  }
});
pool.query("SELECT * FROM account", (err, result) => {
  if (err) {
    return console.log(err);
  }
  console.log(result.rows);
});
