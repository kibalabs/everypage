#!/usr/bin/env node
'use strict';

const commander = require('commander');
const { execSync } = require('child_process');

const params = commander
  .option('-s, --site <path>')
  .option('-o, --output-directory <path>')
  .parse(process.argv);

process.env['NEXT_APP_SITE_FILE'] = params.site;

execSync('npx next build');
execSync(`npx next export -- -o ${params.outputDirectory}`);
