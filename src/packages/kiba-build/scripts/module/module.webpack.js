const fs = require('fs');
const path = require('path');
const packageUtil = require('../common/packageUtil');

const package = JSON.parse(fs.readFileSync(path.join(process.cwd(), './package.json'), 'utf8'));

module.exports = {
  name: package.name,
  entry: path.join(process.cwd(), './src/index.ts'),
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    path: path.join(process.cwd(), './dist'),
    library: package.name,
    pathinfo: false,
  },
  externals: [
    function(context, request, callback) {
      if (packageUtil.isExternalPackageRequest(package, request)) {
        return callback(null, 'commonjs ' + request);
      }
      return callback();
    }
  ],
};
