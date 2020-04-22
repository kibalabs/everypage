const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDevelopment = process.env.CARBON_BUILD_MODE === 'development';

const styleLoader = {
  loader: 'style-loader',
  options: {
    hmr: isDevelopment,
  },
};

const extractingLoader = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    hmr: isDevelopment,
  },
};

const extractorPlugin = new MiniCssExtractPlugin({
  filename: isDevelopment ? '[name].e.css' : '[name].[hash].e.css',
  chunkFilename: isDevelopment ? '[id].e.css' : '[id].[hash].e.css',
});

module.exports = {
  plugins: [
    ...(isDevelopment ? [] : [extractorPlugin]),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        enforce: 'pre',
        exclude: [/node_modules/],
        loader: 'typed-css-modules-loader'
      },
      {
        test: /\.css$/,
        loader: isDevelopment ? styleLoader : extractingLoader,
      },
      {
        test: /\.css$/,
        exclude: [/src/],
        loader: 'css-loader',
        options: {
          modules: false,
        },
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/],
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]',
        },
      },
    ],
  },
};
