const jwt = require("jsonwebtoken");

/**
 * Middleware to authenticate JWT access token from Authorization header.
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  // Check if Authorization header is present and well-formed
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  // Verify token using JWT_SECRET
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      const errorMsg =
        err.name === "TokenExpiredError"
          ? "Access token expired"
          : "Invalid access token";

      return res.status(401).json({ error: errorMsg });
    }

    // Attach decoded token data (e.g., userId) to request object
    req.user = decoded;
    next();
  });
}

module.exports = authenticateToken;
