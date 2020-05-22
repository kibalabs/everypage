
module.exports = (config) => {
  const externals = config.externals || {};
  externals.fsevents = "require('fsevents')";
  config.externals = externals;
  return config;
};
