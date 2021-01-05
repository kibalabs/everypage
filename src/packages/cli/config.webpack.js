/* eslint-disable */
const path = require('path');

module.exports = (config) => {
  config.entry = {
    app: [
      path.join(__dirname, './src/app.tsx'),
    ],
    index: [
      path.join(__dirname, './src/index.ts'),
    ],
  };
  config.output.filename = '[name].js';
  return config;
};
