import * as fs from 'fs';
import * as path from 'path';

export const updateAssetPaths = (obj, buildHash) => {
  if (!buildHash) {
    return obj;
  }
  return Object.keys(obj).reduce((result, key) => {
    let value = obj[key];
    if (typeof value == 'string') {
      value = value.startsWith('/assets/') ? value.replace(/^/, `/${buildHash}`) : value;
    } else if (Array.isArray(value)) {
      value = value.map(entry => updateAssetPaths(entry, buildHash));
    } else if (typeof value == 'object') {
      value = updateAssetPaths(value, buildHash);
    }
    result[key] = value;
    return result
  }, {});
};

export const copyDirectorySync = (sourceDirectory, targetDirectory) => {
  console.log(`Copying directory from ${sourceDirectory} to ${targetDirectory}`);
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
      fs.writeFileSync(targetFilePath, fs.readFileSync(sourceFilePath));
    }
  });
};
