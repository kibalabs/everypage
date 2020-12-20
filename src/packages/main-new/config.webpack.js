const path = require('path');

module.exports = (config) => {
  // NOTE(krishan711): I'm fairly sure regenerator is needed because this module is not actually a "react module" but a standalone module that includes react stuff.
  // TODO(krishan711): Given the above, decide how to proceed with this long term e.g. create a new build-react-module command in build-js?
  config.entry = typeof config.entry === 'string' ? [config.entry] : config.entry;
  config.entry.unshift('regenerator-runtime/runtime');
  config.entry = {
    'app': path.join(process.cwd(), 'src/app.tsx'),
    'main': config.entry,
  };
  console.log('config', config);
  return config;
};
