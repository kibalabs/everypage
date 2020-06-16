const fs = require('fs');
const path = require('path');

class CreateRobotsWebpackPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap('CreateRobots', async () => {
      fs.writeFileSync(path.join(compiler.options.output.path, 'robots.txt'), 'User-agent: *\nDisallow:\n');
    });
  }
}

export default () => ({
  webpack: (config) => {
    // https://github.com/react-static/react-static/pull/1329
    config.output.publicPath = process.env.REACT_STATIC_ASSETS_PATH || '/';

    const plugins = config.plugins;
    plugins.push(new CreateRobotsWebpackPlugin());
    config.plugins = plugins;

    return config;
  },
  beforeDocumentToFile: async (html) => {
    return html.replace(/\/\*!sc\*\//g, '');
  },
});
