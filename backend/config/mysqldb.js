// // Import the mysql2 package for MySQL operations
// const mysql = require('mysql2');

// // Load environment variables from .env file
// require('dotenv').config();

// // Create a MySQL database connection using environment variables
// const mysqldb = mysql.createConnection({
//   host: process.env.MYSQL_HOST,     // Database host (e.g., localhost)
//   user: process.env.MYSQL_USER,     // MySQL username
//   password: process.env.MYSQL_PASSWORD, // MySQL password
//   database: process.env.MYSQL_DATABASE  // Name of the database
// });

// // Connect to the MySQL database
// mysqldb.connect(err => {
//   if (err) throw err;  // If there's an error, stop and show it
//   console.log('Connected to MySQL'); // Log success message
// });

// // Create a table named 'users' if it doesn't already exist
// mysqldb.query(`
//   CREATE TABLE IF NOT EXISTS users (
//     id INT AUTO_INCREMENT PRIMARY KEY,  
//     username VARCHAR(255) UNIQUE,       
//     password VARCHAR(255)              
//   )
// `);

// // Export the db connection so it can be used in other files
// module.exports = mysqldb;


// mysqldb.js
const mysql = require('mysql2');
require('dotenv').config();

const mysqldb = mysql.createConnection({
  host: process.env.MYSQL_HOST,     
  user: process.env.MYSQL_USER,     
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE  
});

mysqldb.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');

  // Create users table if not exists
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      refresh_token TEXT
    )`;
  
  mysqldb.query(createUsersTable, (err) => {
    if (err) throw err;
    console.log('Users table ensured');
  });
});

module.exports = mysqldb;
