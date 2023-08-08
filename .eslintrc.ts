module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: ["next/core-web-vitals", "next", "prettier"],
  plugins: ["react", "prettier"],
  rules: {
    "@next/next/no-img-element": "off",
    "@next/next/no-html-link-for-pages": "off",
  },
};
