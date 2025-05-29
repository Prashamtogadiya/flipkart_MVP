// models/user.model.js
const mysqldb = require('../config/mysqldb');

exports.createUser = (username, hashedPassword, callback) => {
  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  mysqldb.query(sql, [username, hashedPassword], callback);
};

exports.findUserByUsername = (username, callback) => {
  const sql = "SELECT * FROM users WHERE username = ?";
  mysqldb.query(sql, [username], callback);
};

exports.findUserById = (id, callback) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  mysqldb.query(sql, [id], callback);
};

exports.updateUserById = (id, data, callback) => {
  const sql = "UPDATE users SET username = ? WHERE id = ?";
  mysqldb.query(sql, [data.username, id], callback);
};

exports.updatePasswordById = (id, hashedPassword, callback) => {
  const sql = "UPDATE users SET password = ? WHERE id = ?";
  mysqldb.query(sql, [hashedPassword, id], callback);
};

exports.storeRefreshToken = (userId, refreshToken, callback) => {
  const sql = "UPDATE users SET refresh_token = ? WHERE id = ?";
  mysqldb.query(sql, [refreshToken, userId], callback);
};

exports.findUserByRefreshToken = (refreshToken, callback) => {
  const sql = "SELECT * FROM users WHERE refresh_token = ?";
  mysqldb.query(sql, [refreshToken], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, null);
    callback(null, results[0]);
  });
};

exports.deleteRefreshToken = (userId, callback) => {
  const sql = "UPDATE users SET refresh_token = NULL WHERE id = ?";
  mysqldb.query(sql, [userId], callback);
};
