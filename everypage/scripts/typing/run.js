#!/usr/bin/env node
'use strict';

const fs = require('fs');
const commander = require('commander');
const path = require('path');
const params = commander
  .option('-d, --directory [path]')
  .option('-o, --output-file [path]')
  .parse(process.argv);

const ts = require('typescript');
const tsConfig = require('./tsconfig');

function findInDirectory(directory, filter) {
  var output = [];
  fs.readdirSync(directory).forEach(file => {
    let filename = path.join(directory, file);
    if (fs.lstatSync(filename).isDirectory()) {
      output = output.concat(findInDirectory(filename, filter));
    } else if (filename.indexOf(filter) >= 0) {
      output.push(filename);
    };
  });
  return output;
};

let files = findInDirectory(params.directory ? params.directory : './src', '.ts');
let program = ts.createProgram(files, {
  ...tsConfig.compilerOptions,
  noEmit: true,
});
let emitResult = program.emit();
let allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
var output = allDiagnostics.reduce((accumulatedValue, diagnostic) => {
  let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, ' ');
  if (diagnostic.file) {
    let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
    return `${accumulatedValue}${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}\n`;
  } else {
    return `${accumulatedValue}${message}\n`;
  }
}, '');

if (params.outputFile) {
  fs.writeFileSync(params.outputFile, output);
} else {
  console.log(output);
}
