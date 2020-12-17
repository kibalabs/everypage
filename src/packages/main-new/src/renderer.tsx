import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ReportChunks } from 'react-universal-component';
import { isExternalPackageRequest } from '@kibalabs/build/scripts/common/packageUtil';
import makeCommonWebpackConfig from '@kibalabs/build/scripts/common/common.webpack';
import makeJsWebpackConfig from '@kibalabs/build/scripts/common/js.webpack';
import makeImagesWebpackConfig from '@kibalabs/build/scripts/common/images.webpack';
import makeCssWebpackConfig from '@kibalabs/build/scripts/common/css.webpack';
import makeReactAppWebpackConfig from '@kibalabs/build/scripts/react-app/app.webpack';
import { ChildCapture, HeadRootProvider } from '@kibalabs/everypage-core';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import flushChunks from 'webpack-flush-chunks'
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import chalk from 'chalk';
import CopyPlugin from 'copy-webpack-plugin';
import webpackMerge from 'webpack-merge';
import { ServerLocation, createHistory, createMemorySource } from '@reach/router';

class CreateRobotsWebpackPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap('CreateRobots', async () => {
      fs.writeFileSync(path.join(compiler.options.output.path, 'robots.txt'), 'User-agent: *\nDisallow:\n');
    });
  }
}

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
  return new Promise(async (resolve, reject): Promise<void> => {
    console.log('EP: generating node output');
    const nodeWebpackConfig = webpackMerge(
      makeCommonWebpackConfig({analyze: false}),
      makeJsWebpackConfig({react: true}),
      makeImagesWebpackConfig(),
      makeCssWebpackConfig(),
      makeReactAppWebpackConfig({entryFile: path.join(buildDirectory, './index.tsx'), outputPath: outputDirectoryNode, addHtmlOutput: false, addRuntimeConfig: false}),
      {
        mode: 'production',
        target: 'node',
        output: {
          filename: 'static-app.js',
          libraryTarget: 'umd',
        },
        optimization: {
          runtimeChunk: false,
          splitChunks: {
            chunks: 'async',
          },
        },
        externals: [
          function(context, request, callback) {
            if (isExternalPackageRequest(__non_webpack_require__(path.join(process.cwd(), 'package.json')), request)) {
              return callback(null, 'commonjs ' + request);
            }
            console.log('non external package:', request);
            return callback();
          }
        ],
      },
    );
    console.log('nodeWebpackConfig', nodeWebpackConfig);
    webpack(nodeWebpackConfig).run((err, stats) => {
      if (err) {
        console.log(chalk.red(err.stack || err))
        if (err.details) {
          console.log(chalk.red(err.details))
        }
        return reject(err);
      }

      if (stats.hasErrors() || stats.hasWarnings()) {
        console.log(stats.toString({
          performance: false,
          hash: false,
          timings: true,
          entrypoints: false,
          chunkOrigins: false,
          chunkModules: false,
          colors: chalk.supportsColor,
        }));

        if (stats.hasErrors()) {
          console.log(chalk.red.bold(`=> There were ERRORS during the build stage! :(`));
          return reject(err);
        }
        if (stats.hasWarnings()) {
          console.log(chalk.yellow(`=> There were WARNINGS during the build stage. Your site will still function, but you may achieve better performance by addressing the warnings above.`));
        }
      }
      return resolve();
    });
  }).then((): Promise<any> => {
    console.log('EP: generating web output');
    const webWebpackConfig = webpackMerge(
      makeCommonWebpackConfig({analyze: false}),
      makeJsWebpackConfig({react: true, polyfill: true}),
      makeImagesWebpackConfig(),
      makeCssWebpackConfig(),
      makeReactAppWebpackConfig({entryFile: path.join(buildDirectory, './index.tsx'), outputPath: outputDirectory}),
      {
        mode: 'production',
        plugins: [
          new CopyPlugin({
            patterns: [
              { from: path.join(buildDirectory, './public'), noErrorOnMissing: true },
            ]
          }),
          new CreateRobotsWebpackPlugin(),
        ],
      },
    );
    return new Promise(async (resolve, reject): Promise<any> => {
      webpack(webWebpackConfig).run((err, stats) => {
        if (err) {
          console.log(chalk.red(err.stack || err))
          if (err.details) {
            console.log(chalk.red(err.details))
          }
          return reject(err);
        }

        if (stats.hasErrors() || stats.hasWarnings()) {
          console.log(stats.toString({
            performance: false,
            hash: false,
            timings: true,
            entrypoints: false,
            chunkOrigins: false,
            chunkModules: false,
            colors: chalk.supportsColor,
          }));

          if (stats.hasErrors()) {
            console.log(chalk.red.bold(`=> There were ERRORS during the build stage! :(`));
            return reject(err);
          }
          if (stats.hasWarnings()) {
            console.log(chalk.yellow(`=> There were WARNINGS during the build stage. Your site will still function, but you may achieve better performance by addressing the warnings above.`));
          }
        }
        return resolve(stats);
      });
    })
  }).then(async (stats): Promise<void> => {
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
    const { scripts, stylesheets, css } = flushChunks(stats.toJson(), {
      chunkNames,
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
      <html>
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
  }).catch((error): void => {
    console.log('Failed due to error:', error);
  });
};
