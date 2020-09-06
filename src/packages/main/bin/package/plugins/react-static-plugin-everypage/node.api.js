const fs = require('fs');
const path = require('path');
// const webpackBundleAnalyzer = require('webpack-bundle-analyzer');

import React from 'react';
import { HeadRootProvider, ChildCapture } from '@kibalabs/everypage-core';

class CreateRobotsWebpackPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap('CreateRobots', async () => {
      fs.writeFileSync(path.join(compiler.options.output.path, 'robots.txt'), 'User-agent: *\nDisallow:\n');
    });
  }
}

export default () => ({
  webpack: (config, state) => {
    // https://github.com/react-static/react-static/pull/1329
    config.output.publicPath = process.env.REACT_STATIC_ASSETS_PATH || '/';

    config.plugins = (config.plugins || []).concat([
      new CreateRobotsWebpackPlugin(),
    //   new webpackBundleAnalyzer.BundleAnalyzerPlugin({
    //     analyzerMode: 'json',
    //     reportFilename: './bundle-size.json',
    //   }),
    //   new webpackBundleAnalyzer.BundleAnalyzerPlugin({
    //     analyzerMode: 'static',
    //     reportFilename: './bundle-size.html',
    //   }),
    ]);

    config.entry = [
      'core-js/stable',
      'regenerator-runtime/runtime',
      ...(Array.isArray(config.entry) ? config.entry : [config.entry]),
    ];

    // TODO(krish): clean this up when possible (from https://github.com/react-static/react-static/blob/master/packages/react-static/src/static/webpack/rules/jsLoader.js)
    // Copied from https://github.com/react-static/react-static/blob/master/packages/react-static/babel-preset.js
    config.resolve.extensions = (config.resolve.extensions || []).concat(['.ts', '.tsx']);
    config.module.rules = [{
      oneOf: [{
        include: state.defaultLoaders.jsLoader.include,
        test: /\.(j|t)sx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            root: state.defaultLoaders.jsLoader.use[0].options.root,
            cacheDirectory: state.defaultLoaders.jsLoader.use[0].options.cacheDirectory,
            presets: [
              ["@babel/preset-env", {
                useBuiltIns: "usage",
                corejs: {
                  version: 3.6,
                  proposals: true,
                },
                targets: "defaults, >0.2%, not dead, ie 11",
              }],
              ["@babel/preset-react", {
                development: process.env.NODE_ENV !== 'production',
              }],
              "@babel/preset-typescript",
            ],
            plugins: [
              [ "babel-plugin-styled-components", {
                "ssr": true,
                "displayName": false,
                "pure": true
              }],
              "babel-plugin-universal-import",
              "babel-plugin-transform-react-remove-prop-types",
              "@babel/plugin-transform-runtime",
              "babel-plugin-macros",
              "@babel/plugin-transform-destructuring",
              "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-proposal-optional-chaining",
              "@babel/plugin-proposal-export-default-from",
              "react-hot-loader/babel",
            ],
          },
        },
      },
      // NOTE(krish): prevent running over core-js (from https://github.com/zloirock/core-js/issues/514)
      {
        ...state.defaultLoaders.jsLoaderExt,
        exclude: state.defaultLoaders.jsLoaderExt.exclude.concat([/core-js/]),
      },
      state.defaultLoaders.cssLoader,
      state.defaultLoaders.fileLoader,
      ],
    }];

    return config;
  },
  beforeRenderToHtml: (element, { meta }) => {
    meta.headElements = [];
    return (
      <HeadRootProvider root={<ChildCapture headElements={meta.headElements}/>}>
        {element}
      </HeadRootProvider>
    );
  },
  headElements: (elements, { meta }) => {
    elements = [...elements, meta.headElements];
    return elements
  },
  beforeDocumentToFile: async (html) => {
    return html.replace(/\/\*!sc\*\//g, '');
  },
  // NOTE(krish): need to extend the extensions so file system plugin knows where to look
  afterGetConfig: (state) => {
    return {
      ...state,
      config: {
        ...state.config,
        extensions: state.config.extensions.concat(['.ts', '.tsx']),
      },
    }
  },
});
