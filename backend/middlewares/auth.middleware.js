const jwt = require("jsonwebtoken");

/**
 * Middleware to authenticate JWT access token from Authorization header.
 */
function authenticateToken(req, res, next) {
  let token;
  const authHeader = req.headers["authorization"];

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    return res.status(401).json({ error: "Access token missing or malformed" });
  }

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
