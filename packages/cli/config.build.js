/* eslint-disable */
const path = require('path');

module.exports = (config) => {
  config.shouldAliasModules = false;
  config.webpackConfigModifier = (webpackConfig) => {
    webpackConfig.entry = {
      app: [
        path.join(__dirname, './src/app.tsx'),
      ],
      index: [
        path.join(__dirname, './src/index.ts'),
      ],
    };
    webpackConfig.output.filename = '[name].js';
    return webpackConfig;
  }
  return config;
};
