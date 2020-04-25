import fs from 'fs'
import path from 'path'

console.log(`Running with root: ${__dirname}`)
const siteFilePath = path.join(__dirname, 'site.json');
const themeFilePath = path.join(__dirname, 'theme.json');

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
    return {
      pageContent: JSON.parse(fs.readFileSync(siteFilePath)),
      pageTheme: JSON.parse(fs.readFileSync(themeFilePath)),
    };
  },
};
