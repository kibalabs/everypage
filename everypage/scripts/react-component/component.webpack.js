const fs = require('fs');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const package = JSON.parse(fs.readFileSync(path.join(process.cwd(), './package.json'), 'utf8'));
const externalPackages = Object.keys(package.dependencies || {}).concat(Object.keys(package.peerDependencies || {})).concat(Object.keys(package.optionalDependencies || {}));

const isExternalPackageRequest = (request) => {
  const isAnyExternalExactMatch = externalPackages.some((packageName) => request === packageName);
  const isAnyExternalPrefixMatch = externalPackages.some((packageName) => request.indexOf(`${packageName}/`) === 0);
  return isAnyExternalExactMatch || isAnyExternalPrefixMatch;
}

const scriptCopyCommands = package.bin ? Object.values(package.bin).map((value) => {
  return { from: path.join(process.cwd(), value), to: value }
}) : [];

module.exports = {
  name: package.name,
  entry: path.join(process.cwd(), './src/index.ts'),
  target: 'web',
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
    new CopyPlugin([
      { from: path.join(process.cwd(), './package.json') },
      { from: path.join(process.cwd(), './.npmrc') },
      ...scriptCopyCommands,
    ]),
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
