/* eslint-disable no-console */
import fs from 'fs';
import http from 'http';
import path from 'path';

import { Command, program as commanderProgram } from 'commander';
import rimraf from 'rimraf';
import serverHandler from 'serve-handler';

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

export const runFromProgram = async (command: string, params: ProgramParams): Promise<void> => {
  console.log('Welcome to everypage!');
  const port = params.port || 3000;
  const directory = path.join(process.cwd(), params.directory || 'site');
  const assetsDirectory = path.join(process.cwd(), params.assetsDirectory || 'assets');
  const buildDirectory = path.join(process.cwd(), params.buildDirectory || 'tmp');
  const outputDirectory = path.join(process.cwd(), params.outputDirectory || 'dist');
  const buildHash = params.buildHash || undefined;
  const siteHost = params.siteHost || undefined;

  if (params.clean) {
    console.log('EP: Clearing build and output directories');
    rimraf.sync(buildDirectory);
    rimraf.sync(outputDirectory);
  }

  if (fs.existsSync(buildDirectory)) {
    console.error(`Build directory ${buildDirectory} already exists! Please delete it and run this command again (or add --clean when calling everypage).`);
    return;
  }

  if (fs.existsSync(outputDirectory)) {
    console.error(`Output directory ${outputDirectory} already exists! Please delete it and run this command again (or add --clean when calling everypage).`);
    return;
  }

  if (command === 'build') {
    console.log(`EP: Building everypage project in ${buildDirectory}`);
    await render(directory, assetsDirectory, buildHash, siteHost, undefined, buildDirectory, outputDirectory);
  } else if (command === 'serve') {
    await render(directory, assetsDirectory, buildHash, siteHost, undefined, buildDirectory, outputDirectory);
    const server = http.createServer((request, response) => {
      return serverHandler(request, response, {
        public: outputDirectory,
      });
    });
    console.log('starting server...');
    await new Promise((resolve, reject): void => {
      try {
        server.once('listening', () => {
          server.removeAllListeners('error');
          server.removeAllListeners('listening');
        });
        server.once('error', (err) => {
          server.removeAllListeners('listening');
          server.removeAllListeners('error');
          reject(err);
        });
        process.on('exit', () => {
          server.removeAllListeners('listening');
          server.removeAllListeners('error');
          server.close();
          resolve(null);
        });
        server.listen(port, (): void => {
          console.log('Running at http://localhost:3000');
        });
      } catch (error) {
        reject(error);
      }
    });
    console.log('finished serving...');
  } else {
    console.error(`Unknown command: ${command}`);
  }
  rimraf.sync(buildDirectory);
};

export const createProgram = (version: string): typeof commanderProgram.Command => {
  const program = new Command('everypage-cli');
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

  // TODO(krishan711): implement start to watch the files and rebuild as needed (would need webpack watch I think)
  // program
  //   .command('start')
  //   .description('start a live-reloading version of your site')
  //   .option('-d, --directory <path>')
  //   .option('-a, --assets <path>')
  //   .option('-c, --clean', 'delete existing build and output directories before starting')
  //   .option('-b, --build-directory <path>')
  //   .option('-x, --build-hash <str>')
  //   .option('-u, --site-host <str>')
  //   .option('-o, --output-directory <path>')
  //   .option('-p, --port <number>')
  //   .action((params) => runFromProgram('start', params));

  return program;
};

export const renderSite = render;
