// controllers/auth.controllers.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "your_refresh_secret";
const SALT_ROUNDS = 10;

exports.signup = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: "Error hashing password" });

    userModel.createUser(username, hashedPassword, (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ message: "Username already exists" });
        }
        return res.status(500).json({ message: "Database error" });
      }
      res.status(201).json({ message: "User registered" });
    });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  userModel.findUserByUsername(username, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: "Error comparing passwords" });
      if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

      const accessToken = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        { id: user.id },
        JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
      );

      userModel.storeRefreshToken(user.id, refreshToken, (err) => {
        if (err) return res.status(500).json({ message: "Token save failed" });
        res.json({ accessToken, refreshToken });
      });
    });
  });
};

exports.getProfile = (req, res) => {
  const userId = req.user.id;

  userModel.findUserById(userId, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0) return res.status(404).json({ message: "User not found" });

    const user = results[0];
    res.json({ id: user.id, username: user.username });
  });
};

exports.updateProfile = (req, res) => {
  const userId = req.user.id;
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username required" });
  }

  userModel.updateUserById(userId, { username }, (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ message: "Username already taken" });
      }
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "Profile updated successfully" });
  });
};

exports.updatePassword = (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Old and new passwords are required" });
  }

  userModel.findUserById(userId, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0) return res.status(404).json({ message: "User not found" });

    const user = results[0];

    bcrypt.compare(oldPassword, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: "Error comparing passwords" });
      if (!isMatch) return res.status(401).json({ message: "Old password is incorrect" });

      bcrypt.hash(newPassword, SALT_ROUNDS, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: "Error hashing new password" });

        userModel.updatePasswordById(userId, hashedPassword, (err) => {
          if (err) return res.status(500).json({ message: "Error updating password" });
          res.json({ message: "Password updated successfully" });
        });
      });
    });
  });
};

exports.logout = (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  userModel.deleteRefreshToken(userId, (err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.json({ message: "Logged out successfully" });
  });
};

exports.protected = (req, res) => {
  res.json({ message: `Hello ${req.user.username}, you accessed a protected route!` });
};

exports.refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: "Refresh token required" });

  userModel.findUserByRefreshToken(refreshToken, (err, user) => {
    if (err || !user) return res.status(403).json({ message: "Invalid refresh token" });

    jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Expired or invalid token" });

      const newAccessToken = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken: newAccessToken });
    });
  });
};
