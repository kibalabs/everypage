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
  .option('-b, --build')
  .parse(process.argv);

process.env.BUILD_MODE = params.dev ? 'development' : 'production';

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

const compiler = webpack({...mergedConfig, bail: params.build});
compiler.hooks.invalid.tap('invalid', () => {
  console.log(`\nCompiling ${mergedConfig.name}...\n`);
  notifier.notify({title: mergedConfig.name, message: `Compiling...` });
});

const showError = (error) => {
  console.log(chalk.red(error));
  notifier.notify({title: mergedConfig.name, message: `Error compiling!` });
  throw new Error(`Error compiling!`);
}

const processWebpackOutput = (err, stats) => {
  if (err && !err.message) {
    showError(err);
  }

  let messages = formatWebpackMessages(err ? { errors: [err.message], warnings: []}  : stats.toJson({ all: false, warnings: true, errors: true }));
  if (messages.errors.length > 0) {
    // Only keep the first error. Others are often indicative of the same problem, but confuse the reader with noise.
    showError(messages.errors[0]);
  }

  if (!params.dev) {
    generateDeclarations(typeof mergedConfig.entry === 'string' ? [mergedConfig.entry] : Object.values(mergedConfig.entry), {
      ...tsConfig.compilerOptions,
      outDir: mergedConfig.output.path,
      jsx: 'react',
    });
  }

  return messages;
}

if (params.build) {
  compiler.run((err, stats) => {
    const messages = processWebpackOutput(err, stats);
    if (messages.warnings.length > 0) {
      console.log(chalk.yellow(messages.warnings.join('\n\n')));
      notifier.notify({title: mergedConfig.name, message: `Built with ${messages.warnings.length} warnings` });
    } else {
      console.log(chalk.green(`Successfully built ${mergedConfig.name} 🚀\n`));
      notifier.notify({title: mergedConfig.name, message: `Successfully built 🚀` });
    }
  });
} else {
  let isFirstRun = true;
  compiler.watch({
    aggregateTimeout: 500,
    poll: true,
    ignored: ['**/*.d.ts'],
  }, async (err, stats) => {
    var messages = null;
    try {
      messages = processWebpackOutput(err, stats);
    } catch {
      return;
    }

    if (isFirstRun) {
      isFirstRun = false;
      console.log(`Installing prod dependencies into ${mergedConfig.output.path}...`);
      const { stdout, stderr } = childProcess.execSync('npm install --only=prod', { cwd: mergedConfig.output.path })
      console.log(stdout);
      if (stderr) {
        console.log(chalk.red(stderr));
        notifier.notify({title: mergedConfig.name, message: `Error installing dependencies!` });
        return;
      }
    }

    if (messages.warnings.length > 0) {
      console.log(chalk.yellow(messages.warnings.join('\n\n')));
      notifier.notify({title: mergedConfig.name, message: `Compiled with ${messages.warnings.length} warnings` });
    } else {
      console.log(chalk.green(`Successfully compiled ${mergedConfig.name} 🚀\n`));
      notifier.notify({title: mergedConfig.name, message: `Successfully compiled 🚀` });
    }
    console.log('Run', chalk.cyan(`npm uninstall ${mergedConfig.name}; npm install ${mergedConfig.output.path}`), `to use ${mergedConfig.name} live 🖥\n`);
  });
}
