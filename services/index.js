// Import the 'Contact' model from the specified path
const Contact = require("./schemas/ContactSchema");

// Define a function to retrieve all contacts from the database
const getAllContacts = async () => {
  return Contact.find();
};

// Define a function to retrieve a contact by its ID from the database
const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  return contact;
};

// Define a function to remove a contact by its ID from the database
const removeContact = async (id) => {
  const result = await Contact.findByIdAndDelete(id);
  return result;
};

// Define a function to add a new contact to the database
const addContact = async ({ name, email, phone, favorite }) => {
  return Contact.create({ name, email, phone, favorite });
};

// Define a function to update a contact by its ID in the database
const updateContact = async (id, updateData) => {
  const result = await Contact.findByIdAndUpdate({ _id: id }, updateData, {
    new: true,
  });
  return result;
};

// Define a function to update the status of a contact by its ID in the database
const updateStatusContact = async (id, statusUpdate) => {
  console.log(id, statusUpdate);

  return Contact.findByIdAndUpdate(
    { _id: id },
    { $set: statusUpdate },
    { new: true }
  );
};

// Export all the defined functions for use in other parts of the application
module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};

// In summary, this code defines functions that encapsulate various CRUD operations on the "contacts" collection in the MongoDB database.
// These functions use the Mongoose model('Contact') to interact with the underlying MongoDB database, providing a structured and modular way to perform database operations.
