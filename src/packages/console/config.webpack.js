/* eslint-disable */
const path = require('path');

// NOTE(krishan711): this sucks! Find another way to use local libraries with lerna monorepos without this mess
const nodeModulesDirectory = path.join(__dirname, '..', '..', './node_modules');

module.exports = (config) => {
  // NOTE(krishan711): this enables running with locally linked packages
  config.resolve = config.resolve || {};
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    react: path.resolve(nodeModulesDirectory, 'react'),
    'react-dom': path.resolve(nodeModulesDirectory, '@hot-loader/react-dom'),
    'styled-components': path.resolve(nodeModulesDirectory, 'styled-components'),
    '@kibalabs/ui-react': path.resolve(nodeModulesDirectory, '@kibalabs/ui-react'),
    '@kibalabs/core-react': path.resolve(nodeModulesDirectory, '@kibalabs/core-react'),
  };
  return config;
};
