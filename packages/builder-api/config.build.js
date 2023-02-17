/* eslint-disable */

module.exports = (config) => {
// export default (config) => {
  config.shouldAliasModules = false;
  config.webpackConfigModifier = (webpackConfig) => {
    webpackConfig.externals = webpackConfig.externals || {};
    webpackConfig.externals['fsevents'] = 'commonjs fsevents';
    webpackConfig.externals['@kibalabs/everypage-cli'] = 'commonjs @kibalabs/everypage-cli';
    return webpackConfig;
  }
  return config;
};
