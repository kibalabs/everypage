#!/usr/bin/env node
'use strict';

const path = require('path');
const chalk = require('chalk');
const glob = require('glob');
const commander = require('commander');
const webpackMerge = require('webpack-merge');
// const notifier = require('node-notifier');
const generateDeclarations = require('../typing/generateDeclarations');
const tsConfig = require('../typing/tsconfig');
const webpackUtil = require('../common/webpackUtil');

const params = commander
  .option('-wp, --webpack-config-modifier <path>')
  .option('-me, --multi-entry <name>')
  .option('-d, --dev')
  .option('-s, --start')
  .parse(process.argv);

process.env.BUILD_MODE = params.dev ? 'development' : 'production';

var mergedConfig = webpackMerge(
  require('../common/common.webpack'),
  require('../common/js.webpack'),
  require('../common/css.webpack'),
  require('../common/images.webpack'),
  require('./component.webpack'),
  params.dev ? require('./dev.webpack') : require('./prod.webpack'),
);

if (params.webpackConfigModifier) {
  const webpackConfigModifier = require(path.join(process.cwd(), params.webpackConfigModifier));
  mergedConfig = webpackConfigModifier(mergedConfig);
}

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

// let isFirstRun = true;
const onBuild = () => {
  if (!params.dev) {
    console.log('Generating ts declarations...');
    generateDeclarations(typeof mergedConfig.entry === 'string' ? [mergedConfig.entry] : Object.values(mergedConfig.entry), {
      ...tsConfig.compilerOptions,
      outDir: mergedConfig.output.path,
      jsx: 'react',
    });
  }

  // if (params.start) {
  //   if (isFirstRun) {
  //     isFirstRun = false;
      // console.log(`Installing prod dependencies into ${mergedConfig.output.path}...`);
      // try {
      //   childProcess.execSync('npm install --only=prod', { cwd: mergedConfig.output.path, stdio: 'inherit' })
      // } catch (error) {
      //   console.log(chalk.red(error));
      //   notifier.notify({title: mergedConfig.name, message: `Error installing dependencies!` });
      //   return;
      // }
  //   }
  // }
};
const onPostBuild = () => {
  if (params.start) {
    console.log('Run', chalk.cyan(`npm install --no-save --force ${process.cwd()}`), `to use ${mergedConfig.name} live 🖥\n`);
  }
};
const compiler = webpackUtil.createCompiler(mergedConfig, params.start, onBuild, onPostBuild);

if (params.start) {
  compiler.watch({
    aggregateTimeout: 500,
    poll: true,
    ignored: ['**/*.d.ts'],
  // }, (e, s) => {console.log('here', e, s.toJson({ all: false, warnings: true, errors: true }))});
  }, () => {});
} else {
  compiler.run();
}
