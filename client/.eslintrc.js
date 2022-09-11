const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint-config-airbnb/whitespace',
    'airbnb-typescript',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['*.jsx', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': ['off'],
        'react/react-in-jsx-scope': ['off'],
        'react/jsx-uses-react': ['off'],
        'react/jsx-props-no-spreading': ['warn'],
        'react/no-unescaped-entities': ['off'],
        '@typescript-eslint/indent': ['off'],
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: path.join(__dirname, 'tsconfig.json'),
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {},
};
