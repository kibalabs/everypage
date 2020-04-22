module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            fallback: 'file-loader',
            name: '[name]__[local]___[hash:base64:5].[ext]',
            outputPath: 'assets/',
            publicPath: '/assets/'
          },
        },
      },
    ],
  },
};
