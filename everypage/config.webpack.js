const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const modifyConfig = (config) => {
  config.plugins.push(new CopyPlugin([
    { from: path.join(process.cwd(), './bin/package'), to: 'bin/package' },
  ]));
  return config;
};

module.exports = modifyConfig;
