// Import required modules and the User schema
const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("../services/schemas/UsersSchema.js");

// Load environment variables
require("dotenv").config();
const secret = process.env.SECRET;

// ExtractJwt provides a way to extract the JWT from the request
const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

// Configuration parameters for the JWT strategy
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

// JWT Strategy configuration
passport.use(
  new Strategy(params, function (payload, done) {
    console.log("Payload:", payload);

    // Find the user based on the ID in the payload
    User.findById(payload.id)
      .then((user) => {
        // If the user is not found, return an error
        if (!user) {
          return done(new Error("User not found!"));
        }
        // If the user is found, return the user object
        return done(null, user);
      })
      .catch((err) => done(err));
  })
);

//In summary, this code configures a Passport strategy for JWT authentication.
//  When a protected route is accessed, Passport will use this strategy to verify the provided JWT, and if successful, it will attach the user object to the request(req.user).
// The strategy also logs the JWT payload for debugging purposes.
