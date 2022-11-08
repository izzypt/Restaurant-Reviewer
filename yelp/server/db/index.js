require("dotenv").config()
const { Pool } = require('pg');

// pools will use environment variables (check .env file)
// for connection information
const pool = new Pool();

module.exports = {
    query : (text, params) => pool.query(text,params)
}