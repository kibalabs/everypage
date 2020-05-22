import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import * as express from 'express';
import * as archiver from 'archiver';
import * as everypage from '@kibalabs/everypage';
import * as morgan from 'morgan';

const app = express();
const port = 5000;
app.use(express.json());
app.use(morgan('tiny', { immediate: true }));
app.use(morgan('tiny'));

app.get('/', async (_, response) => {
  response.send('Welcome to Site Builder')
});

app.post('/v1/generate-site', async (request, response) => {
  const siteName = request.body.siteName;
  if (!siteName) {
    return response.status(400).json({message: 'siteName must be provided in request'});
  }
  const buildHash = request.body.buildHash;
  if (!buildHash) {
    return response.status(400).json({message: 'buildHash must be provided in request'});
  }
  const siteContent = request.body.siteContent;
  if (!siteContent) {
    return response.status(400).json({message: 'siteContent must be provided in request'});
  }
  const siteTheme = request.body.siteTheme;
  if (!siteTheme) {
    return response.status(400).json({message: 'siteTheme must be provided in request'});
  }
  console.log(`Creating site: ${siteName} ${buildHash}`)
  console.log(`Site content keys: ${Object.keys(siteContent)}`)
  console.log(`Site theme keys: ${Object.keys(siteTheme)}`)
  const buildDirectory = path.join(__dirname, siteName, `${buildHash}-build`);
  const outputDirectory = path.join(__dirname, siteName, buildHash);
  fs.mkdirSync(buildDirectory, { recursive: true });
  fs.mkdirSync(outputDirectory, { recursive: true });

  try {
    everypage.writeSiteFiles(buildDirectory, siteContent, siteTheme, buildHash);
    everypage.copyPackage(buildDirectory);
    everypage.build(buildDirectory, outputDirectory);
    rimraf.sync(buildDirectory);
  } catch (error) {
    console.log('Error building everypage', error);
    rimraf.sync(outputDirectory);
    return response.status(500).json({message: error.message});
  }

  const archive = archiver('zip');
  archive.directory(`${outputDirectory}/`, false);
  archive.on('error', function(error) {
    return response.status(500).json({message: error.message});
  });
  archive.on('end', function() {
    rimraf.sync(outputDirectory);
  });
  response.attachment(`${buildHash}.zip`);
  archive.pipe(response);
  archive.finalize();
  response.status(200)
});

app.listen(port, async () => {
  return console.log(`Server started on port ${port}`);
});
