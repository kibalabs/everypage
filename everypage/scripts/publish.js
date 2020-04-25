#!/usr/bin/env node
'use strict';

const childProcess = require('child_process');

try {
  childProcess.execSync('npm publish', { cwd: './dist' } );
} catch (error) {
  if (error.message.includes('You cannot publish over the previously published versions')) {
    console.log('Skipping already published version!')
  } else {
    console.error(error);
  }
}
