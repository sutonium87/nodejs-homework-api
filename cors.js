// Define CORS options specifying the allowed origin for cross-origin requests as "*"
const corsOptions = {
  origin: "*",
};

// Export the defined CORS options for use in other parts of the application
module.exports = {
  corsOptions,
};

// In summary, this code provides a simple configuration for CORS (Cross-Origin Resource Sharing) by allowing requests from any origin.
// The CORS options are exported for use in other parts of the application, particularly when setting up CORS middleware in the Express app.
