import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import * as commander from 'commander';
import * as childProcess from 'child_process';
import * as chokidar from 'chokidar';
import * as everypageCore from '@kibalabs/everypage-core';

export const copyDirectorySync = (sourceDirectory, targetDirectory) => {
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

export const copyPackage = (buildDirectory) => {
  copyDirectorySync(path.join(__dirname, '../bin/package'), buildDirectory);
};

export const writeSiteFiles = (buildDirectory, siteContent, siteTheme, buildHash, siteHost, shouldHideAttribution = undefined) => {
  siteContent.buildHash = buildHash;
  siteContent.siteHost = siteHost;
  if (shouldHideAttribution !== null && shouldHideAttribution !== undefined) {
    siteContent.shouldHideAttribution = shouldHideAttribution;
  }
  siteContent = everypageCore.updateAssetPaths(siteContent, `/${buildHash}`);
  fs.writeFileSync(path.join(buildDirectory, 'site.json'), JSON.stringify(siteContent));
  fs.writeFileSync(path.join(buildDirectory, 'theme.json'), JSON.stringify(siteTheme));
}

export const build = (buildDirectory, outputDirectory) => {
  console.log(`Building everypage project in ${buildDirectory}`);
  const npxProcess = childProcess.spawnSync(`npx`, ['react-static', 'build', '--config', path.join(buildDirectory, 'static-prod.config.js')], { stdio: ['inherit', 'inherit', 'pipe'] });
  if (npxProcess.status !== 0) {
    throw new Error(`Failed when building everypage project: ${npxProcess.stderr} ${npxProcess.error}`);
  } else if (npxProcess.stderr || npxProcess.error) {
    console.warn(`everypage project built with error: ${npxProcess.stderr} ${npxProcess.error}`);
  }
  copyDirectorySync(path.join(buildDirectory, 'dist'), outputDirectory);
};

export const serve = async (buildDirectory, outputDirectory, port) => {
  build(buildDirectory, outputDirectory);
  const server = childProcess.spawn(`npx`, ['serve', outputDirectory, '-p', port]);
  process.on('exit', () => {
    console.log('Shutting down server');
    server.kill();
  });
  return server;
};

export const start = async (buildDirectory, assetsDirectory, siteFilePath, themeFilePath, buildHash, siteHost, shouldHideAttribution? = false) => {
  const server = childProcess.spawn(`npx`, ['react-static', 'start', '--config', path.join(buildDirectory, 'static-dev.config.js')], { stdio: ['inherit', 'inherit', 'pipe'] });
  server.on('error', (error) => {
    console.error(`Error starting everypage project: ${error}`);
    server.kill();
  });
  if (assetsDirectory) {
    chokidar.watch(assetsDirectory).on('all', () => {
      copyDirectorySync(assetsDirectory, path.join(buildDirectory, './public/assets'));
    });
  }
  chokidar.watch(siteFilePath).add(themeFilePath).on('all', () => {
    writeSiteFiles(buildDirectory, readJsonFile(siteFilePath), readJsonFile(themeFilePath), buildHash, siteHost, shouldHideAttribution);
  });
  process.on('SIGTERM', () => {
    console.log('Shutting down server');
    server.kill();
  });
  return server;
};

const readJsonFile = (filePath) => {
  return JSON.parse(String(fs.readFileSync(filePath)));
};

export const runFromProgram = async (command, params) => {
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

  copyPackage(buildDirectory);
  if (assetsDirectory) {
    copyDirectorySync(assetsDirectory, path.join(buildDirectory, './public/assets'));
  }
  writeSiteFiles(buildDirectory, readJsonFile(siteFilePath), readJsonFile(themeFilePath), buildHash, siteHost, undefined);
  if (command === 'build') {
    build(buildDirectory, outputDirectory);
  } else if (command === 'serve') {
    await serve(buildDirectory, outputDirectory, port)
  } else if (command === 'start') {
    await start(buildDirectory, assetsDirectory, siteFilePath, themeFilePath, buildHash, siteHost);
  }
  rimraf.sync(buildDirectory);
};

export const createProgram = (version) => {
  const program = commander.program;
  program
    .version(version)
    .command('start')
    .description('start a live-reloading version of your site')
    .option('-d, --directory <path>')
    .option('-c, --clean', 'delete existing build and output directories before starting')
    .option('-b, --build-directory <path>')
    .option('-x, --build-hash <str>')
    .option('-u, --site-host <str>')
    .option('-o, --output-directory <path>')
    .option('-p, --port <number>')
    .action((params) => runFromProgram('start', params));

  program
    .command('build')
    .description('build a production ready output')
    .option('-d, --directory <path>')
    .option('-c, --clean', 'delete existing build and output directories before starting')
    .option('-b, --build-directory <path>')
    .option('-x, --build-hash <str>')
    .option('-u, --site-host <str>')
    .option('-o, --output-directory <path>')
    .action((params) => runFromProgram('build', params));

  program
    .command('serve')
    .description('build and serve a production ready output')
    .option('-d, --directory <path>')
    .option('-c, --clean', 'delete existing build and output directories before starting')
    .option('-b, --build-directory <path>')
    .option('-x, --build-hash <str>')
    .option('-u, --site-host <str>')
    .option('-o, --output-directory <path>')
    .option('-p, --port <number>')
    .action((params) => runFromProgram('serve', params));

    return program;
};
