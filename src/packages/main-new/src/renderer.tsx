import React from 'react';
import ReactDOMServer from 'react-dom/server';
import flushChunks from 'webpack-flush-chunks'
import { ReportChunks } from 'react-universal-component';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import fs from 'fs';
import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import webpackMerge from 'webpack-merge';
import { createHistory, createMemorySource } from '@reach/router';
import { createAndRunCompiler } from '@kibalabs/build/scripts/common/webpackUtil';
import CreateRobotsTxtPlugin from '@kibalabs/build/scripts/plugins/createRobotsTxtPlugin';
import makeCommonWebpackConfig from '@kibalabs/build/scripts/common/common.webpack';
import makeJsWebpackConfig from '@kibalabs/build/scripts/common/js.webpack';
import makeImagesWebpackConfig from '@kibalabs/build/scripts/common/images.webpack';
import makeCssWebpackConfig from '@kibalabs/build/scripts/common/css.webpack';
import makeReactAppWebpackConfig from '@kibalabs/build/scripts/react-app/app.webpack';
import makeReactComponentWebpackConfig from '@kibalabs/build/scripts/react-component/component.webpack';
import { ChildCapture, HeadRootProvider, IWebsite } from '@kibalabs/everypage-core';
import { ITheme } from '@kibalabs/ui-react';

import { copyFileSync, copyDirectorySync }  from './util';
import default404Content from './404.json';

interface Page {
  path: string;
  filename: string;
  content: IWebsite;
  theme: ITheme;
}

export const render = async (buildDirectoryPath?: string, assetsDirectoryPath?: string, outputDirectoryPath?: string): Promise<void> => {
  const buildDirectory = buildDirectoryPath || path.join(process.cwd(), 'tmp');
  const assetsDirectory = assetsDirectoryPath || path.join(process.cwd(), 'assets');
  const outputDirectory = outputDirectoryPath || path.join(process.cwd(), 'dist');
  const outputDirectoryNode = path.join(buildDirectory, './output-node');

  const pages: Page[] = [
    {path: '/', filename: 'index.html', content: __non_webpack_require__(path.join(buildDirectory, 'site.json')), theme: __non_webpack_require__(path.join(buildDirectory, 'theme.json'))},
    {path: '/404', filename: '404.html', content: default404Content, theme: __non_webpack_require__(path.join(buildDirectory, 'theme.json'))},
  ];

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
    makeCommonWebpackConfig({dev: false, analyze: false}),
    makeJsWebpackConfig({polyfill: false, react: true}),
    makeImagesWebpackConfig(),
    makeCssWebpackConfig(),
    makeReactComponentWebpackConfig({dev: false, entryFile: path.join(buildDirectory, './index.js'), outputPath: outputDirectoryNode, addHtmlOutput: false, addRuntimeConfig: false, excludeAllNodeModules: true, nodeModulesPaths: nodeModulesPaths}),
    {
      output: {
        filename: 'static-app.js',
      },
    },
  );
  const webWebpackConfig = webpackMerge(
    makeCommonWebpackConfig({dev: false, analyze: false}),
    makeJsWebpackConfig({polyfill: true, react: true}),
    makeImagesWebpackConfig(),
    makeCssWebpackConfig(),
    makeReactAppWebpackConfig({dev: false, entryFile: path.join(buildDirectory, './index.js'), outputPath: outputDirectory, addHtmlOutput: false, addRuntimeConfig: false}),
    {
      plugins: [
        new CopyPlugin({
          patterns: [
            { from: path.join(buildDirectory, './public'), noErrorOnMissing: true },
          ]
        }),
        new CreateRobotsTxtPlugin(),
      ],
      performance: {
        hints: false
      },
    },
  );
  console.log('EP: generating node output');
  return createAndRunCompiler(nodeWebpackConfig).then(async (): Promise<object> => {
    console.log('EP: generating web output');
    return createAndRunCompiler(webWebpackConfig);
  }).then(async (webpackBuildStats: object): Promise<void> => {
    console.log('EP: generating static html');
    // NOTE(krishan711): this ensures the require is not executed at build time (only during runtime)
    const App = __non_webpack_require__(path.resolve(outputDirectoryNode, 'static-app.js')).default;
    pages.map((page: Page): void => {
      const chunkNames: string[] = []
      const headElements = [];
      const styledComponentsSheet = new ServerStyleSheet();
      const bodyString = ReactDOMServer.renderToString(
        <ReportChunks report={(chunkName: string) => chunkNames.push(chunkName)}>
          <StyleSheetManager sheet={styledComponentsSheet.instance}>
            <HeadRootProvider root={<ChildCapture headElements={headElements}/>}>
              <App
                routerHistory={createHistory(createMemorySource(page.path))}
                pageContent={page.content}
                pageTheme={page.theme}
                notFoundPageContent={default404Content}
                notFoundPageTheme={page.theme}
              />
            </HeadRootProvider>
          </StyleSheetManager>
        </ReportChunks>
      );
      const { scripts, stylesheets, css } = flushChunks(webpackBuildStats, {
        chunkNames: chunkNames,
        outputPath: '.',
      });
      const headString = ReactDOMServer.renderToStaticMarkup(
        <head>
          {headElements}
          {scripts.map((scriptName: string): React.ReactElement => (
            <link key={scriptName} rel='preload' as='script' href={`/${scriptName}`} />
          ))}
          {styledComponentsSheet.getStyleElement()}
        </head>
      );
      // TODO(krishan711): use stylesheets and css
      const bodyScriptsString = ReactDOMServer.renderToStaticMarkup(
        <React.Fragment>
          {scripts.map((scriptName: string): React.ReactElement => (
            <script defer={true} type='text/javascript' src={`/${scriptName}`}></script>
          ))}
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
      fs.writeFileSync(path.join(outputDirectory, page.filename), output);
    })
  });
};
