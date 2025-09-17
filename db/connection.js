const { Pool } = require("pg");

require("dotenv").config();

const db = new Pool();

module.exports = db;

