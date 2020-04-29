#!/usr/bin/env node
'use strict';

const chalk = require('chalk');
const rimraf = require('rimraf');
const webpack = require('webpack');
const notifier = require('node-notifier');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

const createCompiler = (config, isWatching, onBuild, onPostBuild) => {

  const showError = (error) => {
    console.log(chalk.red(error));
    // TODO(krish): get the name from stats and move these functions out
    notifier.notify({title: config.name, message: `Error compiling!` });
    throw new Error(`Error compiling!`);
  }

  const processOutput = (err, stats) => {
    if (err && !err.message) {
      showError(err);
    }
    let messages = formatWebpackMessages(err ? { errors: [err.message], warnings: []}  : stats.toJson({ all: false, warnings: true, errors: true }));
    if (messages.errors.length > 0) {
      showError(messages.errors[0]);
    }
    return messages;
  };

  rimraf.sync(config.output.path);
  const compiler = webpack({...config, bail: !isWatching});

  compiler.hooks.invalid.tap('webpackUtil', () => {
    console.log(`\Building ${config.name}...\n`);
    notifier.notify({title: config.name, message: `Building...` });
  });

  compiler.hooks.failed.tap('webpackUtil', (error) => {
    console.log(chalk.red(`\Failed to build ${config.name}: ${error}\n`));
  });

  compiler.hooks.done.tap('webpackUtil', (stats) => {
    const messages = processOutput(null, stats);
    if (onBuild) {
      onBuild();
    }
    if (messages.warnings.length > 0) {
      console.log(chalk.yellow(messages.warnings.join('\n\n')));
      notifier.notify({title: config.name, message: `Built with ${messages.warnings.length} warnings` });
    } else {
      console.log(chalk.green(`Successfully built ${config.name} 🚀\n`));
      notifier.notify({title: config.name, message: `Successfully built 🚀` });
    }
    if (onPostBuild) {
      onPostBuild();
    }
  });

  return compiler;
};

module.exports = {
  createCompiler: createCompiler,
};
