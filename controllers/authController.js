// Import the User schema from the "../services/schemas/UsersSchema" module
const User = require("../services/schemas/UsersSchema");

// Import the 'jsonwebtoken', 'jimp', 'path', and 'fs' modules
const jwt = require("jsonwebtoken");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs");

// Import utility functions 'successResponse' and 'handleErrors' from the "../helpers/responses" module
const { successResponse, handleErrors } = require("../helpers/responses");

// Load environment variables from a .env file and get the secret for JWT from 'process.env.SECRET'
require("dotenv").config();
const secret = process.env.SECRET;

// Set the maximum age for a JWT token to 3 hours
const maxAge = 3 * 60 * 60 * 1000;

// Create a function 'createToken' that generates a JWT token for a given user ID
const createToken = (id) => {
  return jwt.sign({ id }, secret, { expiresIn: maxAge });
};

// Route handler for user signup
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Create a new user using the User schema
    const user = await User.create({ email, password });

    // Generate a JWT token for the user
    const token = createToken(user._id);

    // Update the user's token in the database
    await User.findByIdAndUpdate(user._id, { token });

    // Form a success response and send it as JSON
    const response = successResponse(user, token);
    res.status(201).json(response);
  } catch (err) {
    // Handle errors and send an appropriate JSON response
    const errors = handleErrors(err);
    res.status(errors.statusCode || 400).json({ errors });
  }
};

// Route handler for user login
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Authenticate the user and get user details
    const user = await User.login(email, password);

    // Generate a JWT token for the user
    const token = createToken(user._id);

    // Update the user's token in the database
    await User.findByIdAndUpdate(user._id, { token });

    // Form a success response and send it as JSON
    const response = successResponse(user, token);
    res.status(200).json(response);
  } catch (error) {
    // Handle errors and send an appropriate JSON response
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

// Route handler for user logout
module.exports.logout_get = async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id);

    // Check if the user is already logged out
    if (!user.token) {
      return res.status(200).json({ message: "User already logged out!" });
    }

    // Update the user's token to null in the database
    await User.findByIdAndUpdate(_id, { token: null });

    // Send a success response as JSON
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    // Handle errors and send an appropriate JSON response
    console.error("Error updating user token:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Route handler for retrieving user data
module.exports.usersData_get = async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id);

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Extract relevant user data
    const userData = {
      email: user.email,
      subscription: user.subscription,
    };

    // Send user data as JSON response
    res.status(200).json(userData);
  } catch (error) {
    // Handle errors and send an appropriate JSON response
    console.error("error retrieving user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Route handler for uploading avatars
module.exports.uploadAvatar = async (req, res, next) => {
  console.log("test");

  try {
    // Check if a file is provided in the request
    if (!req.file) {
      return res.status(404).json({ error: "No file provided!" });
    }

    // Generate a unique filename for the uploaded avatar
    const uniqFilename = `${req.user._id}-${Date.now()}${path.extname(
      req.file.originalname
    )}`;

    // Define the destination path for storing the uploaded avatar
    const destinationPath = path.join(
      __dirname,
      `../public/avatars/${uniqFilename}`
    );

    // Read the uploaded image using Jimp, resize, apply transformations, and save it to the destination path
    await Jimp.read(req.file.path)
      .then((image) => {
        return image
          .resize(250, 250)
          .quality(60)
          .greyscale()
          .writeAsync(destinationPath);
      })
      .then(() => {
        // Delete the temporary file after processing
        fs.unlinkSync(req.file.path);
      })
      .catch((error) => {
        throw error;
      });

    // Update the user's avatarURL in the database
    req.user.avatarURL = `/avatars/${uniqFilename}`;
    await req.user.save();

    // Send a success response with the avatarURL as JSON
    res.status(200).json({ avatarURL: req.user.avatarURL });
  } catch (error) {
    // Handle errors and send an appropriate JSON response
    res.status(500).json({ error: error.message });
    next(error);
  }
};
// In summary the code emphasizes user authentication and includes features like signup, login, logout, user data retrieval, and avatar uploading.
//  It uses JWT for authentication and handles errors appropriately, providing JSON responses in case of success or failure.
// The avatar uploading process involves resizing and transforming the image before storing it and updating the user's avatar URL.
