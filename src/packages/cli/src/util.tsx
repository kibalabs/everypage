import fs from 'fs';
import path from 'path';

import { merge } from '@kibalabs/core';
import { IWebsite, updateAssetPaths } from '@kibalabs/everypage';
import { ITheme } from '@kibalabs/ui-react';

export interface IPage {
  path: string;
  filename: string;
  content: IWebsite;
  theme: ITheme;
}

export const copyFileSync = (sourceFilePath: string, targetPath: string): void => {
  console.log(`EP: copying file: ${sourceFilePath} ${targetPath}`);
  let targetFilePath = targetPath;
  if (fs.existsSync(targetPath) && fs.lstatSync(targetPath).isDirectory()) {
    targetFilePath = path.join(targetPath, path.basename(sourceFilePath));
  }
  const targetDirectory = path.dirname(targetFilePath);
  if (!fs.existsSync(targetDirectory)) {
    fs.mkdirSync(targetDirectory, { recursive: true });
  }
  fs.writeFileSync(targetFilePath, fs.readFileSync(sourceFilePath));
};

export const copyDirectorySync = (sourceDirectory: string, targetDirectory: string): void => {
  console.log(`EP: copying directory: ${sourceDirectory} ${targetDirectory}`);
  if (!fs.lstatSync(sourceDirectory).isDirectory()) {
    throw new Error(`copyDirectorySync must be called with a directory. source ${sourceDirectory} is not a directory`);
  }
  if (!fs.existsSync(targetDirectory)) {
    fs.mkdirSync(targetDirectory, { recursive: true });
  } else if (!fs.lstatSync(sourceDirectory).isDirectory()) {
    throw new Error(`copyDirectorySync must be called with a directory. target ${targetDirectory} is not a directory`);
  }
  fs.readdirSync(sourceDirectory).forEach((filename: string): void => {
    const sourceFilePath = path.join(sourceDirectory, filename);
    const targetFilePath = path.join(targetDirectory, filename);
    if (fs.lstatSync(sourceFilePath).isDirectory()) {
      copyDirectorySync(sourceFilePath, targetFilePath);
    } else {
      copyFileSync(sourceFilePath, targetFilePath);
    }
  });
};

export const readJsonFileSync = (filePath: string): object => {
  return JSON.parse(String(fs.readFileSync(filePath)));
};

export const loadContentFromFileSync = (filePath: string, buildHash?: string, parentContent?: IWebsite): IWebsite => {
  let content = readJsonFileSync(filePath) as IWebsite;
  if (parentContent) {
    const { sections, ...parentContentStripped } = parentContent;
    content = merge(parentContentStripped, content);
  }
  if (buildHash) {
    content = updateAssetPaths(content, `/${buildHash}`) as IWebsite;
  }
  return content;
};

export const loadThemeFromFileSync = (filePath: string, parentTheme?: ITheme): ITheme => {
  let content = readJsonFileSync(filePath) as ITheme;
  if (parentTheme) {
    content = merge(parentTheme, content);
  }
  return content;
};

export const loadPathsFromDirectory = (directory: string, urlPath = '', buildHash?: string, parentContent?: IWebsite, parentTheme?: ITheme): IPage[] => {
  const content = loadContentFromFileSync(path.join(directory, 'content.json'), buildHash, parentContent);
  const theme = loadThemeFromFileSync(path.join(directory, 'theme.json'), parentTheme);
  const output: IPage[] = [{ path: `${urlPath}/`, filename: `${urlPath}/index.html`, theme, content }];
  fs.readdirSync(directory).forEach((name: string): void => {
    const itemPath = path.join(directory, name);
    if (fs.statSync(itemPath).isDirectory()) {
      output.push(...loadPathsFromDirectory(itemPath, `${urlPath}/${name}`, buildHash, content, theme));
    }
  });
  return output;
};

export const findAncestorSibling = (name: string, startingDirectory?: string): string[] => {
  let directory = path.resolve(startingDirectory || '');
  const rootDirectory = path.parse(directory).root;

  const output: string[] = [];
  while (true) {
    const potentialDirectory = path.join(directory, name);
    if (fs.existsSync(potentialDirectory)) {
      output.push(potentialDirectory);
    }
    if (directory === rootDirectory) {
      break;
    }
    directory = path.dirname(directory);
  }
  return output;
};
