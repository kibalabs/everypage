const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const modifyConfig = (config) => {
  config.plugins.push(new CopyPlugin([
    { from: path.join(process.cwd(), './scripts/package'), to: 'scripts/package' },
  ]));
  return config;
};

module.exports = modifyConfig;
