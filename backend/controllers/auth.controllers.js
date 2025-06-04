// Import required modules
const bcrypt = require("bcrypt"); // for hashing and comparing passwords
const jwt = require("jsonwebtoken"); // for generating and verifying JWT tokens
const userModel = require("../models/user.model"); // database operations for user

// Secrets used to sign JWT tokens
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const SALT_ROUNDS = 10; // Number of rounds for password hashing

// Sign up controller
exports.signup = (req, res) => {
  const { username, password } = req.body;

  // Check if both username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  // Hash the password before storing
  bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: "Error hashing password" });

    // Store user in database
    userModel.createUser(username, hashedPassword, (err) => {
      if (err) {
        // Check if username already exists
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ message: "Username already exists" });
        }
        return res.status(500).json({ message: "Database error" });
      }
      res.status(201).json({ message: "User registered" });
    });
  });
};

// Login controller
exports.login = (req, res) => {
  const { username, password } = req.body;

  // Check if both fields are filled
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  // Find user by username
  userModel.findUserByUsername(username, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = results[0];

    // Compare entered password with stored hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err)
        return res.status(500).json({ message: "Error comparing passwords" });
      if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials" });

      // Generate access and refresh tokens
      const accessToken = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "15m" } // short-lived token
      );

      const refreshToken = jwt.sign(
        { id: user.id },
        JWT_REFRESH_SECRET,
        { expiresIn: "7d" } // long-lived token
      );

      // Store refresh token in DB
      userModel.storeRefreshToken(user.id, refreshToken, (err) => {
        if (err) return res.status(500).json({ message: "Token save failed" });
        res.json({
          user: {
            id: user.id, // ✅ Add this line
            username: user.username,
          },
          accessToken,
          refreshToken,
        });
      });
    });
  });
};

// Get user profile
exports.getProfile = (req, res) => {
  const userId = req.user.id; // Get user ID from token

  // Find user in database by ID
  userModel.findUserById(userId, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = results[0];
    res.json({ id: user.id, username: user.username });
  });
};

// Update username
exports.updateProfile = (req, res) => {
  const userId = req.user.id;
  const { username } = req.body;

  // Make sure username is provided
  if (!username) {
    return res.status(400).json({ message: "Username required" });
  }

  // Update username in database
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

// Update password
exports.updatePassword = (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;

  // Both old and new passwords are required
  if (!oldPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Old and new passwords are required" });
  }

  // Get user info from DB
  userModel.findUserById(userId, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = results[0];

    // Check if old password is correct
    bcrypt.compare(oldPassword, user.password, (err, isMatch) => {
      if (err)
        return res.status(500).json({ message: "Error comparing passwords" });
      if (!isMatch)
        return res.status(401).json({ message: "Old password is incorrect" });

      // Hash new password and update
      bcrypt.hash(newPassword, SALT_ROUNDS, (err, hashedPassword) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Error hashing new password" });

        userModel.updatePasswordById(userId, hashedPassword, (err) => {
          if (err)
            return res.status(500).json({ message: "Error updating password" });
          res.json({ message: "Password updated successfully" });
        });
      });
    });
  });
};

// Logout user
exports.logout = (req, res) => {
  const userId = req.user?.id;

  // If user not logged in
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  // Delete refresh token from DB
  userModel.deleteRefreshToken(userId, (err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.json({ message: "Logged out successfully" });
  });
};

// Protected route example
exports.protected = (req, res) => {
  // Only accessible if token is valid
  res.json({
    message: `Hello ${req.user.username}, you accessed a protected route!`,
  });
};

// Refresh access token using refresh token
exports.refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  // Check if refresh token is provided
  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token required" });

  // Check if refresh token is valid and in DB
  userModel.findUserByRefreshToken(refreshToken, (err, user) => {
    if (err || !user)
      return res.status(403).json({ message: "Invalid refresh token" });

    // Verify token using secret
    jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, decoded) => {
      if (err)
        return res.status(403).json({ message: "Expired or invalid token" });
      console.log(decoded);

      // Generate new access token
      const newAccessToken = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken: newAccessToken });
    });
  });
};
