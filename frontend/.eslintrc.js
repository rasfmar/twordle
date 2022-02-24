module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:react/jsx-runtime",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "jest"
  ],
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".jsx", ".tsx"] }],
    "import/extensions": [1, "never"],
    "no-unused-vars": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-shadow": "error",
    "no-plusplus": "off",
    "no-param-reassign": ["error", { "props": false }]
  },
};
