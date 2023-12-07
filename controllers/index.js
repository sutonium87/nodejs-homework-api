// Import the 'services' module from the specified path
const services = require("../services/index.js");

// Define a function to handle GET requests for all contacts
const get = async (req, res, next) => {
  try {
    // Call the 'getAllContacts' function from the 'services' module
    const results = await services.getAllContacts();
    // Respond with a JSON object containing the retrieved contacts
    res.json({
      status: "success",
      code: 200,
      data: results,
    });
  } catch (error) {
    // Handle errors by sending a JSON response with an error message
    res
      .status(400)
      .json({ status: "error", code: 400, message: error.message });
    next(error);
  }
};

// Define a function to handle POST requests for creating a new contact
const create = async (req, res, next) => {
  try {
    // Destructure the request body to extract contact details
    const { name, email, phone, favorite } = req.body;
    // Call the 'addContact' function from the 'services' module
    const result = await services.addContact({ name, email, phone, favorite });
    // Respond with a JSON object containing the newly created contact
    res.status(201).json({ status: "success", code: 201, data: result });
  } catch (error) {
    // Handle errors by sending a JSON response with an error message
    console.log(error);
    res.status(404).json({
      status: "error",
      code: 404,
      message: error.message,
    });
    next(error);
  }
};

// Define a function to handle GET requests for a specific contact by ID
const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    // Call the 'getContactById' function from the 'services' module
    const result = await services.getContactById(contactId);
    // Respond with a JSON object containing the retrieved contact
    if (result) {
      res.json({ status: "success", code: 200, data: result });
    }
  } catch (error) {
    // Handle errors by sending a JSON response with an error message
    res.error(404).json({ status: "error", code: 404 });
    next(error);
  }
};

// Define a function to handle DELETE requests for removing a contact by ID
const remove = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    // Call the 'removeContact' function from the 'services' module
    const result = await services.removeContact(contactId);
    // Respond with a JSON object indicating successful contact deletion
    if (result) {
      res.json({ status: "success", code: 200, message: "contact deleted" });
    }
  } catch (error) {
    // Handle errors by sending a JSON response with an error message
    res
      .error(404)
      .json({ status: "error", code: 404, message: "contact not found" });
  }
};

// Define a function to handle PUT requests for updating a contact by ID
const update = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;
  try {
    // Call the 'updateContact' function from the 'services' module
    const result = await services.updateContact(contactId, {
      name,
      email,
      phone,
      favorite,
    });
    // Respond with a JSON object containing the updated contact
    if (result) {
      res.status(200).json({ status: "success", code: 200, data: result });
    }
  } catch (error) {
    // Handle errors by sending a JSON response with an error message
    res.error(404).json({ status: "error", code: 404 });
  }
};

// Define a function to handle PATCH requests for updating the status of a contact by ID
const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  try {
    // Call the 'updateStatusContact' function from the 'services' module
    const result = await services.updateStatusContact(contactId, { favorite });
    // Respond with a JSON object containing the updated contact status
    if (result) {
      res.status(200).json({ status: "updated", code: 200, data: result });
    }
  } catch (error) {
    // Handle errors by sending a JSON response with an error message
    console.log(error);
    res.status(404).json({ status: "error", code: 404, message: "Not found" });
  }
};

// Export all the defined functions for use in other parts of the application
module.exports = { get, create, getById, remove, update, updateStatus };

// In summary, this code defines Express route handler functions for handling CRUD operations on contacts.
//  These functions interact with the services module to perform database operations and respond to HTTP requests with appropriate JSON data or error messages.
