#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const commander = require('commander');
const everypagePackage = require('../package.json');
const childProcess = require('child_process');

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
      console.log(`Copying file from ${sourceFilePath} to ${targetFilePath}`);
      fs.writeFileSync(targetFilePath, fs.readFileSync(sourceFilePath));
    }
  });
}


const run = (command, params) => {
  const port = params.port || 3000;
  const directory = params.directory ? path.join(process.cwd(), params.directory) : process.cwd();
  const buildDirectory = params.buildDirectory ? path.join(process.cwd(), params.buildDirectory) : path.join(directory, 'tmp');
  const outputDirectory = params.outputDirectory ? path.join(process.cwd(), params.outputDirectory) : path.join(directory, 'dist');
  const siteFilePath = path.join(directory, 'site.json');
  const themeFilePath = path.join(directory, 'theme.json');
  const assetsDirectory = path.join(directory, 'assets');
  const serveDirectory = path.join(buildDirectory, 'serverless/pages');

  process.env.EVERYPAGE_SITE_FILE = siteFilePath;
  process.env.EVERYPAGE_THEME_FILE = themeFilePath;

  copyDirectorySync(path.join(__dirname, './package'), buildDirectory);
  copyDirectorySync(assetsDirectory, path.join(buildDirectory, './public/assets'));
  fs.writeFileSync(path.join(buildDirectory, 'site.json'), fs.readFileSync(siteFilePath));
  fs.writeFileSync(path.join(buildDirectory, 'theme.json'), fs.readFileSync(themeFilePath));

  const buildApp = () => {
    console.log(`Building from ${directory} into ${buildDirectory}...`)
    childProcess.execSync(`npx next build ${buildDirectory}`);
  }

  const exportApp = () => {
    console.log(`Exporting into ${outputDirectory}...`)
    childProcess.execSync(`npx next export -- -o ${outputDirectory}`, { cwd: buildDirectory });
  }

  const startApp = () => {
    console.log(`Starting from ${buildDirectory}...`)
    const http = require('http')
    const next = require('next')
    const app = next({ dir: buildDirectory, dev: true })
    const handler = app.getRequestHandler()
    return app.prepare().then(() => {
      return http.createServer((req, res) => {
        handler(req, res)
      }).listen(port, err => {
        if (err) {
          throw err
        }
        console.log(`> Ready on http://localhost:${port}`)
      })
    });
    // childProcess.exec(`npx next start ${buildDirectory}`);
  }

  const serveApp = () => {
    const http = require('http');
    const handler = require('serve-handler');

    const server = http.createServer((request, response) => {
      return handler(request, response, {
        public: outputDirectory,
      });
    });
    server.on('error', (error) => {
      console.log(`Error on server: ${error}`);
    });
    return server.listen(port, () => {
      console.log(`Running at http://localhost:${port}`);
    });
  }

  if (command === 'build') {
    buildApp();
    exportApp();
  } else if (command === 'serve') {
    buildApp();
    exportApp();
    const server = serveApp();
    process.on('SIGTERM', () => {
      server.close();
    });
  } else if (command === 'start') {
    buildApp();
    const server = startApp();
    fs.watch(assetsDirectory, function(event, filename) {
      // TODO(krish): use event and filename
      copyDirectorySync(assetsDirectory, path.join(buildDirectory, './public/assets'));
    });
    fs.watch(siteFilePath, function(event) {
      if (event === 'rename') {
        throw new Error(`site file was moved from ${siteFilePath}`);
      }
      fs.writeFileSync(path.join(buildDirectory, 'site.json'), fs.readFileSync(siteFilePath));
      buildApp();
    });
    fs.watch(themeFilePath, function(event) {
      if (event === 'rename') {
        throw new Error(`theme file was moved from ${siteFilePath}`);
      }
      fs.writeFileSync(path.join(buildDirectory, 'theme.json'), fs.readFileSync(themeFilePath));
      buildApp();
    });
    process.on('SIGTERM', () => {
      server.close();
    });
  }
}

const program = commander.program;
program
  .version(everypagePackage.version)
  .command('start')
  .description('start a live-reloading version of your site')
  .option('-d, --directory <path>')
  .option('-b, --build-directory <path>')
  .option('-o, --output-directory <path>')
  .option('-p, --port <number>')
  .action((params) => run('start', params));

program
  .command('build')
  .description('build a production ready output')
  .option('-d, --directory <path>')
  .option('-b, --build-directory <path>')
  .option('-o, --output-directory <path>')
  .action((params) => run('build', params));

program
  .command('serve')
  .description('build and serve a production ready output')
  .option('-d, --directory <path>')
  .option('-b, --build-directory <path>')
  .option('-o, --output-directory <path>')
  .option('-p, --port <number>')
  .action((params) => run('serve', params));

program.parse(process.argv);
