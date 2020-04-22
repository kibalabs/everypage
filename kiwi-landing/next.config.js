const path = require('path');

module.exports = {
  webpack(config) {
    config.resolve.alias['react'] = path.resolve(path.join(process.cwd(), './node_modules'), 'react');
    config.resolve.alias['react-dom'] = path.resolve(path.join(process.cwd(), './node_modules'), 'react-dom');
    config.resolve.alias['styled-components'] = path.resolve(path.join(process.cwd(), './node_modules'), 'styled-components');
    return config
  },
  distDir: 'build',
  target: 'serverless',
};
