const mysql = require('mysql2');
require("dotenv").config()

const DB_HOST = process.env.DB_HOST
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

const connection = mysql.createConnection({
  host: DB_HOST, 
  user: 'app_user', 
  password: DB_PASSWORD,  
  database: DB_DATABASE, 
  port: DB_PORT 
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

module.exports = connection;