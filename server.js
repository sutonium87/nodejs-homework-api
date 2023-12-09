// Import the Express.js application from the "./app" module
const app = require("./app");

// Start the server, listening on port 3000
app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});

// This script serves as the entry point for starting a Node.js server with an Express application.
// The imported app is  a configured instance of an Express.js application, containing routes, middleware, and other settings.
