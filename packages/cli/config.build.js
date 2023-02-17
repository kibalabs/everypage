/* eslint-disable */

// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export default (config) => {

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
