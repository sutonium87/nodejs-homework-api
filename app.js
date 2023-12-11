// Import required packages and modules
const express = require("express"); // Express web application framework
const morgan = require("morgan"); // HTTP request logger middleware
const cors = require("cors"); // Cross-Origin Resource Sharing middleware
const dotenv = require("dotenv"); // Loads environment variables from a .env file
const mongoose = require("mongoose"); // MongoDB object modeling tool

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Configure Passport authentication
require("./middlewares/passportConfig.js");

// Import API routes
const routerApi = require("./routes/api/index.js");
const auth = require("./routes/api/auth.js");
const coreOptions = require("./cors"); // Custom CORS options

// Use middleware and configure the Express app
app.use(express.json()); // Parse incoming JSON data
app.use(cors(coreOptions)); // Enable CORS with custom options
app.use(morgan("tiny")); // Log HTTP requests

// Define API routes
app.use("/api", routerApi);
app.use("/api/users", auth);

// Handle 404 errors
app.use((_, res, __) => {
  res.status(400).json({
    status: "error",
    code: 404,
    message: "The requested route is not available",
    data: "Not found!",
  });
});

// Handle internal server errors
app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server error!",
  });
});

// Establish a connection to the database
const PORT = process.env.PORT_SERVER || 5000;
const DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL) // Connect to MongoDB
  .then(() => {
    console.log("MongoDB connection successful");
    // Start the Express app on the specified port
    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Database connection error. Error:${err.message}`);
    process.exit(1); // Exit the process with an error code
  });

// In summary, the code sets up an Express server, defines API routes, handles common errors, and establishes a connection to a MongoDB database.
//  The server is configured to listen on a specified port, and error handling is in place to ensure graceful degradation in case of issues.
