// Function to generate a success response object with user details and token
const successResponse = (user, token) => {
  return {
    user: {
      email: user.email,
      password: user.password, // Note: Sending password in response is not recommended for security reasons
      subscription: user.subscription || "starter",
      token: token,
    },
  };
};

// Function to handle errors and map them to appropriate error messages
const handleErrors = (err) => {
  console.log(err.message, err.code);
  // Initialize an object to store error messages for specific fields
  const errors = { email: "", password: "" };

  // Handle login authentication errors
  if (
    err.message === "incorrect email" ||
    err.message === "incorrect password"
  ) {
    errors.statusCode = 401;
    errors.email = "Email or password is wrong!";
  } else if (err.code === 11000) {
    // Handle duplicate key (unique constraint) violation error
    errors.statusCode = 400;
    errors.email = "This email is already registered";
  }

  // Handle login validation errors
  else if (err.message.includes("user validation failed")) {
    // Map validation errors to corresponding fields
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

// Export the successResponse and handleErrors functions for use in other parts of the application
module.exports = {
  successResponse,
  handleErrors,
};

//  In summary Overall, these utility functions are designed to enhance the clarity and reusability of code related to user authentication.
//  The successResponse function helps structure and format successful authentication responses, while the handleErrors function centralizes the logic for handling and mapping various authentication and validation errors, making it easier to manage error responses consistently across the application.
