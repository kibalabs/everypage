import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { Command } from 'commander';

import { render } from './renderer';

interface ProgramParams {
  port?: number;
  directory?: string;
  assetsDirectory?: string;
  buildDirectory?: string;
  outputDirectory?: string;
  buildHash?: string;
  siteHost?: string;
  clean?: boolean;
}

export const runFromProgram = async (command: string, params: ProgramParams) => {
  const port = params.port || 3000;
  const directory = path.join(process.cwd(), params.directory || 'site');
  const assetsDirectory = path.join(process.cwd(), params.assetsDirectory || 'assets');
  const buildDirectory = path.join(process.cwd(), params.buildDirectory || 'tmp');
  const outputDirectory = path.join(process.cwd(), params.outputDirectory || 'dist');
  const buildHash = params.buildHash || null;
  const siteHost = params.siteHost || null;

  if (params.clean) {
    console.log('EP: Clearing build and output directories');
    rimraf.sync(buildDirectory);
    rimraf.sync(outputDirectory);
  }

  if (fs.existsSync(buildDirectory)) {
    console.error(`Build directory ${buildDirectory} already exists! Please delete it and run this command again (or add --clean when calling everypage).`)
    return;
  }

  if (fs.existsSync(outputDirectory)) {
    console.error(`Output directory ${outputDirectory} already exists! Please delete it and run this command again (or add --clean when calling everypage).`)
    return;
  }

  if (command === 'build') {
    console.log(`EP: Building everypage project in ${buildDirectory}`);
    await render(directory, assetsDirectory, buildHash, siteHost, undefined, buildDirectory, outputDirectory);
  } else if (command === 'serve') {
    console.error('Not implemented yet!');
  } else if (command === 'start') {
    console.error('Not implemented yet!');
  } else {
    console.error(`Unknown command: ${command}`);
  }
  rimraf.sync(buildDirectory);
};

export const createProgram = (version: string): Command => {
  const program = new Command();
  program.version(version);
  program
    .command('build')
    .description('build a production ready output')
    .option('-d, --directory <path>')
    .option('-a, --assets <path>')
    .option('-c, --clean', 'delete existing build and output directories before starting')
    .option('-b, --build-directory <path>')
    .option('-x, --build-hash <str>')
    .option('-u, --site-host <str>')
    .option('-o, --output-directory <path>')
    .action(async (params) => runFromProgram('build', params));

  program
    .command('serve')
    .description('build and serve a production ready output')
    .option('-d, --directory <path>')
    .option('-a, --assets <path>')
    .option('-c, --clean', 'delete existing build and output directories before starting')
    .option('-b, --build-directory <path>')
    .option('-x, --build-hash <str>')
    .option('-u, --site-host <str>')
    .option('-o, --output-directory <path>')
    .option('-p, --port <number>')
    .action((params) => runFromProgram('serve', params));

  program
    .command('start')
    .description('start a live-reloading version of your site')
    .option('-d, --directory <path>')
    .option('-a, --assets <path>')
    .option('-c, --clean', 'delete existing build and output directories before starting')
    .option('-b, --build-directory <path>')
    .option('-x, --build-hash <str>')
    .option('-u, --site-host <str>')
    .option('-o, --output-directory <path>')
    .option('-p, --port <number>')
    .action((params) => runFromProgram('start', params));

  return program;
};

export const renderSite = render;
