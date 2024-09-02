module.exports = {
  extends: [
    '@mate-academy/eslint-config-react-typescript',
    'plugin:cypress/recommended',
  ],
  rules: {},
  "parserOptions": {
    "project": "**/tsconfig.json"
  }
};
