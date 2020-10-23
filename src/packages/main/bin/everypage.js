#!/usr/bin/env node
'use strict';

const everypage = require('../dist');
const everypagePackage = require('../package.json');

const program = everypage.createProgram(everypagePackage.version);
program.parse(process.argv);
