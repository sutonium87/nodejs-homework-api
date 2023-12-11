// Import necessary libraries and modules
const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

// Get the Schema class from Mongoose
const Schema = mongoose.Schema;

// Define the schema for the User model
const userSchema = new Schema({
  // Define password field properties
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  // Define email field properties
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  // Define subscription field properties
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  // Define token field properties
  token: {
    type: String,
    default: null,
  },
  // Define avatarURL field properties
  avatarURL: {
    type: String,
    minLength: 2,
  },
  // Define a boolean field 'verify' indicating whether the user's email is verified or not
  verify: {
    type: Boolean,
    default: false,
  },

  // Define a string field 'verificationToken' required for email verification
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

// Middleware to hash the password before saving to the database
userSchema.pre("save", async function (next) {
  // Generate a salt using bcrypt
  const salt = await bcrypt.genSalt();
  // Hash the password with the generated salt
  this.password = await bcrypt.hash(this.password, salt);
  // Continue with the save operation
  next();
});

// Static method to login user
userSchema.statics.login = async function (email, password) {
  // Find a user with the provided email
  const user = await this.findOne({ email });
  // If user is found
  if (user) {
    // Compare the provided password with the hashed password
    const auth = await bcrypt.compare(password, user.password);
    // If authentication is successful, return the user
    if (auth) {
      return user;
    }
    // If authentication fails, throw an error
    throw Error("incorrect password");
  }
  // If user is not found, throw an error
  throw Error("incorrect email");
};

// Middleware to generate a default avatar URL using Gravatar
userSchema.pre("save", function (next) {
  // If avatarURL is not provided, generate Gravatar URL based on email
  if (!this.avatarURL) {
    this.avatarURL = gravatar.url(
      this.email,
      { s: "250", r: "pg", d: "identicon" },
      true
    );
  }
  // Continue with the save operation
  next();
});

// Create a Mongoose model named "User" based on the defined schema
const User = mongoose.model("user", userSchema);

// Export the User model for use in other parts of the application
module.exports = User;

// In summary The code defines a user schema with password hashing and Gravatar avatar URL generation.
// It includes a static method for user login, making it convenient to authenticate users.
// The schema is designed to handle user-related information like passwords, emails, subscriptions, tokens, and avatar URLs.
// The model is ready for use in a MongoDB database, providing methods for user creation, authentication, and updates.
// This code essentially sets up a robust user schema and model with security measures like password hashing, making it suitable for user authentication in a web application.
