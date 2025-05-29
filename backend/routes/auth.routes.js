// routes/auth.routes.js
const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controllers');
const authenticateToken = require('../middlewares/auth.middleware'); // Middleware to verify JWT token
const { signupSchema, loginSchema } = require('../validations/auth.validation'); // Joi or any validation schemas
const { validateBody } = require('../middlewares/validate.middleware'); // Middleware to validate request body

// Signup route
router.post('/signup', validateBody(signupSchema), authController.signup);

// Login route
router.post('/login', validateBody(loginSchema), authController.login);

// Protected route example
router.get('/protected', authenticateToken, authController.protected);

// Logout route
router.post('/logout', authenticateToken, authController.logout);

// Get profile
router.get('/profile', authenticateToken, authController.getProfile);

// Update profile username
router.put('/updateprofile', authenticateToken, authController.updateProfile);

// Update password
router.put('/update-password', authenticateToken, authController.updatePassword);

// Refresh token route
router.post('/refresh-token', authController.refreshToken);

module.exports = router;
