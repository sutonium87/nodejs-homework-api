// Import the 'express' module
const express = require("express");

// Create an instance of an Express router
const router = express.Router();

// Import the 'authController' module, which contains route handler functions
const authController = require("../../controllers/authController");

// Import 'multer' for handling file uploads
const multer = require("multer");

// Import 'path' module for working with file paths
const path = require("path");

// Import the 'auth' middleware for handling authentication
const { auth } = require("../../middlewares/authToken");

// Configure multer for storing uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/avatars");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Create a multer instance with the configured storage
const upload = multer({ storage: storage });

// Define a route for user signup
router.post("/signup", authController.signup_post);

// Define a route for user login
router.post("/login", authController.login_post);

// Define a route for user logout (protected by the 'auth' middleware)
router.get("/logout", auth, authController.logout_get);

// Define a route for retrieving current user data (protected by the 'auth' middleware)
router.get("/current", auth, authController.usersData_get);

// Define a route for updating avatars (protected by the 'auth' middleware and handles file upload)
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  authController.uploadAvatar
);

// Export the router to be used in other parts of the application
module.exports = router;

// In summary, this router module sets up routes for user authentication and related actions.
//  It leverages the authController to handle the logic of these routes, uses the multer middleware for handling avatar uploads, and incorporates the auth middleware to ensure that certain routes are protected and only accessible to authenticated users.
