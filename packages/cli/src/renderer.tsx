/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

import React from 'react';

// @ts-ignore
import makeCommonWebpackConfig from '@kibalabs/build/scripts/common/common.webpack';
// @ts-ignore
import makeCssWebpackConfig from '@kibalabs/build/scripts/common/css.webpack';
// @ts-ignore
import makeImagesWebpackConfig from '@kibalabs/build/scripts/common/images.webpack';
// @ts-ignore
import makeJsWebpackConfig from '@kibalabs/build/scripts/common/js.webpack';
// @ts-ignore
import { createAndRunCompiler } from '@kibalabs/build/scripts/common/webpackUtil';
// @ts-ignore
import makeModuleWebpackConfig from '@kibalabs/build/scripts/module/module.webpack';
import makeReactAppWebpackConfig from '@kibalabs/build/scripts/react-app/app.webpack';
// @ts-ignore
import { IWebsite } from '@kibalabs/everypage';
import { IHead, IHeadTag } from '@kibalabs/ui-react';
import { Chunk, ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import webpackMerge from 'webpack-merge';

import default404Content from './404.json';
import { copyDirectorySync, copyFileSync, findAncestorSibling, IPage, loadContentFromFileSync, loadPathsFromDirectory } from './util';

export const render = async (siteDirectoryPath?: string, assetsDirectoryPath?: string, buildHash?: string, siteHost?: string, shouldHideAttribution?: boolean, buildDirectoryPath?: string, outputDirectoryPath?: string): Promise<void> => {
  const siteDirectory = siteDirectoryPath || process.cwd();
  const buildDirectory = buildDirectoryPath || path.join(process.cwd(), 'tmp');
  const assetsDirectory = assetsDirectoryPath;
  const outputDirectory = outputDirectoryPath || path.join(process.cwd(), 'dist');
  const outputDirectoryNode = path.join(buildDirectory, './output-node');
  fs.mkdirSync(buildDirectory, { recursive: true });
  fs.mkdirSync(outputDirectory, { recursive: true });
  fs.mkdirSync(outputDirectoryNode, { recursive: true });

  const initialContent = { buildHash, siteHost } as IWebsite;
  if (shouldHideAttribution !== null && shouldHideAttribution !== undefined) {
    initialContent.shouldHideAttribution = shouldHideAttribution;
  }

  const pages = loadPathsFromDirectory(siteDirectory, '', buildHash, initialContent, undefined);
  console.log(`EP: loaded ${pages.length} pages`);
  const content404 = fs.existsSync(path.join(siteDirectory, '404.json')) ? loadContentFromFileSync(path.join(siteDirectory, '404.json')) : default404Content;
  const page404: IPage = { path: '404', filename: '/404.html', content: content404 as unknown as IWebsite, theme: pages[0].theme };

  const siteData = {
    routes: pages,
    notFoundPageContent: page404.content,
    notFoundPageTheme: page404.theme,
  };
  fs.writeFileSync(path.join(buildDirectory, 'siteData.json'), JSON.stringify(siteData));

  await copyFileSync(path.join(__dirname, './app.js'), path.join(buildDirectory, 'index.js'));
  if (assetsDirectory) {
    await copyDirectorySync(assetsDirectory, path.join(buildDirectory, './public/assets'));
  }
  const packageFilePath = path.join(process.cwd(), './package.json');

  // NOTE(krishan711): this is weird but needed to work both locally (with lerna) and on the builder-api
  const nodeModulesPaths = findAncestorSibling('node_modules');
  const nodeWebpackConfig = webpackMerge(
    makeCommonWebpackConfig({ name: 'site-node', packageFilePath, shouldAliasModules: false }),
    makeJsWebpackConfig({ packageFilePath, polyfill: false, react: true }),
    makeImagesWebpackConfig(),
    makeCssWebpackConfig(),
    makeModuleWebpackConfig({ packageFilePath, entryFilePath: path.join(buildDirectory, './index.js'), outputDirectory: outputDirectoryNode, addHtmlOutput: false, addRuntimeConfig: false, excludeAllNodeModules: true, nodeModulesPaths }),
  );
  const webWebpackConfig = webpackMerge(
    makeCommonWebpackConfig({ name: 'site', packageFilePath, shouldAliasModules: false }),
    makeJsWebpackConfig({ packageFilePath, polyfill: true, react: true }),
    makeImagesWebpackConfig(),
    makeCssWebpackConfig(),
    makeReactAppWebpackConfig({ packageFilePath, entryFilePath: path.join(buildDirectory, './index.js'), outputDirectory, addHtmlOutput: false, addRuntimeConfig: false, publicDirectory: path.join(buildDirectory, './public') }),
  );
  console.log('EP: generating node output');
  return createAndRunCompiler(nodeWebpackConfig).then(async (): Promise<Record<string, unknown>> => {
    console.log('EP: generating web output');
    return createAndRunCompiler(webWebpackConfig);
  }).then(async (webpackBuildStats: Record<string, unknown>): Promise<void> => {
    console.log('EP: generating static html');
    // NOTE(krishan711): this ensures the require is not executed at build time (only during runtime)
    // @ts-ignore
    // eslint-disable-next-line no-undef
    const App = __non_webpack_require__(path.resolve(outputDirectoryNode, 'index.js')).App;
    pages.concat(page404).forEach((page: IPage): void => {
      console.log(`EP: rendering page ${page.path} to ${page.filename}`);
      let pageHead: IHead = { headId: '', base: null, title: null, links: [], metas: [], styles: [], scripts: [], noscripts: [] };
      const setHead = (newHead: IHead): void => { pageHead = newHead; };
      const styledComponentsSheet = new ServerStyleSheet();
      const extractor = new ChunkExtractor({ stats: webpackBuildStats });
      const bodyString = ReactDOMServer.renderToString(
        <ChunkExtractorManager extractor={extractor}>
          <StyleSheetManager sheet={styledComponentsSheet.instance}>
            <App staticPath={page.path} setHead={setHead} />
          </StyleSheetManager>
        </ChunkExtractorManager>,
      );
      const assetPrefix = buildHash ? `/${buildHash}` : '';
      const tags: IHeadTag[] = [
        ...(pageHead.title ? [pageHead.title] : []),
        ...(pageHead.base ? [pageHead.base] : []),
        ...pageHead.links,
        ...pageHead.metas,
        ...pageHead.styles,
        ...pageHead.scripts,
      ];
      const headString = ReactDOMServer.renderToStaticMarkup(
        <head>
          {tags.map((tag: IHeadTag, index: number): React.ReactElement => (
            React.createElement(tag.type, { ...tag.attributes, 'ui-react-head': tag.headId, key: index }, tag.content)
          ))}
          {/* @ts-ignore */}
          {extractor.getPreAssets().map((preAsset: Chunk): React.ReactElement => (
            <link key={preAsset.filename} data-chunk={preAsset.chunk} rel={preAsset.linkType} as={preAsset.scriptType} href={`/${preAsset.filename}`} />
          ))}
          {styledComponentsSheet.getStyleElement()}
        </head>,
      );
      // TODO(krishan711): use stylesheets and css
      const bodyScriptsString = ReactDOMServer.renderToStaticMarkup(
        <React.Fragment>
          {extractor.getMainAssets().map((mainAsset: Chunk): React.ReactElement => (
            // eslint-disable-next-line react/self-closing-comp
            <script key={mainAsset.filename} data-chunk={mainAsset.chunk} async={true} src={`${assetPrefix}/${mainAsset.filename}`}></script>
          ))}
        </React.Fragment>,
      );
      const output = `<!DOCTYPE html>
        <html lang="en">
          ${headString}
          <body>
            <div id="root">${bodyString}</div>
            ${bodyScriptsString}
          </body>
        </html>
      `;
      const outputPath = path.join(outputDirectory, page.filename);
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, output);
    });
  });
};
