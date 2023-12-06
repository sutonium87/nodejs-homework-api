// Import necessary modules for the application
const express = require("express"); // Express.js for building web applications
const morgan = require("morgan"); // Morgan for HTTP request logging
const cors = require("cors"); // CORS for Cross-Origin Resource Sharing
const dotenv = require("dotenv"); // dotenv for loading environment variables from a .env file
const mongoose = require("mongoose"); // Mongoose for MongoDB object modeling

// Import the main API router from the specified path
const routerApi = require("./routes/api/index.js");

// Create an instance of the Express application
const app = express();

// Load environment variables from the .env file
dotenv.config();

// Import CORS options from the specified path
const coreOptions = require("./cors");

// Apply CORS middleware to the Express app using the configured options
app.use(cors(coreOptions));

// Use Morgan for HTTP request logging in a concise format ("tiny")
app.use(morgan("tiny"));

// Enable parsing of JSON-encoded bodies in requests
app.use(express.json());

// Mount the main API router under the "/api" path
app.use("/api", routerApi);

// Middleware to handle requests for unavailable routes, responding with a JSON object indicating a 404 error
app.use((_, res, __) => {
  res.status(400).json({
    status: "error",
    code: 404,
    message: "The requested route is not available",
    data: "Not found!",
  });
});

// Error handling middleware: log the error stack and respond with a JSON object indicating a 500 Internal Server Error
app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server error!",
  });
});

// Set the port for the server to listen on, either using the value from the environment variable 'PORT' or defaulting to 5000
const PORT = process.env.PORT_SERVER || 5000;

// Obtain the MongoDB connection URL from the environment variable 'DB_URL'
const URL_DB = process.env.DB_URL;

// Connect to the MongoDB database using 'mongoose'
mongoose
  .connect(URL_DB)
  .then(() => {
    // If the database connection is successful, start the Express server and log a success message
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    // If the database connection fails, log an error and exit the process with an error code
    console.log(`Database connection error. Error:${err.message}`);
    process.exit(1);
  });

// In summary, this code sets up an Express application with middleware for logging, CORS, JSON parsing, and error handling.
//  It configures routes for the API, handles unavailable routes, and connects to a MongoDB database.
// The server is then started and listens for incoming requests on the specified port.
