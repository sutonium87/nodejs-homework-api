const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define the schema for the Contact model
const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
    minLength: 2,
  },
  email: {
    type: String,
    required: true,
    minLength: 3,
  },
  phone: {
    type: String,
    required: true,
    minLength: 5,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

// Create a Mongoose model named "Contact" based on the defined schema
const Contact = mongoose.model("contact", contactSchema);

// Export the Contact model for use in other parts of the application
module.exports = Contact;

// In summary This code encapsulates the definition of the Contact model, making it reusable and maintainable.
//  It can be used to interact with the MongoDB database to perform CRUD(Create, Read, Update, Delete) operations on contacts.
