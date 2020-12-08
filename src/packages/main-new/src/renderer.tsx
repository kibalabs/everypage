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
import HtmlWebpackPlugin from 'html-webpack-plugin';
import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin';
// import CreateRuntimeConfigPlugin from '../plugins/createRuntimeConfigPlugin';
import webpackMerge from 'webpack-merge';
import webpackBundleAnalyzer from 'webpack-bundle-analyzer';

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

const internalPath = path.join(process.cwd(), './src/internal');
const outputPath = path.join(process.cwd(), './output');

const webpackConfig = webpackMerge(
  commonConfig({analyze: true}),
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
    path.join(internalPath, './src/index.tsx')
  ],
  target: 'web',
  output: {
    chunkFilename: '[name].[hash:8].bundle.js',
    filename: '[name].[hash:8].js',
    path: outputPath,
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
    // new HtmlWebpackPlugin({
    //   inject: true,
    //   template: path.join(__dirname, './index.html'),
    // }),
    // new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
    //   PUBLIC_URL: '',
    // }),
    new CopyPlugin({
      patterns: [
        { from: path.join(internalPath, './public'), noErrorOnMissing: true },
      ]
    }),
  ],
});

export const render = async (): void => {
  await new Promise(async (resolve, reject): Promise<any> => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        console.log(chalk.red(err.stack || err))
        if (err.details) {
          console.log(chalk.red(err.details))
        }
        return reject(err);
      }

      stats.toJson('verbose')

      const buildErrors = stats.hasErrors()
      const buildWarnings = stats.hasWarnings()

      if (buildErrors || buildWarnings) {
        console.log(stats.toString({
          // context: state.config.context,
          performance: false,
          hash: false,
          timings: true,
          entrypoints: false,
          chunkOrigins: false,
          chunkModules: false,
          colors: chalk.supportsColor,
        }));
        if (buildErrors) {
          console.log(chalk.red.bold(`=> There were ERRORS during the build stage! :(`));
        } else if (buildWarnings) {
          console.log(chalk.yellow(`=> There were WARNINGS during the build stage. Your site will still function, but you may achieve better performance by addressing the warnings above.`));
        }
      }
      return resolve(stats);
    });
  }).then(async (stats): Promise<void> => {
    console.log('EP: here');
    const chunkNames: string[] = []
    const headElements = [];
    const styledComponentsSheet = new ServerStyleSheet();
    const bodyString = ReactDOMServer.renderToString(
      // <ReportChunks report={(chunkName: string) => chunkNames.push(chunkName)}>
      <StyleSheetManager sheet={styledComponentsSheet.instance}>
        <HeadRootProvider root={<ChildCapture headElements={headElements}/>}>
          <App />
        </HeadRootProvider>
      </StyleSheetManager>
      // </ReportChunks>
    );
    const headString = ReactDOMServer.renderToString(
      <head>
        {headElements}
        {styledComponentsSheet.getStyleElement()}
      </head>
    );
    const headStringCleaned = headString.replace(/\/\*!sc\*\//g, '');
    console.log('EP: chunkNames', chunkNames);
    const { scripts, stylesheets, css } = flushChunks(stats, {
      chunkNames,
      outputPath: '.',
    })
    console.log('EP: scripts', scripts);
    console.log('EP: stylesheets', stylesheets);
    console.log('EP: css', css);
    const output = `<!DOCTYPE html><html><head>${headStringCleaned}</head><body>${bodyString}</body></html>`;
    fs.writeFile(path.join(outputPath, 'index.html'), output, function (err) {
      if (err) {
        throw err
      };
      console.log('EP: Saved index.html');
    });
  });
};
