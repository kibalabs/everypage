const path = require('path');

module.exports = (config) => {
  config.entry = typeof config.entry === 'string' ? [config.entry] : config.entry;
  config.entry.unshift('regenerator-runtime/runtime');
  return config;
};
