import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import * as commander from 'commander';
import * as childProcess from 'child_process';

export const updateAssetPaths = (siteConfig, buildHash) => {
  if (!buildHash) {
    return siteConfig;
  }
  return Object.keys(siteConfig).reduce((result, key) => {
    let value = siteConfig[key];
    if (typeof value == 'string') {
      value = value.startsWith('/assets/') ? value.replace(/^/, `/${buildHash}`) : value;
    } else if (Array.isArray(value)) {
      value = value.map(entry => updateAssetPaths(entry, buildHash));
    } else if (typeof value == 'object') {
      value = updateAssetPaths(value, buildHash);
    }
    result[key] = value;
    return result
  }, {});
};

export const copyDirectorySync = (sourceDirectory, targetDirectory) => {
  console.log(`Copying directory from ${sourceDirectory} to ${targetDirectory}`);
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

export const loadSite = (siteFilePath, buildHash) => {
  let siteContent = JSON.parse(String(fs.readFileSync(siteFilePath)));
  siteContent.buildHash = buildHash;
  return updateAssetPaths(siteContent, buildHash);
}

export const loadTheme = (themeFilePath) => {
  return JSON.parse(String(fs.readFileSync(themeFilePath)));
}

export const setup = (buildDirectory, assetsDirectory, siteFilePath, themeFilePath, buildHash) => {
  copyDirectorySync(path.join(__dirname, '../bin/package'), buildDirectory);
  copyDirectorySync(assetsDirectory, path.join(buildDirectory, './public/assets'));
  fs.writeFileSync(path.join(buildDirectory, 'site.json'), JSON.stringify(loadSite(siteFilePath, buildHash)));
  fs.writeFileSync(path.join(buildDirectory, 'theme.json'), JSON.stringify(loadTheme(themeFilePath)));
};

export const build = (buildDirectory, outputDirectory) => {
  console.log(`Building react-static project in ${buildDirectory}`);
  const npxProcess = childProcess.spawnSync(`npx`, ['react-static', 'build', '--config', path.join(buildDirectory, 'static-prod.config.js')], { stdio: ['inherit', 'inherit', 'pipe'] });
  if (npxProcess.status !== 0) {
    throw new Error(`Failed when running react-static: ${npxProcess.stderr} ${npxProcess.error}`);
  } else if (npxProcess.stderr) {
    console.warn(`react-static built with error: ${npxProcess.stderr}`);
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

export const start = async (buildDirectory, assetsDirectory, siteFilePath, themeFilePath, buildHash) => {
  const server = childProcess.spawn(`npx`, ['react-static', 'start', '--config', path.join(buildDirectory, 'static-dev.config.js')], { stdio: ['inherit', 'inherit', 'pipe'] });
  server.on('error', (error) => {
    console.error(`Error starting react-static project: ${error}`);
    server.kill();
  });
  fs.watch(assetsDirectory, (event, filename) => {
    // TODO(krish): use event and filename
    copyDirectorySync(assetsDirectory, path.join(buildDirectory, './public/assets'));
  });
  fs.watch(siteFilePath, () => {
    if (!fs.existsSync(siteFilePath)) {
      throw new Error(`site file was removed from ${siteFilePath}`);
    }
    fs.writeFileSync(path.join(buildDirectory, 'site.json'), JSON.stringify(loadSite(siteFilePath, buildHash)));
  });
  fs.watch(themeFilePath, () => {
    if (!fs.existsSync(themeFilePath)) {
      throw new Error(`theme file was removed from ${themeFilePath}`);
    }
    fs.writeFileSync(path.join(buildDirectory, 'theme.json'), JSON.stringify(loadTheme(themeFilePath)));
  });
  process.on('SIGTERM', () => {
    console.log('Shutting down server');
    server.kill();
  });
  return server;
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

  setup(buildDirectory, assetsDirectory, siteFilePath, themeFilePath, buildHash);
  if (command === 'build') {
    build(buildDirectory, outputDirectory);
  } else if (command === 'serve') {
    await serve(buildDirectory, outputDirectory, port)
  } else if (command === 'start') {
    await start(buildDirectory, assetsDirectory, siteFilePath, themeFilePath, buildHash);
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
    .option('-o, --output-directory <path>')
    .action((params) => runFromProgram('build', params));

  program
    .command('serve')
    .description('build and serve a production ready output')
    .option('-d, --directory <path>')
    .option('-c, --clean', 'delete existing build and output directories before starting')
    .option('-b, --build-directory <path>')
    .option('-x, --build-hash <str>')
    .option('-o, --output-directory <path>')
    .option('-p, --port <number>')
    .action((params) => runFromProgram('serve', params));

    return program;
};
