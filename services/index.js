// Import the Mongoose model for the "Contact" schema
const Contact = require("./schemas/ContactSchema");

// Function to retrieve all contacts from the "Contact" collection
const getAllContacts = async () => {
  return Contact.find();
};

// Function to retrieve a contact by its ID from the "Contact" collection
const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  return contact;
};

// Function to remove a contact by its ID from the "Contact" collection
const removeContact = async (id) => {
  const result = await Contact.findByIdAndDelete(id);
  return result;
};

// Function to add a new contact to the "Contact" collection
const addContact = async ({ name, email, phone, favorite }) => {
  return Contact.create({ name, email, phone, favorite });
};

// Function to update a contact by its ID in the "Contact" collection
const updateContact = async (id, updateData) => {
  // Find and update the contact with the specified ID, returning the updated contact
  const result = await Contact.findByIdAndUpdate({ _id: id }, updateData, {
    new: true,
  });
  return result;
};

// Function to update the status of a contact by its ID in the "Contact" collection
const updateStatusContact = async (id, statusUpdate) => {
  // Log the ID and status update for debugging purposes
  console.log(id, statusUpdate);

  // Find and update the status of the contact with the specified ID, returning the updated contact
  return Contact.findByIdAndUpdate(
    { _id: id },
    { $set: statusUpdate },
    { new: true }
  );
};

// Export all functions as an object to be used in other parts of the application
module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};

// The module provides functions to perform CRUD operations on contacts in a MongoDB database.
// It leverages Mongoose methods to interact with the "Contact" schema and collection.
// Functions cover retrieving all contacts, retrieving by ID, removing by ID, adding a new contact, and updating contact information and status.
// This module serves as a layer for handling database operations related to contacts in a Node.js application, providing a clean interface for interacting with the underlying MongoDB collection.
