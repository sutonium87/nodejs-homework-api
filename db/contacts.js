// Require the 'fs' and 'path' modules
const fs = require("fs/promises");
const path = require("path");

// Define the path to the contacts JSON file
const contactsPath = path.join(__dirname, "contacts.json");

// Function to list all contacts
async function listContacts() {
  try {
    // Read the contents of the contacts file
    const data = await fs.readFile(contactsPath, "utf8");
    // Parse the JSON data
    const contacts = JSON.parse(data);
    // Display the contacts in a table format
    console.table(contacts);
    // Return the array of contacts
    return contacts;
  } catch (error) {
    // Handle errors while reading the file
    console.error("An error occurred while reading the file:", error);
    // Propagate the error
    throw error;
  }
}

// Function to get a contact by ID
async function getContactById(contactId) {
  try {
    // Retrieve the list of contacts
    const contacts = await listContacts();
    // Find the contact with the specified ID
    const contact = contacts.find(({ id }) => id === contactId);

    // If contact is not found, throw an error
    if (!contact) {
      throw new Error(`Contact with id:${contactId} was not found!`);
    }

    // Display the contact details in a table format
    console.table(contact);
    // Return the found contact
    return contact;
  } catch (error) {
    // Handle errors while getting contact by ID
    console.error("An error occurred while getting contact by id:", error);
    // Propagate the error
    throw error;
  }
}

// Function to remove a contact by ID
async function removeContact(contactId) {
  try {
    // Read the contents of the contacts file
    const data = await fs.readFile(contactsPath, "utf-8");
    // Parse the JSON data
    const contacts = JSON.parse(data);
    // Find the index of the contact with the specified ID
    const index = contacts.findIndex((contact) => contact.id === contactId);

    // If contact is not found, log an error and return
    if (index === -1) {
      console.error(`Contact with id:${contactId} was not found!`);
      return;
    }

    // Remove the contact from the list
    contacts.splice(index, 1);
    // Write the updated list of contacts back to the file
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    // Handle errors while removing the contact by ID
    console.error(
      "There was an error while removing the contact by id:",
      error
    );
    // Propagate the error
    throw error;
  }
}

// Function to add a new contact
async function addContact(body) {
  // Check if required fields are missing
  if (!body.name || !body.email || !body.phone) {
    console.error("Missing required name field");
    return;
  }
  try {
    // Read the contents of the contacts file
    const data = await fs.readFile(contactsPath, "utf-8");
    // Parse the JSON data
    const contacts = JSON.parse(data);
    // Create a new contact with a unique ID
    const newContact = { ...body, id: String(Date.now()) };
    // Add the new contact to the list
    contacts.push(newContact);
    // Display the updated list of contacts in a table format
    console.table(contacts);
    // Write the updated list of contacts back to the file
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    // Log a success message
    console.log("Contact successfully added to the list!");
    // Return the newly added contact
    return newContact;
  } catch (error) {
    // Handle errors while adding the contact
    console.error("An error occurred while adding the contact:", error);
  }
}

// Function to update a contact by ID
async function updateContact(contactId, body) {
  // Check if required fields are missing
  if (!body.name || !body.email || !body.phone) {
    console.error(
      "Name, email, or phone field is missing. Please provide the required information."
    );
    return;
  }
  try {
    // Read the contents of the contacts file
    const data = await fs.readFile(contactsPath, "utf-8");
    // Parse the JSON data
    const contacts = JSON.parse(data);
    // Find the index of the contact with the specified ID
    const index = contacts.findIndex((contact) => contact.id === contactId);

    // If contact is not found, log an error and return
    if (index === -1) {
      console.error(`Contact with id:${contactId} was not found!`);
      return;
    }

    // Create an updated contact by merging existing data with the new data
    const updatedContact = { ...contacts[index], ...body };
    // Update the contact in the list
    contacts[index] = updatedContact;
    // Write the updated list of contacts back to the file
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    // Log a success message
    console.log("Contact details have been successfully updated!");
    // Return the updated contact
    return updatedContact;
  } catch (error) {
    // Handle errors while updating the contact
    console.error("An error occurred while updating the contact:", error);
    // Propagate the error
    throw error;
  }
}

// Export the functions for use in other parts of the application
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
// In summary, this module provides functions to interact with a JSON file containing a list of contacts, allowing for listing all contacts, getting a contact by ID, removing a contact by ID, adding a new contact, and updating an existing contact.
// It includes error handling and logs messages for various operations.
