const path = require('path');

module.exports = (config) => {
  // NOTE(krishan711): I'm fairly sure regenerator is needed because this module is not actually a "react module" but a standalone module that includes react stuff.
  // TODO(krishan711): Given the above, decide how to proceed with this long term e.g. create a new build-react-module command in build-js?
  config.entry = typeof config.entry === 'string' ? [config.entry] : config.entry;
  config.entry = {
    'app': [
      'regenerator-runtime/runtime',
      path.join(process.cwd(), 'src/app.tsx'),
    ],
    'page': [
      'regenerator-runtime/runtime',
      path.join(process.cwd(), 'src/page.tsx'),
    ],
    'index': [
      'regenerator-runtime/runtime',
      ...config.entry,
    ],
  };
  config.output.filename = '[name].js';
  return config;
};
