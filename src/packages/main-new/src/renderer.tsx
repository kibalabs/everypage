import React from 'react';
import ReactDOMServer from 'react-dom/server';
import flushChunks from 'webpack-flush-chunks'
import { ReportChunks } from 'react-universal-component';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import fs from 'fs';
import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import webpackMerge from 'webpack-merge';
import { ServerLocation, createHistory, createMemorySource } from '@reach/router';
import { createAndRunCompiler } from '@kibalabs/build/scripts/common/webpackUtil';
import CreateRobotsTxtPlugin from '@kibalabs/build/scripts/plugins/createRobotsTxtPlugin';
import makeCommonWebpackConfig from '@kibalabs/build/scripts/common/common.webpack';
import makeJsWebpackConfig from '@kibalabs/build/scripts/common/js.webpack';
import makeImagesWebpackConfig from '@kibalabs/build/scripts/common/images.webpack';
import makeCssWebpackConfig from '@kibalabs/build/scripts/common/css.webpack';
import makeReactAppWebpackConfig from '@kibalabs/build/scripts/react-app/app.webpack';
import makeReactComponentWebpackConfig from '@kibalabs/build/scripts/react-component/component.webpack';
import { ChildCapture, HeadRootProvider } from '@kibalabs/everypage-core';

export const trimLeadingSlashes = (string = '') => string.replace(/^\/{1,}/g, '');

export function isAbsoluteUrl(url) {
  if (typeof url !== 'string') {
    return false
  }
  return /^[a-z][a-z0-9+.-]*:/.test(url)
}

export function makePathAbsolute(path) {
  if (typeof path !== 'string') {
    return '/'
  }
  if (isAbsoluteUrl(path)) {
    return path
  }
  return `/${trimLeadingSlashes(path)}`
}

export const render = async (buildDirectoryPath?: string, outputDirectoryPath?: string): Promise<void> => {
  const buildDirectory = buildDirectoryPath || path.join(process.cwd(), 'tmp');
  const outputDirectory = outputDirectoryPath || path.join(process.cwd(), 'dist');
  const outputDirectoryNode = path.join(buildDirectory, './output-node');
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
    makeReactComponentWebpackConfig({dev: false, entryFile: path.join(buildDirectory, './index.tsx'), outputPath: outputDirectoryNode, addHtmlOutput: false, addRuntimeConfig: false, excludeAllNodeModules: true, nodeModulesPaths: nodeModulesPaths}),
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
    makeReactAppWebpackConfig({dev: false, entryFile: path.join(buildDirectory, './index.tsx'), outputPath: outputDirectory, addHtmlOutput: false, addRuntimeConfig: false}),
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
    const appPath = path.resolve(outputDirectoryNode, 'static-app.js');
    // NOTE(krishan711): this ensures the require is not executed at build time (only during runtime)
    const App = __non_webpack_require__(appPath).default;
    const chunkNames: string[] = []
    const headElements = [];
    const styledComponentsSheet = new ServerStyleSheet();
    const routerHistory = createHistory(createMemorySource('/'));
    const bodyString = ReactDOMServer.renderToString(
      <ReportChunks report={(chunkName: string) => chunkNames.push(chunkName)}>
        <StyleSheetManager sheet={styledComponentsSheet.instance}>
          <HeadRootProvider root={<ChildCapture headElements={headElements}/>}>
            <ServerLocation url={'/'}>
              <App routerHistory={routerHistory} />
            </ServerLocation>
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
        {scripts.map((script: string): React.ReactElement => (
          <link key={script} rel='preload' as='script' href={makePathAbsolute(path.join('.', script))} />
        ))}
        {styledComponentsSheet.getStyleElement()}
      </head>
    );
    // TODO(krishan711): use stylesheets and css
    const bodyScriptsString = scripts.map((script: string): string => (
      `<script defer type="text/javascript" src="${makePathAbsolute(path.join('.', script))}"></script>`
    )).join('');
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
    fs.writeFileSync(path.join(outputDirectory, 'index.html'), output);
  });
};
