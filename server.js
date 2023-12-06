// Import the 'app' module from the specified path
const app = require("./app");

// Start the server by making it listen on port 3000
app.listen(3000, () => {
  // Display a message in the console when the server is successfully running
  console.log("Server is running. Use our API on port: 3000");
});

// In summary, this code is responsible for starting a server using an Express application (imported from the "app" module).
// The server is configured to listen on port 3000, and a console message is displayed indicating that the server is running and users can access the API on port 3000.
// Essentially, it initiates the server to handle incoming requests and serves the defined routes and functionalities of the application.
