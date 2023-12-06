// Export an ESLint configuration object specifying the environment settings
module.exports = {
  // Specify environment settings for CommonJS, ECMAScript 2021, and Node.js
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },

  // Extend the ESLint configuration by including the 'standard' and 'prettier' presets
  extends: ["standard", "prettier"],

  // Specify parser options, setting the ECMAScript version to 12 (ES2021)
  parserOptions: {
    ecmaVersion: 12,
  },

  // Define additional ESLint rules (currently empty, to be extended as needed)
  rules: {},
};

// In summary, this ESLint configuration provides a set of rules and settings for linting JavaScript code.
// It specifies the environment, extends existing presets, sets parser options, and allows for the inclusion of additional rules as needed.
// The configuration is intended to maintain consistent code style and catch potential issues during development.
