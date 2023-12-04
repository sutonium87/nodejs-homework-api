// Import necessary modules
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

// Import API routes from the specified file
const routerApi = require("./routes/api/index.js");

// Create an Express application
const app = express();

// Load environment variables from a .env file
dotenv.config();

// Define the port for the server to listen on (use provided port or default to 5000)
const PORT = process.env.PORT || 5000;

// Configure CORS settings using options defined in the cors.js file
const coreOptions = require("./cors");
app.use(cors(coreOptions));

// Set up request logging using Morgan with 'tiny' format
app.use(morgan("tiny"));

// Parse JSON request bodies
app.use(express.json());

// Mount the API routes under the "/api" path
app.use("/api", routerApi);

// Handle 404 errors - when a route is not found
app.use((_, res, __) => {
  res.status(400).json({
    status: "error",
    code: 404,
    message: "The requested route is not available",
    data: "Not found!",
  });
});

// Handle general errors - log the error and return a 500 status with an error message
app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server error!",
  });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running. Use our API on port: ${PORT}`);
});

// This code sets up an Express.js server with middleware for handling CORS, request logging, JSON parsing, and error handling.
// It then mounts API routes under the "/api" path, handles 404 errors, and includes a general error handler.
// The server starts listening on the specified port, and relevant log messages are displayed.
