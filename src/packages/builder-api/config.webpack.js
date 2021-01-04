
module.exports = (config) => {
  config.externals = config.externals || {};
  config.externals.fsevents = 'commonjs fsevents';
  config.externals['@kibalabs/everypage-cli'] = 'commonjs @kibalabs/everypage-cli';
  return config;
};
