const path = require('path');
// const CopyPlugin = require('copy-webpack-plugin');

module.exports = (config) => {
  // config.plugins.push(new CopyPlugin([
  //   { from: path.join(process.cwd(), './bin/package'), to: 'bin/package' },
  // ]));
  return config;
};
