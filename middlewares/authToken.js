// Import the Passport module for authentication
const passport = require("passport");

// Middleware function for JWT authentication
const auth = (req, res, next) => {
  // Use Passport to authenticate using the "jwt" strategy without session support
  passport.authenticate("jwt", { session: false }, (err, user) => {
    // Check if authentication failed (no user or error)
    if (!user || err) {
      // Respond with a 401 Unauthorized status and an error message
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }

    // If authentication is successful, attach the authenticated user to the request object
    req.user = user;

    // Continue to the next middleware or route handler
    next();
  })(req, res, next); // Invoke the Passport authentication middleware
};

// Export the auth middleware for use in other parts of the application
module.exports = { auth };

//This middleware is typically used to protect routes that require authentication.
// If a request lacks a valid JWT or contains an invalid one, it responds with a 401 status, indicating that the user is unauthorized.
// If authentication is successful, the middleware allows the request to proceed to the next middleware or route handler, and the authenticated user is attached to the req.user property for further processing.
