/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

import everypageCli from '@kibalabs/everypage-cli';
import archiver from 'archiver';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import rimraf from 'rimraf';

const app = express();
const port = 5000;
app.use(express.json());
app.use(morgan('tiny', { immediate: true }));
app.use(morgan('tiny'));

app.get('/', async (_, response) => {
  response.send('Welcome to Site Builder');
});

app.post('/v1/sites/generate', async (request: Request, response: Response): Promise<Response> => {
  const authSecret = request.body.authSecret;
  if (!authSecret || authSecret !== process.env.AUTH_SECRET) {
    return response.status(401).json({ message: 'Unauthorised' });
  }
  const siteName = request.body.siteName;
  if (!siteName) {
    return response.status(400).json({ message: 'siteName must be provided in request' });
  }
  const buildHash = request.body.buildHash;
  if (!buildHash) {
    return response.status(400).json({ message: 'buildHash must be provided in request' });
  }
  const siteHost = request.body.siteHost;
  if (!siteHost) {
    return response.status(400).json({ message: 'siteHost must be provided in request' });
  }
  const siteContent = request.body.siteContent;
  if (!siteContent) {
    return response.status(400).json({ message: 'siteContent must be provided in request' });
  }
  const siteTheme = request.body.siteTheme;
  if (!siteTheme) {
    return response.status(400).json({ message: 'siteTheme must be provided in request' });
  }
  const shouldHideAttribution = request.body.shouldHideAttribution;
  console.log(`Creating site: ${siteName} ${buildHash} ${siteHost}`);
  const buildDirectory = path.join(__dirname, siteName, `${buildHash}-build`);
  const outputDirectory = path.join(__dirname, siteName, buildHash);

  const siteDirectory = path.join(__dirname, siteName, `${buildHash}-site`);
  fs.mkdirSync(siteDirectory, { recursive: true });
  fs.writeFileSync(path.join(siteDirectory, 'content.json'), JSON.stringify(siteContent));
  fs.writeFileSync(path.join(siteDirectory, 'theme.json'), JSON.stringify(siteTheme));
  try {
    await everypageCli.renderSite(siteDirectory, undefined, buildHash, siteHost, shouldHideAttribution, buildDirectory, outputDirectory);
    rimraf.sync(buildDirectory);
  } catch (error) {
    console.error('Error building everypageCli', error);
    rimraf.sync(outputDirectory);
    return response.status(500).json({ message: error.message });
  }

  const archive = archiver('zip');
  archive.directory(`${outputDirectory}/`, false);
  archive.on('error', (error) => {
    return response.status(500).json({ message: error.message });
  });
  archive.on('end', () => {
    rimraf.sync(outputDirectory);
  });
  response.attachment(`${buildHash}.zip`);
  archive.pipe(response);
  archive.finalize();
  return response.status(200);
});

app.listen(port, async (): Promise<void> => {
  return console.log(`Server started on port ${port}`);
});
