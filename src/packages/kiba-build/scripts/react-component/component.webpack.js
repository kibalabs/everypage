const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const package = JSON.parse(fs.readFileSync(path.join(process.cwd(), './package.json'), 'utf8'));
const externalPackages = Object.keys(package.dependencies || {}).concat(Object.keys(package.peerDependencies || {})).concat(Object.keys(package.optionalDependencies || {}));

const isExternalPackageRequest = (request) => {
  const isAnyExternalExactMatch = externalPackages.some((packageName) => request === packageName);
  const isAnyExternalPrefixMatch = externalPackages.some((packageName) => request.indexOf(`${packageName}/`) === 0);
  return isAnyExternalExactMatch || isAnyExternalPrefixMatch;
}

module.exports = {
  name: package.name,
  entry: path.join(process.cwd(), './src/index.ts'),
  target: 'node',
  output: {
    chunkFilename: '[name].bundle.js',
    filename: '[name].js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    path: path.join(process.cwd(), './dist'),
    library: package.name,
    globalObject: 'this',
    pathinfo: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        PACKAGE_NAME: JSON.stringify(package.name),
        PACKAGE_VERSION: JSON.stringify(package.version),
      }
    })
  ],
  externals: [
    function(context, request, callback) {
      if (isExternalPackageRequest(request)) {
        return callback(null, 'commonjs ' + request);
      }
      return callback();
    }
  ],
};