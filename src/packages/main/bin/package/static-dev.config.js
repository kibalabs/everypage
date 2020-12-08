import fs from 'fs'
import path from 'path'
import { reloadClientData } from 'react-static/node'
import chokidar from 'chokidar';

let rootPath = __dirname;
console.log(`Running dev build with root: ${rootPath} env: ${process.env.NODE_ENV}`)

const siteFilePath = path.join(rootPath, 'site.json');
const themeFilePath = path.join(rootPath, 'theme.json');
chokidar.watch(siteFilePath).add(themeFilePath).on('all', () => reloadClientData());

export default {
  paths: {
    root: rootPath,
  },
  entry: 'index.tsx',
  plugins: [
    'react-static-plugin-everypage',
    ['react-static-plugin-source-filesystem', { location: path.resolve(rootPath, './src/pages') }],
  ],
  getSiteData: async () => {
    return sleep(15, async () => {
      const promises = [fs.promises.readFile(siteFilePath), fs.promises.readFile(themeFilePath)];
      return Promise.all(promises).then((values) => {
        return {
          pageContent: JSON.parse(values[0]),
          pageTheme: JSON.parse(values[1]),
        }
      });
    });
  },
};

async function sleep(ms, fn) {
  await new Promise(resolve => setTimeout(resolve, ms));
  return fn();
};
