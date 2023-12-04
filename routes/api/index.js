// Require the Express.js framework
const express = require("express");
// Create a new router instance
const router = express.Router();
// Import functions for managing contacts from the "contacts" module
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../db/contacts");

// Define a route for the root endpoint ("/")
router.get("/", (req, res, next) => {
  // Respond with a JSON message indicating the server is working fine
  res.status(200).json({
    status: "success",
    code: 200,
    data: "Server is working nice!",
  });
  // Call the 'next()' function to pass control to the next middleware
  next();
});

// Define a route for retrieving the list of contacts ("/contacts")
router.get("/contacts", async (req, res, next) => {
  try {
    // Retrieve the list of contacts using the 'listContacts' function
    const contacts = await listContacts();
    // Respond with a JSON object containing the list of contacts
    res.status(200).json({
      status: "success",
      code: 200,
      data: { ...contacts },
    });
  } catch (error) {
    // Handle errors by responding with a 500 status code and an error message
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Error in getting contacts",
    });
  }
});

// Define a route for retrieving a contact by ID ("/:contactId")
router.get("/:contactId", async (req, res, next) => {
  // Extract the 'contactId' parameter from the request parameters
  const { contactId } = req.params;
  try {
    // Retrieve a specific contact by ID using the 'getContactById' function
    const contact = await getContactById(contactId);
    // Respond with a JSON object containing the details of the retrieved contact
    res.status(200).json({
      status: "success",
      code: 200,
      data: { ...contact },
    });
  } catch (error) {
    // Handle errors by responding with a 404 status code and an error message
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
});

// Define a route for adding a new contact ("/contacts")
router.post("/contacts", async (req, res, next) => {
  // Extract the 'name', 'email', and 'phone' from the request body
  const { name, email, phone } = req.body;
  try {
    // Add a new contact using the 'addContact' function
    const data = await addContact({ name, email, phone });
    // Respond with a JSON object containing the added contact data
    res.status(201).json({
      status: "success",
      code: 201,
      data: data,
    });
  } catch (error) {
    // Handle errors by responding with a 400 status code and an error message
    res.status(400).json({
      status: "error",
      code: 400,
      message: "missing required name field",
    });
  }
});

// Define a route for deleting a contact by ID ("/contacts/:contactId")
router.delete("/contacts/:contactId", async (req, res, next) => {
  // Extract the 'contactId' parameter from the request parameters
  const { contactId } = req.params;
  try {
    // Remove a contact by ID using the 'removeContact' function
    await removeContact(contactId);
    // Respond with a JSON message indicating success in deleting the contact
    res.status(200).json({
      status: "success",
      code: 200,
      message: "contact deleted!",
    });
  } catch (error) {
    // Handle errors by responding with a 404 status code and an error message
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not Found!",
    });
  }
});

// Define a route for updating a contact by ID ("/:contactId")
router.put("/:contactId", async (req, res, next) => {
  // Extract the 'contactId' parameter from the request parameters
  const { contactId } = req.params;
  // Extract the 'name', 'email', and 'phone' from the request body
  const { name, email, phone } = req.body;
  // Check if required fields are missing
  if (!name || !email || !phone) {
    // Respond with a 400 status code and an error message if fields are missing
    res.status(400).json({
      status: "error",
      code: 400,
      message: "missing required field",
    });
  }
  try {
    // Update a contact by ID using the 'updateContact' function
    const data = await updateContact(contactId, { name, email, phone });
    // Respond with a JSON object containing the updated contact data
    res.status(200).json({
      status: "success",
      code: 200,
      data: data,
    });
  } catch (error) {
    // Handle errors by responding with a 404 status code and an error message
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
});

// Export the router for use in other parts of the application
module.exports = router;

// In summary, this code sets up an Express router to handle basic CRUD operations for managing contacts, providing endpoints for listing contacts, getting a contact by ID, adding a new contact, deleting a contact by ID, and updating a contact by ID.
//  The routes interact with functions from a separate "contacts" module for data manipulation.
