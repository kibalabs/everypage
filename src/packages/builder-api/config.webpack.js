
module.exports = (config) => {
  const externals = config.externals || {};
  externals['fsevents'] = 'commonjs2 fsevents';
  externals['@kibalabs/everypage'] = 'commonjs @kibalabs/everypage';
  config.externals = externals;
  return config;
};
