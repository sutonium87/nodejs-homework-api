// Import the services module containing contact-related functions
const services = require("../services/index.js");

// Route handler for getting all contacts
const get = async (req, res, next) => {
  try {
    // Call the service to get all contacts
    const results = await services.getAllContacts();
    // Respond with a success message and the retrieved data
    res.json({
      status: "success",
      code: 200,
      data: results,
    });
  } catch (error) {
    // Handle errors and respond with an error message
    res
      .status(400)
      .json({ status: "error", code: 400, message: error.message });
    next(error);
  }
};

// Route handler for creating a new contact
const create = async (req, res, next) => {
  try {
    // Extract contact details from the request body
    const { name, email, phone, favorite } = req.body;
    // Call the service to add a new contact
    const result = await services.addContact({ name, email, phone, favorite });
    // Respond with a success message and the created contact data
    res.status(201).json({ status: "success", code: 201, data: result });
  } catch (error) {
    // Handle errors and respond with an error message
    console.log(error);
    res.status(404).json({
      status: "error",
      code: 404,
      message: error.message,
    });
    next(error);
  }
};

// Route handler for getting a contact by ID
const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    // Call the service to get a contact by ID
    const result = await services.getContactById(contactId);
    // Respond with a success message and the retrieved contact data
    if (result) {
      res.json({ status: "success", code: 200, data: result });
    }
  } catch (error) {
    // Handle errors and respond with an error message
    res.error(404).json({ status: "error", code: 404 });
    next(error);
  }
};

// Route handler for removing a contact by ID
const remove = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    // Call the service to remove a contact by ID
    const result = await services.removeContact(contactId);
    // Respond with a success message
    if (result) {
      res.json({ status: "success", code: 200, message: "contact deleted" });
    }
  } catch (error) {
    // Handle errors and respond with an error message
    res
      .error(404)
      .json({ status: "error", code: 404, message: "contact not found" });
  }
};

// Route handler for updating a contact by ID
const update = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;
  try {
    // Call the service to update a contact by ID
    const result = await services.updateContact(contactId, {
      name,
      email,
      phone,
      favorite,
    });
    // Respond with a success message and the updated contact data
    if (result) {
      res.status(200).json({ status: "success", code: 200, data: result });
    }
  } catch (error) {
    // Handle errors and respond with an error message
    res.error(404).json({ status: "error", code: 404 });
  }
};

// Route handler for updating the status of a contact by ID (e.g., marking as favorite)
const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  try {
    // Call the service to update the status of a contact by ID
    const result = await services.updateStatusContact(contactId, { favorite });
    // Respond with a success message and the updated contact data
    if (result) {
      res.status(200).json({ status: "updated", code: 200, data: result });
    }
  } catch (error) {
    // Handle errors and respond with an error message
    console.log(error);
    res.status(404).json({ status: "error", code: 404, message: "Not found" });
  }
};

// Export the route handler functions for use in other parts of the application
module.exports = { get, create, getById, remove, update, updateStatus };

// In summary the code primarily defines route handler functions for CRUD operations on contacts, utilizing services from the services module.
//  Each route handler corresponds to a specific operation(get all contacts, create contact, get contact by ID, remove contact, update contact, update contact status).
// Error handling is included to respond appropriately in case of success or failure.
