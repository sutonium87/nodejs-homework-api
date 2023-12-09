// Export ESLint configuration as an object
module.exports = {
  // Specify the environments in which the code will run
  env: {
    commonjs: true, // Enables CommonJS (Node.js) environment
    es2021: true, // Enables ECMAScript 2021 environment
    node: true, // Enables Node.js environment
  },

  // Extend existing ESLint configurations to reuse rules
  extends: ["standard", "prettier"],

  // Configure parser options for ESLint
  parserOptions: {
    ecmaVersion: 12, // Specify ECMAScript version (ECMAScript 2021 in this case)
  },

  // Define custom ESLint rules or override existing ones (empty in this case)
  rules: {},
};

// The ESLint configuration is designed for a Node.js project using CommonJS modules.
// It enables features from ECMAScript 2021 and follows the rules defined by the 'standard' style guide along with additional formatting rules from the 'prettier' plugin.
// The absence of custom rules in the rules section implies that the project relies on the default rules provided by the extended configurations.
// This configuration helps maintain consistent coding standards and identifies potential issues in the code through linting. It promotes clean, readable, and standardized JavaScript code in a Node.js environment.
