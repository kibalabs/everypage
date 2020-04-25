import fs from 'fs'
import path from 'path'
import { reloadClientData } from '@kibalabs/react-static/node'

console.log(`Running with root: ${__dirname}`)
const siteFilePath = path.join(__dirname, 'site.json');
const themeFilePath = path.join(__dirname, 'theme.json');
fs.watch(siteFilePath, () => reloadClientData());
fs.watch(themeFilePath, () => reloadClientData());

export default {
  paths: {
    root: __dirname,
  },
  entry: 'index.tsx',
  plugins: [
    ['@kibalabs/react-static-plugin-typescript', { typeCheck: false }],
    '@kibalabs/react-static-plugin-styled-components',
  ],
  getSiteData: async () => {
    return sleep(100, () => {
      return {
        pageContent: JSON.parse(fs.readFileSync(siteFilePath)),
        pageTheme: JSON.parse(fs.readFileSync(themeFilePath)),
      };
    });
  },
};

async function sleep(ms, fn, ...args) {
  await new Promise(resolve => setTimeout(resolve, ms));
  return fn(...args);
};
