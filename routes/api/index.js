// Import the 'express' module
const express = require("express");

// Create an instance of an Express router
const router = express.Router();

// Import the controller module, which contains the route handlers
const controller = require("../../controllers/index.js");

// Import the 'auth' middleware for handling authentication
const { auth } = require("../../middlewares/authToken");

// Define a route for getting all contacts
router.get("/contacts", auth, controller.get);

// Define a route for creating a new contact
router.post("/contacts", auth, controller.create);

// Define a route for getting a specific contact by ID
router.get("/contacts/:contactId", auth, controller.getById);

// Define a route for deleting a contact by ID
router.delete("/contacts/:contactId", auth, controller.remove);

// Define a route for updating a contact by ID
router.put("/contacts/:contactId", auth, controller.update);

// Define a route for updating the favorite status of a contact by ID
router.patch("/contacts/:contactId/favorite", auth, controller.updateStatus);

// Export the router to be used in other parts of the application
module.exports = router;

// In summary, this router module sets up routes for managing contacts, and each route is associated with a specific controller function that handles the corresponding CRUD operation.
//  The auth middleware is used to secure these routes, ensuring that only authenticated users can access them.
