#!/usr/bin/env node
'use strict';

const path = require('path');
const chalk = require('chalk');
const commander = require('commander');
const webpackMerge = require('webpack-merge');
const webpackDevServer = require('webpack-dev-server');
const childProcess = require('child_process');
const webpackUtil = require('../common/webpackUtil');

const params = commander
  .option('-wp, --webpack-config-modifier <path>')
  .option('-d, --dev')
  .option('-s, --start')
  .parse(process.argv);

process.env.BUILD_MODE = params.dev ? 'development' : 'production';

var mergedConfig = webpackMerge(
  require('../common/common.webpack'),
  require('../common/js.webpack'),
  require('../common/css.webpack'),
  require('../common/images.webpack'),
  require('./app.webpack'),
  params.dev ? require('./dev.webpack') : require('./prod.webpack'),
);

if (params.webpackConfigModifier) {
  const webpackConfigModifier = require(path.join(process.cwd(), params.webpackConfigModifier));
  mergedConfig = webpackConfigModifier(mergedConfig);
}

const compiler = webpackUtil.createCompiler(mergedConfig, params.start);

if (params.start) {
  const host = '0.0.0.0';
  const port = 3000;
  const server = new webpackDevServer(compiler, {
    host,
    port,
    hot: true,
    quiet: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    watchOptions: {
      aggregateTimeout: 500,
      poll: undefined,
      ignored: ['**/*.d.ts'],
    },
  });
  server.listen(port, host, (err) => {
    if (err) {
      console.log(err);
    }
    console.log(chalk.cyan('Starting the development server...\n'));
    if (host == '0.0.0.0') {
      require('dns').lookup(require('os').hostname(), function (err, address, fam) {
        console.log(`Use ${mergedConfig.name} at: http://${address}:${port}`);
        childProcess.execSync(`open http://localhost:${port}`, { stdio: 'inherit' });
      })
    } else {
      childProcess.execSync(`open http://${host}:${port}`, { stdio: 'inherit' });
    }
  });
} else {
  compiler.run();
}
