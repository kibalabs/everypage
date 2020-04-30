import fs from 'fs'
import path from 'path'
import { reloadClientData } from 'react-static/node'
import chokidar from 'chokidar';

console.log(`Running with root: ${__dirname}`)
const siteFilePath = path.join(__dirname, 'site.json');
const themeFilePath = path.join(__dirname, 'theme.json');
chokidar.watch(siteFilePath).add(themeFilePath).on('all', () => reloadClientData());

export default {
  paths: {
    root: __dirname,
  },
  entry: 'index.tsx',
  plugins: [
    ['react-static-plugin-typescript', { typeCheck: false }],
    'react-static-plugin-styled-components',
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
