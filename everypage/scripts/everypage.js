#!/usr/bin/env node
'use strict';

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
  .requiredOption('-s, --site-file <path>')
  .requiredOption('-t, --theme-file <path>')
  .option('-p, --port <number>')
  .action((params) => {
    process.env['NEXT_APP_SITE_FILE'] = params.siteFile;
    process.env['NEXT_APP_THEME_FILE'] = params.themeFile;
    const port = params.port || 3000;

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
  .requiredOption('-s, --site-file <path>')
  .requiredOption('-t, --theme-file <path>')
  .requiredOption('-o, --output-directory <path>')
  .action((params) => {
    process.env['NEXT_APP_SITE_FILE'] = params.siteFile;
    process.env['NEXT_APP_THEME_FILE'] = params.themeFile;

    childProcess.execSync('npx next build');
    childProcess.execSync(`npx next export -- -o ${params.outputDirectory}`);
  });

program
  .command('serve')
  .description('build and serve a production ready output')
  .requiredOption('-s, --site-file <path>')
  .requiredOption('-t, --theme-file <path>')
  .requiredOption('-o, --output-directory <path>')
  .option('-p, --port <number>')
  .action((params) => {
    process.env['NEXT_APP_SITE_FILE'] = params.siteFile;
    process.env['NEXT_APP_THEME_FILE'] = params.themeFile;
    const port = params.port || 3000;

    childProcess.execSync('npx next build');
    childProcess.execSync(`npx next export -- -o ${params.outputDirectory}`);
    childProcess.execSync(`serve ${params.outputDirectory} -p ${port} -s`);
  });

program.parse(process.argv);
