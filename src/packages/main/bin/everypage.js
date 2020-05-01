#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const commander = require('commander');
const everypagePackage = require('../package.json');
const childProcess = require('child_process');
const rimraf = require('rimraf');


const copyDirectorySync = (sourceDirectory, targetDirectory) => {
  console.log(`Copying directory from ${sourceDirectory} to ${targetDirectory}`);
  if (!fs.lstatSync(sourceDirectory).isDirectory()) {
    throw new Error(`copyDirectorySync must be called with a directory. source ${sourceDirectory} is not a directory`);
  }
  if (!fs.existsSync(targetDirectory) ) {
    fs.mkdirSync(targetDirectory, { recursive: true });
  } else if (!fs.lstatSync(sourceDirectory).isDirectory()) {
    throw new Error(`copyDirectorySync must be called with a directory. target ${targetDirectory} is not a directory`);
  }
  fs.readdirSync(sourceDirectory).forEach((file) => {
    const sourceFilePath = path.join(sourceDirectory, file);
    const targetFilePath = path.join(targetDirectory, file);
    if (fs.lstatSync(sourceFilePath).isDirectory()) {
      copyDirectorySync(sourceFilePath, targetFilePath);
    } else {
      fs.writeFileSync(targetFilePath, fs.readFileSync(sourceFilePath));
    }
  });
}

const updateAssetPaths = (obj, buildHash) => {
  return Object.keys(obj).reduce((result, key) => {
    let value = obj[key];
    if (typeof value == 'string') {
      value = value.startsWith('/assets/') ? value.replace(/^/, `/${buildHash}`) : value;
    } else if (Array.isArray(value)) {
      value = value.map(v => updateAssetPaths(v, buildHash));
    } else if (typeof value == 'object') {
      value = updateAssetPaths(value, buildHash);
    }
    result[key] = value;
    return result
  }, {});
};

const copySiteFile = (siteFilePath, targetDirectory, buildHash) => {
  let siteContent = JSON.parse(fs.readFileSync(siteFilePath));
  siteContent.buildHash = buildHash;
  if (buildHash) {
    siteContent = updateAssetPaths(siteContent, buildHash);
  }
  fs.writeFileSync(path.join(targetDirectory, 'site.json'), JSON.stringify(siteContent));
}

const run = (command, params) => {
  const port = params.port || 3000;
  const directory = params.directory ? path.join(process.cwd(), params.directory) : process.cwd();
  const buildDirectory = params.buildDirectory ? path.join(process.cwd(), params.buildDirectory) : path.join(directory, 'tmp');
  const outputDirectory = params.outputDirectory ? path.join(process.cwd(), params.outputDirectory) : path.join(directory, 'dist');
  const siteFilePath = path.join(directory, 'site.json');
  const themeFilePath = path.join(directory, 'theme.json');
  const assetsDirectory = path.join(directory, 'assets');
  const buildHash = params.buildHash;

  if (params.clean) {
    console.log('Clearing build and output directories');
    rimraf.sync(buildDirectory);
    rimraf.sync(outputDirectory);
  } else {
    if (fs.existsSync(buildDirectory)) {
      console.error(`Build directory ${buildDirectory} already exists! Please delete it and run this command again (or add --clean when calling everypage).`)
      return;
    }

    if (fs.existsSync(outputDirectory)) {
      console.error(`Output directory ${outputDirectory} already exists! Please delete it and run this command again (or add --clean when calling everypage).`)
      return;
    }
  }

  const cleanBuildDirectory = () => {
    console.log('Clearing build directory');
    rimraf.sync(buildDirectory);
  };

  copyDirectorySync(path.join(__dirname, './package'), buildDirectory);
  copyDirectorySync(assetsDirectory, path.join(buildDirectory, './public/assets'));
  copySiteFile(siteFilePath, buildDirectory, buildHash);
  fs.writeFileSync(path.join(buildDirectory, 'theme.json'), fs.readFileSync(themeFilePath));

  if (command === 'build') {
    childProcess.spawnSync(`npx`, ['react-static', 'build', '--config', path.join(buildDirectory, 'static-prod.config.js')], { stdio: 'inherit' });
    copyDirectorySync(path.join(buildDirectory, 'dist'), outputDirectory);
    // cleanBuildDirectory();
  } else if (command === 'serve') {
    childProcess.spawnSync(`npx`, ['react-static', 'build', '--config', path.join(buildDirectory, 'static-prod.config.js')], { stdio: 'inherit' });
    copyDirectorySync(path.join(buildDirectory, 'dist'), outputDirectory);
    const server = childProcess.spawn(`npx`, ['serve', outputDirectory, '-p', port], { stdio: 'inherit' });
    process.on('SIGTERM', () => {
      console.log('Shutting down server');
      server.kill();
      cleanBuildDirectory();
    });
  } else if (command === 'start') {
    const server = childProcess.spawn(`npx`, ['react-static', 'start', '--config', path.join(buildDirectory, 'static-dev.config.js')], { stdio: 'inherit' });
    fs.watch(assetsDirectory, (event, filename) => {
      // TODO(krish): use event and filename
      copyDirectorySync(assetsDirectory, path.join(buildDirectory, './public/assets'));
    });
    fs.watch(siteFilePath, () => {
      if (!fs.existsSync(siteFilePath)) {
        throw new Error(`site file was removed from ${siteFilePath}`);
      }
      copySiteFile(siteFilePath, buildDirectory, buildHash);
    });
    fs.watch(themeFilePath, () => {
      if (!fs.existsSync(themeFilePath)) {
        throw new Error(`theme file was removed from ${themeFilePath}`);
      }
      fs.writeFileSync(path.join(buildDirectory, 'theme.json'), fs.readFileSync(themeFilePath));
    });
    process.on('SIGTERM', () => {
      console.log('Shutting down server');
      server.kill();
      cleanBuildDirectory();
    });
  }
}

const program = commander.program;
program
  .version(everypagePackage.version)
  .command('start')
  .description('start a live-reloading version of your site')
  .option('-d, --directory <path>')
  .option('-c, --clean', 'delete existing build and output directories before starting')
  .option('-b, --build-directory <path>')
  .option('-x, --build-hash <str>')
  .option('-o, --output-directory <path>')
  .option('-p, --port <number>')
  .action((params) => run('start', params));

program
  .command('build')
  .description('build a production ready output')
  .option('-d, --directory <path>')
  .option('-c, --clean', 'delete existing build and output directories before starting')
  .option('-b, --build-directory <path>')
  .option('-x, --build-hash <str>')
  .option('-o, --output-directory <path>')
  .action((params) => run('build', params));

program
  .command('serve')
  .description('build and serve a production ready output')
  .option('-d, --directory <path>')
  .option('-c, --clean', 'delete existing build and output directories before starting')
  .option('-b, --build-directory <path>')
  .option('-x, --build-hash <str>')
  .option('-o, --output-directory <path>')
  .option('-p, --port <number>')
  .action((params) => run('serve', params));

program.parse(process.argv);
