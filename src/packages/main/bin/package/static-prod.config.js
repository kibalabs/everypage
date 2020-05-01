import fs from 'fs'
import path from 'path'

console.log(`Running with root: ${__dirname}`)
const siteFilePath = path.join(__dirname, 'site.json');
const themeFilePath = path.join(__dirname, 'theme.json');
const site = JSON.parse(fs.readFileSync(siteFilePath));
const theme = JSON.parse(fs.readFileSync(themeFilePath));

export default {
  basePath: site.buildHash || '',
  assetsPath: site.buildHash || '',
  paths: {
    root: __dirname,
  },
  entry: 'index.tsx',
  plugins: [
    ['react-static-plugin-typescript', { typeCheck: false }],
    'react-static-plugin-styled-components',
    [ 'react-static-plugin-source-filesystem', {location: path.join(__dirname, './src/pages')}],
  ],
  getSiteData: async () => {
    return {
      pageContent: site,
      pageTheme: theme,
    };
  },
};
