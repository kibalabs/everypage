const withTM = require('next-transpile-modules')(['@kibalabs/everypage']);

module.exports = {
  ...withTM(),
  distDir: 'build',
  target: 'serverless',
};
