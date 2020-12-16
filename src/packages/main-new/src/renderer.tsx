import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ReportChunks } from 'react-universal-component';
import { ChildCapture, HeadRootProvider } from '@kibalabs/everypage-core';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import flushChunks from 'webpack-flush-chunks'
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import chalk from 'chalk';
import CopyPlugin from 'copy-webpack-plugin';
import webpackMerge from 'webpack-merge';
import webpackBundleAnalyzer from 'webpack-bundle-analyzer';
import { ServerLocation, createHistory, createMemorySource } from '@reach/router';


export const trimLeadingSlashes = (string = '') => string.replace(/^\/{1,}/g, '')

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

const getExternalPackages = (package) => {
  return Object.keys(package.dependencies || {})
    .concat(Object.keys(package.peerDependencies || {}))
    .concat(Object.keys(package.optionalDependencies || {}));
}

const isExternalPackageRequest = (package, request) => {
  return getExternalPackages(package).some((packageName) => {
    return (request === packageName) || (request.indexOf(`${packageName}/`) === 0)
  });
}

const commonConfig = (config = {}) => ({
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  resolve: {
    alias: {
      '@src': path.join(process.cwd(), './src'),
    }
  },
  plugins: [
    ...(config.analyze ? [
      new webpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: 'json', reportFilename: './bundle-size.json' }),
      new webpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: 'static', reportFilename: './bundle-size.html' }),
    ] : [])
  ],
});

const babelConfig = (config = {}) => ({
  presets: [
    ["@babel/preset-env", config.polyfill ? {
      useBuiltIns: "usage",
      corejs: {
        version: 3.6,
        proposals: true,
      },
      targets: "defaults, >0.2%, not dead, ie 11",
    } : {}],
    "@babel/preset-typescript",
    ...(config.react ? ["@babel/preset-react"] : [])
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-optional-chaining",
    "babel-plugin-styled-components",
    ...(config.react ? ["react-hot-loader/babel"] : [])
  ],
})

const jsConfig = (config = {}) => ({
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /(node_modules|build|dist)\//,
        use: {
          loader: 'babel-loader',
          options: babelConfig(config),
        },
      },
    ],
  },
});

const imagesConfig = (config = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            fallback: 'file-loader',
            name: '[name]__[local]___[hash:base64:5].[ext]',
            outputPath: 'assets/',
            publicPath: '/assets/'
          },
        },
      },
    ],
  },
});

const cssConfig = (config = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
});

const webWebpackConfig = webpackMerge(
  commonConfig({analyze: false}),
  jsConfig({react: true, polyfill: true}),
  imagesConfig(),
  cssConfig(),
{
  mode: 'production',
  entry: [
    'core-js/stable',
    'regenerator-runtime/runtime',
    'whatwg-fetch',
    'react-hot-loader/patch',
  ],
  target: 'web',
  output: {
    chunkFilename: '[name].[hash:8].bundle.js',
    filename: '[name].[hash:8].js',
    publicPath: '/',
    pathinfo: false,
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
  ],
});

const nodeWebpackConfig = webpackMerge(
  commonConfig({analyze: false}),
  jsConfig({react: true}),
  imagesConfig(),
  cssConfig(),
{
  mode: 'production',
  entry: [
    'regenerator-runtime/runtime',
    'whatwg-fetch',
    'react-hot-loader/patch',
  ],
  target: 'node',
  output: {
    filename: 'static-app.js',
    chunkFilename: '[name].[hash:8].bundle.js',
    publicPath: '/',
    pathinfo: false,
    libraryTarget: 'umd',
  },
  optimization: {
    minimize: false,
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
});

export const render = async (buildDirectoryPath?: string, outputDirectoryPath?: string): Promise<void> => {
  const buildDirectory = buildDirectoryPath || path.join(process.cwd(), 'tmp');
  const outputDirectory = outputDirectoryPath || path.join(process.cwd(), 'dist');
  const outputDirectoryNode = path.join(buildDirectory, './output-node');
  return new Promise(async (resolve, reject): Promise<void> => {
    console.log('EP: generating node output');
    const webpackConfig = webpackMerge(nodeWebpackConfig, {
      entry: [
        path.join(buildDirectory, './index.tsx'),
      ],
      output: {
        path: outputDirectoryNode,
      },
    });
    webpack(webpackConfig).run((err, stats) => {
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
    return new Promise(async (resolve, reject): Promise<any> => {
      const webpackConfig = webpackMerge(webWebpackConfig, {
        entry: [
          path.join(buildDirectory, './index.tsx')
        ],
        output: {
          path: outputDirectory,
        },
        plugins: [
          new CopyPlugin({
            patterns: [
              { from: path.join(buildDirectory, './public'), noErrorOnMissing: true },
            ]
          }),
        ],
      });
      webpack(webpackConfig).run((err, stats) => {
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
