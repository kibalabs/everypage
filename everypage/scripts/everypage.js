#!/usr/bin/env node
'use strict';

const path = require('path');
const commander = require('commander');
const next = require('next');
const http = require('http');
const url = require('url');
const everypagePackage = require('../package.json');
const childProcess = require('child_process');

const program = commander.program;
program
  .version(everypagePackage.version)
  .command('start')
  .description('start a live-reloading version of your site')
  .option('-d, --directory <path>')
  .option('-p, --port <number>')
  .action((params) => {
    const port = params.port || 3000;
    const directory = params.directory || process.cwd();
    const siteFilePath = path.join(directory, 'site.json');
    const themeFilePath = path.join(directory, 'theme.json');

    process.env.EVERYPAGE_SITE_FILE = siteFilePath;
    process.env.EVERYPAGE_THEME_FILE = themeFilePath;
    const app = next({ dev: true });
    const handleRequest = app.getRequestHandler();
    app.prepare().then(() => {
      http.createServer((req, res) => {
        const parsedUrl = url.parse(req.url, true);
        handleRequest(req, res, parsedUrl);
      }).listen(port, err => {
        if (err) {
          throw err;
        }
        console.log(`> Ready on http://localhost:${port}`);
      });
    });
  });

program
  .command('build')
  .description('build a production ready output')
  .option('-d, --directory <path>')
  .option('-o, --output-directory <path>')
  .action((params) => {
    const directory = params.directory || process.cwd();
    const outputDirectory = params.outputDirectory || path.join(directory, 'dist');
    const siteFilePath = path.join(directory, 'site.json');
    const themeFilePath = path.join(directory, 'theme.json');

    process.env.EVERYPAGE_SITE_FILE = siteFilePath;
    process.env.EVERYPAGE_THEME_FILE = themeFilePath;
    childProcess.execSync('npx next build');
    childProcess.execSync(`npx next export -- -o ${outputDirectory}`);
  });

program
  .command('serve')
  .description('build and serve a production ready output')
  .requiredOption('-s, --site-file <path>')
  .requiredOption('-t, --theme-file <path>')
  .option('-o, --output-directory <path>')
  .option('-p, --port <number>')
  .action((params) => {
    const port = params.port || 3000;
    const directory = params.directory || process.cwd();
    const outputDirectory = params.outputDirectory || path.join(directory, 'dist');
    const siteFilePath = path.join(directory, 'site.json');
    const themeFilePath = path.join(directory, 'theme.json');

    process.env.EVERYPAGE_SITE_FILE = siteFilePath;
    process.env.EVERYPAGE_THEME_FILE = themeFilePath;
    childProcess.execSync('npx next build');
    childProcess.execSync(`npx next export -- -o ${outputDirectory}`);
    childProcess.execSync(`serve ${outputDirectory} -p ${port} -s`);
  });

program.parse(process.argv);
