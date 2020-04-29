const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

const package = JSON.parse(fs.readFileSync(path.join(process.cwd(), './package.json'), 'utf8'));

module.exports = {
  name: package.name,
  entry: path.join(process.cwd(), './src/index.tsx'),
  target: 'web',
  output: {
    chunkFilename: '[name].bundle.js',
    filename: 'index.js',
    path: path.join(process.cwd(), './dist'),
    publicPath: '/',
    pathinfo: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, './index.html'),
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL: '',
    }),
    new CopyPlugin([
      { from: path.join(process.cwd(), './public') },
    ]),
    new webpack.DefinePlugin({
      APP_NAME: JSON.stringify(package.name),
      APP_VERSION: JSON.stringify(package.version),
      APP_DESCRIPTION: JSON.stringify(package.description),
    }),
  ],
};
