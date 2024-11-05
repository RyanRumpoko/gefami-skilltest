const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "gefami_sql",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

module.exports = pool;
