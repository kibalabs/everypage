import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import fs from 'fs';
import path from 'path';
import webpackMerge from 'webpack-merge';
import { createStaticHistory } from '@kibalabs/core-react';
import { ChildCapture, HeadRootProvider, IWebsite } from '@kibalabs/everypage-core';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
import { createAndRunCompiler } from '@kibalabs/build/scripts/common/webpackUtil';
import makeCommonWebpackConfig from '@kibalabs/build/scripts/common/common.webpack';
import makeJsWebpackConfig from '@kibalabs/build/scripts/common/js.webpack';
import makeImagesWebpackConfig from '@kibalabs/build/scripts/common/images.webpack';
import makeCssWebpackConfig from '@kibalabs/build/scripts/common/css.webpack';
import makeReactAppWebpackConfig from '@kibalabs/build/scripts/react-app/app.webpack';
import makeReactComponentWebpackConfig from '@kibalabs/build/scripts/react-component/component.webpack';

import { copyFileSync, copyDirectorySync, loadPathsFromDirectory, loadContentFromFileSync, IPage } from './util';
import default404Content from './404.json';

export const render = async (siteDirectoryPath?: string, assetsDirectoryPath?: string, buildHash?: string, siteHost?: string, shouldHideAttribution?: boolean, buildDirectoryPath?: string, outputDirectoryPath?: string): Promise<void> => {
  const siteDirectory = siteDirectoryPath || process.cwd();
  const buildDirectory = buildDirectoryPath || path.join(process.cwd(), 'tmp');
  const assetsDirectory = assetsDirectoryPath;
  const outputDirectory = outputDirectoryPath || path.join(process.cwd(), 'dist');
  const outputDirectoryNode = path.join(buildDirectory, './output-node');
  fs.mkdirSync(buildDirectory, { recursive: true });
  fs.mkdirSync(outputDirectory, { recursive: true });
  fs.mkdirSync(outputDirectoryNode, { recursive: true });

  const initialContent = {buildHash, siteHost} as IWebsite;
  if (shouldHideAttribution !== null && shouldHideAttribution !== undefined) {
    initialContent.shouldHideAttribution = shouldHideAttribution;
  }

  const pages = loadPathsFromDirectory(siteDirectory, '', buildHash, initialContent, undefined);
  console.log(`EP: loaded ${pages.length} pages`);
  const content404 = fs.existsSync(path.join(siteDirectory, '404.json')) ? loadContentFromFileSync(path.join(siteDirectory, '404.json'), pages[0].content) : default404Content;
  const page404 = {path: '404', filename: '/404.html', content: content404, theme: pages[0].theme};

  const siteData = {
    routes: pages,
    notFoundPageContent: page404.content,
    notFoundPageTheme: page404.theme,
  }
  fs.writeFileSync(path.join(buildDirectory, 'siteData.json'), JSON.stringify(siteData));

  await copyFileSync(path.join(__dirname, './app.js'), path.join(buildDirectory, 'index.js'));
  if (assetsDirectory) {
    await copyDirectorySync(assetsDirectory, path.join(buildDirectory, './public/assets'));
  }

  const nodeModulesPaths = [
    path.resolve(__dirname, '../node_modules'),
    // NOTE(krishan711): this is here because of lerna!)
    path.resolve(__dirname, '../../../node_modules'),
  ];
  const nodeWebpackConfig = webpackMerge(
    makeCommonWebpackConfig({name: 'everypage-site-node', dev: false, analyze: false}),
    makeJsWebpackConfig({polyfill: false, react: true}),
    makeImagesWebpackConfig(),
    makeCssWebpackConfig(),
    makeReactComponentWebpackConfig({dev: false, entryFile: path.join(buildDirectory, './index.js'), outputPath: outputDirectoryNode, addHtmlOutput: false, addRuntimeConfig: false, excludeAllNodeModules: true, nodeModulesPaths: nodeModulesPaths}),
  );
  const webWebpackConfig = webpackMerge(
    makeCommonWebpackConfig({name: 'everypage-site', dev: false, analyze: true}),
    makeJsWebpackConfig({polyfill: true, react: true}),
    makeImagesWebpackConfig(),
    makeCssWebpackConfig(),
    makeReactAppWebpackConfig({dev: false, entryFile: path.join(buildDirectory, './index.js'), outputPath: outputDirectory, addHtmlOutput: false, addRuntimeConfig: false, publicDirectory: path.join(buildDirectory, './public')}),
    {
      performance: {
        hints: false
      },
    },
  );
  console.log('webWebpackConfig', webWebpackConfig);
  console.log('EP: generating node output');
  return createAndRunCompiler(nodeWebpackConfig).then(async (): Promise<object> => {
    console.log('EP: generating web output');
    return createAndRunCompiler(webWebpackConfig);
  }).then(async (webpackBuildStats: object): Promise<void> => {
    console.log('EP: generating static html');
    // NOTE(krishan711): this ensures the require is not executed at build time (only during runtime)
    const App = __non_webpack_require__(path.resolve(outputDirectoryNode, 'index.js')).default;
    pages.concat(page404).forEach((page: IPage): void => {
      console.log(`EP: rendering page ${page.path} to ${page.filename}`);
      const headElements = [];
      const styledComponentsSheet = new ServerStyleSheet();
      const extractor = new ChunkExtractor({stats: webpackBuildStats});
      const bodyString = ReactDOMServer.renderToString(
        <ChunkExtractorManager extractor={extractor}>
          <StyleSheetManager sheet={styledComponentsSheet.instance}>
            <HeadRootProvider root={<ChildCapture headElements={headElements}/>}>
              <App routerHistory={createStaticHistory(page.path)} />
            </HeadRootProvider>
          </StyleSheetManager>
        </ChunkExtractorManager>
      );
      const headString = ReactDOMServer.renderToStaticMarkup(
        <head>
          {headElements}
          {extractor.getLinkElements()}
          {styledComponentsSheet.getStyleElement()}
        </head>
      );
      // TODO(krishan711): use stylesheets and css
      const bodyScriptsString = ReactDOMServer.renderToStaticMarkup(
        <React.Fragment>
          {extractor.getScriptElements()}
        </React.Fragment>
      );
      const output = `<!DOCTYPE html>
        <html lang="en">
          ${headString}
          <body>
            <div id="root">
              ${bodyString}
            </div>
            ${bodyScriptsString}
          </body>
        </html>
      `;
      const outputPath = path.join(outputDirectory, page.filename);
      fs.mkdirSync(path.dirname(outputPath), { recursive: true })
      fs.writeFileSync(outputPath, output);
    })
  });
};
