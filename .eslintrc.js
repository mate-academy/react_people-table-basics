module.exports = {
  extends: [
    '@mate-academy/eslint-config-react-typescript',
    'plugin:cypress/recommended',
  ],
  rules: {},
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
  },
};
