const fs = require('fs');
const path = require('path');

class CreateRobotsWebpackPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap('WriteRobotsTxt', async () => {
      fs.writeFileSync(path.join(compiler.options.output.path, 'robots.txt'), 'User-agent: *\nDisallow:\n');
    });
  }
}

class CreateManifestWebpackPlugin {
  constructor (siteContent, siteTheme) {
    this.siteContent = siteContent;
    this.siteTheme = siteTheme;
  }

  createManifest = () => {
    const manifest = {
      name: this.siteContent.name,
      short_name: this.siteContent.name,
      gcm_sender_id: '',
      gcm_user_visible_only: true,
      start_url: '/?utm_source=homescreen',
      permissions: ['gcm'],
      scope: '',
      orientation: 'portrait',
      display: 'standalone',
      theme_color: this.siteTheme.colors.brandPrimary,
      background_color: this.siteTheme.colors.background,
    }
    const sizes = [48, 72, 96, 144, 168, 192, 256, 512];
    manifest.icons = sizes.map((size) => (
      {
        'src': `/assets/_generated/favicon-${size}.png`,
        'sizes': `${size}x${size}`,
        'type': 'image/png'
      }
    ));
    return manifest;
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap('WriteRobotsTxt', async () => {
      fs.writeFileSync(path.join(compiler.options.output.path, 'assets', '_generated', 'manifest.json'), JSON.stringify(this.createManifest()));
    });
  }
}

export default (options) => ({
  webpack: (config) => {
    console.log('options', options);
    // https://github.com/react-static/react-static/pull/1329
    config.output.publicPath = process.env.REACT_STATIC_ASSETS_PATH || '/';

    const plugins = config.plugins;
    plugins.push(new CreateRobotsWebpackPlugin());
    plugins.push(new CreateManifestWebpackPlugin());
    config.plugins = plugins;

    return config;
  },
  beforeDocumentToFile: async (html) => {
    return html.replace(/\/\*!sc\*\//g, '');
  },
});
