// Define CORS options configuration object
const corsOptions = {
  origin: "*", // Allow requests from any origin (wildcard '*')
};

// Export the CORS options configuration object
module.exports = {
  corsOptions,
};

// This code is a common pattern used to centralize and configure CORS options in a single file (corsConfig.js).
// By exporting the corsOptions object, it becomes easy to manage and update CORS settings across different parts of the application.
// The wildcard (*) in origin allows the server to accept requests from any origin, but in a production environment, you might want to specify specific origins for security reasons.
// In summary, this code provides a flexible way to configure and manage CORS settings in a Node.js application, promoting code organization and reusability.
