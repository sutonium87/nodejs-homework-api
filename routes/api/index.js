// Import the 'express' module and assign it to the 'express' variable
const express = require("express");

// Create a new Router instance using the 'express' module
const router = express.Router();

// Import the 'controller' module from the specified path
const controller = require("../../controllers/index.js");

// Define a route for handling GET requests to "/contacts" and link it to the 'get' function in the 'controller' module
router.get("/contacts", controller.get);

// Define a route for handling POST requests to "/contacts" and link it to the 'create' function in the 'controller' module
router.post("/contacts", controller.create);

// Define a route for handling GET requests to "/contacts/:contactId" and link it to the 'getById' function in the 'controller' module
router.get("/contacts/:contactId", controller.getById);

// Define a route for handling DELETE requests to "/contacts/:contactId" and link it to the 'remove' function in the 'controller' module
router.delete("/contacts/:contactId", controller.remove);

// Define a route for handling PUT requests to "/contacts/:contactId" and link it to the 'update' function in the 'controller' module
router.put("/contacts/:contactId", controller.update);

// Define a route for handling PATCH requests to "/contacts/:contactId/favorite" and link it to the 'updateStatus' function in the 'controller' module
router.patch("/contacts/:contactId/favorite", controller.updateStatus);

// Export the 'router' module for use in other parts of the application
module.exports = router;

// In summary, this code sets up routes for various CRUD operations related to contacts, linking each route to corresponding functions in the 'controller' module, and exports the configured router for use in the broader application.
