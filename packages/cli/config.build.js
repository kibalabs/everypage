/* eslint-disable */
const path = require('path');
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

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
