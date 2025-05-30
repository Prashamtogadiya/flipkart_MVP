const mysqldb = require('../config/mysqldb');

// Create a new user with username and hashed password
exports.createUser = (username, hashedPassword, callback) => {
  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  mysqldb.query(sql, [username, hashedPassword], callback);
};

// Find a user by their username
exports.findUserByUsername = (username, callback) => {
  const sql = "SELECT * FROM users WHERE username = ?";
  mysqldb.query(sql, [username], callback);
};

// Find a user by their user ID
exports.findUserById = (id, callback) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  mysqldb.query(sql, [id], callback);
};

// Update a user's username by their ID
exports.updateUserById = (id, data, callback) => {
  const sql = "UPDATE users SET username = ? WHERE id = ?";
  mysqldb.query(sql, [data.username, id], callback);
};

// Update a user's password by their ID
exports.updatePasswordById = (id, hashedPassword, callback) => {
  const sql = "UPDATE users SET password = ? WHERE id = ?";
  mysqldb.query(sql, [hashedPassword, id], callback);
};

// Store a new refresh token for a user
exports.storeRefreshToken = (userId, refreshToken, callback) => {
  const sql = "UPDATE users SET refresh_token = ? WHERE id = ?";
  mysqldb.query(sql, [refreshToken, userId], callback);
};

// Find a user by their refresh token
exports.findUserByRefreshToken = (refreshToken, callback) => {
  const sql = "SELECT * FROM users WHERE refresh_token = ?";
  mysqldb.query(sql, [refreshToken], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, null);    
    callback(null, results[0]);
  });
};

// Remove a user's refresh token (used for logout)
exports.deleteRefreshToken = (userId, callback) => {
  const sql = "UPDATE users SET refresh_token = NULL WHERE id = ?";
  mysqldb.query(sql, [userId], callback);
};
