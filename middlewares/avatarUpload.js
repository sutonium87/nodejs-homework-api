// Import the multer and path modules
const multer = require("multer");
const path = require("path");

// Define and configure middleware for file uploads using multer
const storage = multer.diskStorage({
  // Set the destination directory for uploaded files
  destination: function (req, file, cb) {
    cb(null, "./public/avatars");
  },

  // Set the filename for the uploaded file
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Create a multer middleware instance with the specified storage configuration
const upload = multer({ storage: storage });

// In summary, this code sets up middleware for handling file uploads using multer.
// The configuration specifies the destination directory and file naming conventions.
// When a file is uploaded through a route that uses the upload middleware, it will be stored in the specified directory with a unique filename based on the original fieldname, timestamp, and file extension.
