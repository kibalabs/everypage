import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { Command } from 'commander';
import { ITheme } from '@kibalabs/ui-react';
import { updateAssetPaths, IWebsite } from '@kibalabs/everypage-core';

import { render } from './renderer';

export const copyDirectorySync = (sourceDirectory, targetDirectory) => {
  console.log(`copyDirectorySync: ${sourceDirectory} ${targetDirectory}`);
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
      fs.writeFileSync(targetFilePath, fs.readFileSync(sourceFilePath));
    }
  });
};

export const writeSiteFiles = async (buildDirectory: string, siteContent: IWebsite, siteTheme: ITheme, buildHash: string, siteHost: string, shouldHideAttribution: boolean = undefined): Promise<void> => {
  siteContent.buildHash = buildHash;
  siteContent.siteHost = siteHost;
  if (shouldHideAttribution !== null && shouldHideAttribution !== undefined) {
    siteContent.shouldHideAttribution = shouldHideAttribution;
  }
  siteContent = updateAssetPaths(siteContent, `/${buildHash}`);
  fs.writeFileSync(path.join(buildDirectory, 'site.json'), JSON.stringify(siteContent));
  fs.writeFileSync(path.join(buildDirectory, 'theme.json'), JSON.stringify(siteTheme));
}

export const build = async (buildDirectory: string, outputDirectory: string) => {
  console.log(`Building everypage project in ${buildDirectory}`);
  await render(buildDirectory, outputDirectory);
};

const readJsonFile = (filePath: string): object => {
  return JSON.parse(String(fs.readFileSync(filePath)));
};

interface ProgramParams {
  port?: number;
  directory?: string;
  buildDirectory?: string;
  outputDirectory?: string;
  buildHash?: string;
  siteHost?: string;
  clean?: boolean;
}

export const runFromProgram = async (command: string, params: ProgramParams) => {
  const port = params.port || 3000;
  const directory = params.directory ? path.join(process.cwd(), params.directory) : process.cwd();
  const buildDirectory = params.buildDirectory ? path.join(process.cwd(), params.buildDirectory) : path.join(directory, 'tmp');
  const outputDirectory = params.outputDirectory ? path.join(process.cwd(), params.outputDirectory) : path.join(directory, 'dist');
  const siteFilePath = path.join(directory, 'site.json');
  const themeFilePath = path.join(directory, 'theme.json');
  const assetsDirectory = path.join(directory, 'assets');
  const buildHash = params.buildHash || null;
  const siteHost = params.siteHost || null;

  if (params.clean) {
    console.log('Clearing build and output directories');
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

  await copyDirectorySync(path.join(__dirname, '../bin/package'), buildDirectory);
  if (assetsDirectory) {
    await copyDirectorySync(assetsDirectory, path.join(buildDirectory, './public/assets'));
  }
  await writeSiteFiles(buildDirectory, readJsonFile(siteFilePath), readJsonFile(themeFilePath), buildHash, siteHost, undefined);
  if (command === 'build') {
    await build(buildDirectory, outputDirectory);
  // } else if (command === 'serve') {
  //   await serve(buildDirectory, outputDirectory, port)
  // } else if (command === 'start') {
  //   await start(buildDirectory, assetsDirectory, siteFilePath, themeFilePath, buildHash, siteHost);
  } else {
    console.error(`Unknown command: ${command}`);
  }
  // rimraf.sync(buildDirectory);
};

export const createProgram = (version: string): Command => {
  const program = new Command();
  program.version(version);
  program
    .command('build')
    .description('build a production ready output')
    .option('-d, --directory <path>')
    .option('-c, --clean', 'delete existing build and output directories before starting')
    .option('-b, --build-directory <path>')
    .option('-x, --build-hash <str>')
    .option('-u, --site-host <str>')
    .option('-o, --output-directory <path>')
    .action(async (params) => runFromProgram('build', params));

  // program
  //   .command('serve')
  //   .description('build and serve a production ready output')
  //   .option('-d, --directory <path>')
  //   .option('-c, --clean', 'delete existing build and output directories before starting')
  //   .option('-b, --build-directory <path>')
  //   .option('-x, --build-hash <str>')
  //   .option('-u, --site-host <str>')
  //   .option('-o, --output-directory <path>')
  //   .option('-p, --port <number>')
  //   .action((params) => runFromProgram('serve', params));

  // program
  //   .command('start')
  //   .description('start a live-reloading version of your site')
  //   .option('-d, --directory <path>')
  //   .option('-c, --clean', 'delete existing build and output directories before starting')
  //   .option('-b, --build-directory <path>')
  //   .option('-x, --build-hash <str>')
  //   .option('-u, --site-host <str>')
  //   .option('-o, --output-directory <path>')
  //   .option('-p, --port <number>')
  //   .action((params) => runFromProgram('start', params));

  return program;
};
