/* eslint-disable */
const path = require('path');

// NOTE(krishan711): this sucks! Find another way to use local libraries with lerna monorepos without this mess
const nodeModulesDirectory = path.join(__dirname, '..', '..', './node_modules');
const localNodeModulesDirectory = path.join(__dirname, './node_modules');

module.exports = (config) => {
  config.shouldAliasModules = false;
  config.webpackConfigModifier = (webpackConfig) => {
    // NOTE(krishan711): this enables running with locally linked packages
    webpackConfig.resolve = webpackConfig.resolve || {};
    webpackConfig.resolve.alias = {
      ...(webpackConfig.resolve.alias || {}),
      react: path.resolve(nodeModulesDirectory, 'react'),
      'react-dom': path.resolve(nodeModulesDirectory, '@hot-loader/react-dom'),
      'styled-components': path.resolve(nodeModulesDirectory, 'styled-components'),
      '@kibalabs/core': path.resolve(nodeModulesDirectory, '@kibalabs/core'),
      '@kibalabs/core-react': path.resolve(nodeModulesDirectory, '@kibalabs/core-react'),
      '@kibalabs/ui-react': path.resolve(nodeModulesDirectory, '@kibalabs/ui-react'),
      '@kibalabs/everypage': path.resolve(localNodeModulesDirectory, '@kibalabs/everypage'),
    };
    return webpackConfig;
  };
  return config;
};
