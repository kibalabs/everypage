#!/usr/bin/env node
/* eslint-disable */

const everypage = require('../dist');
const everypagePackage = require('../package.json');

const program = everypage.createProgram(everypagePackage.version);
program.parseAsync(process.argv)
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error('command failed', err);
    process.exit(1);
  });
