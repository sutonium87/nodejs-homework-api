// Import the 'mongoose' library for working with MongoDB
const mongoose = require("mongoose");

// Create a schema object using the 'mongoose.Schema' constructor
const Schema = mongoose.Schema;

// Define a 'contact' schema specifying the structure of the data in the MongoDB collection
const contact = new Schema({
  // Define a 'name' field with a String type, requiring a minimum length of 2 characters
  name: {
    type: String,
    required: [true, "Set name for contact"],
    minLength: 2,
  },

  // Define an 'email' field with a String type, requiring a minimum length of 3 characters
  email: { type: String, required: true, minLength: 3 },

  // Define a 'phone' field with a String type, requiring a minimum length of 5 characters
  phone: { type: String, required: true, minLength: 5 },

  // Define a 'favorite' field with a Boolean type, defaulting to 'false'
  favorite: { type: Boolean, default: false },
});

// Create a 'Contact' model using the 'mongoose.model' function, specifying the collection name and schema
const Contact = mongoose.model("contacts", contact);

// Export the 'Contact' model for use in other parts of the application
module.exports = Contact;

// In summary, this code sets up a Mongoose schema for a 'contact', defines validation rules for each field, creates a model associated with the "contacts" collection, and exports the model for use in other parts of the application.
// This schema and model provide a structured way to interact with and manipulate data in the MongoDB database.
