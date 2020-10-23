import fs from 'fs'
import path from 'path'

let rootPath = __dirname;
console.log(`Running prod build with root: ${rootPath} env: ${process.env.NODE_ENV}`)

const siteFilePath = path.join(rootPath, 'site.json');
const themeFilePath = path.join(rootPath, 'theme.json');
const site = JSON.parse(fs.readFileSync(siteFilePath));
const theme = JSON.parse(fs.readFileSync(themeFilePath));

export default {
  assetsPath: site.buildHash || '',
  paths: {
    root: rootPath,
  },
  entry: 'index.tsx',
  plugins: [
    'react-static-plugin-everypage',
    'react-static-plugin-styled-components',
    ['react-static-plugin-source-filesystem', { location: path.resolve(rootPath, './src/pages') }],
  ],
  getSiteData: async () => {
    return {
      pageContent: site,
      pageTheme: theme,
    };
  },
};
