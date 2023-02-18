module.exports = {

  transform: {
    '^.+\\.js$': 'babel-jest',
  },

  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.js?(x)',
    '**/?(*.)+(spec|test).js?(x)',
  ],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
  ],
  transformIgnorePatterns: [
    '/node_modules/(?!axios)/',
  ],
  globals: {
    __DEV__: true,
  },

  preset: 'react-native',
};
