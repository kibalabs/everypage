#!/usr/bin/env node
'use strict';

const chalk = require('chalk');
const glob = require('glob');
const commander = require('commander');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const notifier = require('node-notifier');
const rimraf = require('rimraf');
const childProcess = require('child_process');
const generateDeclarations = require('../typing/generateDeclarations');
const tsConfig = require('../typing/tsconfig');

const params = commander
  .option('-wp, --webpack-config-part <path>')
  .option('-me, --multi-entry <name>')
  .option('-d, --dev')
  .parse(process.argv);

process.env.CARBON_BUILD_MODE = params.dev ? 'development' : 'production';

const mergedConfig = webpackMerge(
  require('../webpack-common/common.webpack'),
  require('../webpack-common/js.webpack'),
  require('../webpack-common/css.webpack'),
  require('../webpack-common/images.webpack'),
  require('./component.webpack'),
  params.dev ? require('./dev.webpack') : require('./prod.webpack'),
  params.webpackConfigPart ? require(params.webpackConfigPart) : {},
);

if (params.multiEntry) {
  const indicesOnly = true;
  const fileNamePattern = indicesOnly ? 'index' : '*';
  const topDirectoryOnly = true;
  const directoryPattern = topDirectoryOnly ? '*' : '**';
  mergedConfig.entry = glob.sync(`./${params.multiEntry}/${directoryPattern}/${fileNamePattern}.{js,jsx,ts,tsx}`).reduce((accumulator, file) => {
    accumulator[file.replace(new RegExp(`^\.\/${params.multiEntry}\/`), '').replace(/\.(j|t)sx?$/, '')] = file;
    return accumulator;
  }, {});
} else {
  mergedConfig.output.filename = 'index.js';
}

rimraf.sync(mergedConfig.output.path);

const compiler = webpack({...mergedConfig, bail: true});
compiler.hooks.invalid.tap('invalid', () => {
  console.log(`\nCompiling ${mergedConfig.name}...\n`);
  notifier.notify({title: mergedConfig.name, message: `Compiling...` });
});
compiler.run((err, stats) => {
  if (err && !err.message) {
    console.log(chalk.red(err));
    notifier.notify({title: mergedConfig.name, message: `Unknown error compiling!` });
    throw new Error(`Unknown error compiling!`);
  }

  if (!params.dev) {
    generateDeclarations(typeof mergedConfig.entry === 'string' ? [mergedConfig.entry] : Object.values(mergedConfig.entry), {
      ...tsConfig.compilerOptions,
      outDir: mergedConfig.output.path,
      jsx: 'react',
    });
  }
  let messages = formatWebpackMessages(err ? { errors: [err.message], warnings: []}  : stats.toJson({ all: false, warnings: true, errors: true }));
  if (messages.errors.length > 0) {
    // Only keep the first error. Others are often indicative of the same problem, but confuse the reader with noise.
    notifier.notify({title: mergedConfig.name, message: `Error compiling!` });
    throw new Error(messages.errors[0]);
  } else if (messages.warnings.length > 0) {
    childProcess.execSync('npm pack', {cwd: mergedConfig.output.path});

    console.log(chalk.yellow(messages.warnings.join('\n\n')));
    notifier.notify({title: mergedConfig.name, message: `Built with ${messages.warnings.length} warnings` });
  } else {
    childProcess.execSync('npm pack', {cwd: mergedConfig.output.path});

    console.log(chalk.green(`Successfully built ${mergedConfig.name} 🚀\n`));
    notifier.notify({title: mergedConfig.name, message: `Successfully built 🚀` });
  }
});
