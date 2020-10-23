
module.exports = (config) => {
  config.externals = config.externals || {};
  config.externals['fsevents'] = 'commonjs fsevents';
  config.externals['@kibalabs/everypage'] = 'commonjs @kibalabs/everypage';
  return config;
};
