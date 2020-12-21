import fs from 'fs';
import path from 'path';
import { ITheme } from '@kibalabs/ui-react';
import { updateAssetPaths, IWebsite } from '@kibalabs/everypage-core';

export const copyFileSync = (sourceFilePath: string, targetPath: string): void => {
  console.log(`EP: copying file: ${sourceFilePath} ${targetPath}`);
  var targetFilePath = targetPath;
  if (fs.existsSync(targetPath) && fs.lstatSync(targetPath).isDirectory()) {
    targetFilePath = path.join(targetPath, path.basename(sourceFilePath));
  }
  const targetDirectory = path.dirname(targetFilePath);
  if (!fs.existsSync(targetDirectory) ) {
    fs.mkdirSync(targetDirectory, { recursive: true });
  }
  fs.writeFileSync(targetFilePath, fs.readFileSync(sourceFilePath));
}

export const copyDirectorySync = (sourceDirectory: string, targetDirectory: string): void => {
  console.log(`EP: copying directory: ${sourceDirectory} ${targetDirectory}`);
  if (!fs.lstatSync(sourceDirectory).isDirectory()) {
    throw new Error(`copyDirectorySync must be called with a directory. source ${sourceDirectory} is not a directory`);
  }
  if (!fs.existsSync(targetDirectory) ) {
    fs.mkdirSync(targetDirectory, { recursive: true });
  } else if (!fs.lstatSync(sourceDirectory).isDirectory()) {
    throw new Error(`copyDirectorySync must be called with a directory. target ${targetDirectory} is not a directory`);
  }
  fs.readdirSync(sourceDirectory).forEach((file) => {
    const sourceFilePath = path.join(sourceDirectory, file);
    const targetFilePath = path.join(targetDirectory, file);
    if (fs.lstatSync(sourceFilePath).isDirectory()) {
      copyDirectorySync(sourceFilePath, targetFilePath);
    } else {
      copyFileSync(sourceFilePath, targetFilePath);
    }
  });
};

export const writeSiteFiles = async (buildDirectory: string, siteContent: IWebsite, siteTheme: ITheme, buildHash: string, siteHost: string, shouldHideAttribution: boolean = undefined): Promise<void> => {
  siteContent.buildHash = buildHash;
  siteContent.siteHost = siteHost;
  if (shouldHideAttribution !== null && shouldHideAttribution !== undefined) {
    siteContent.shouldHideAttribution = shouldHideAttribution;
  }
  siteContent = updateAssetPaths(siteContent, `/${buildHash}`);
  fs.writeFileSync(path.join(buildDirectory, 'site.json'), JSON.stringify(siteContent));
  fs.writeFileSync(path.join(buildDirectory, 'theme.json'), JSON.stringify(siteTheme));
}

export const readJsonFileSync = (filePath: string): object => {
  return JSON.parse(String(fs.readFileSync(filePath)));
};
