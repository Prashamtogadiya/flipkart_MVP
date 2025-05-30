// Import the mysql2 package to interact with MySQL database
const mysql = require('mysql2');

// Load environment variables from .env file
require('dotenv').config();

// Create a connection to the MySQL database using credentials from .env
const mysqldb = mysql.createConnection({
  host: process.env.MYSQL_HOST,       // Database host (e.g., localhost)
  user: process.env.MYSQL_USER,       // MySQL username
  password: process.env.MYSQL_PASSWORD, // MySQL password
  database: process.env.MYSQL_DATABASE  // Database name
});

// Establish the MySQL connection
mysqldb.connect(err => {
  if (err) throw err; // If connection fails, throw an error
  console.log('Connected to MySQL');

  // SQL query to create the 'users' table if it doesn't already exist
  // -- Unique user ID (auto-increment)
  // -- Username (must be unique and not empty)
  // -- Hashed password
  // -- Token for refreshing JWT tokens 
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,     
      username VARCHAR(255) UNIQUE NOT NULL, 
      password VARCHAR(255) NOT NULL,        
      refresh_token TEXT                     
    )`;

  // Run the query to ensure the users table is created
  mysqldb.query(createUsersTable, (err) => {
    if (err) throw err;
    console.log('Users table ensured'); // Confirm table creation or existence
  });
});

// Export the connection object so it can be used in other files
module.exports = mysqldb;
