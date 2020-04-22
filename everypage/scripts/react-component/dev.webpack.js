module.exports = {
  mode: 'development',
  // need to set devtool to none otherwise the "require"s for externals
  // don't work when used with an app that is run with start-dev
  devtool: 'none',
};
