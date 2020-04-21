#!/usr/bin/env node
'use strict';

const commander = require('commander');
const http = require('http');
const url = require('url');
const next = require('next');

const params = commander
  .requiredOption('-s, --site <path>')
  .option('-p, --port <number>')
  .parse(process.argv);

process.env['NEXT_APP_SITE_FILE'] = params.site;
const port = params.port || 3000;

const app = next({ dev: true });
const handleRequest = app.getRequestHandler();
app.prepare().then(() => {
  http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    handleRequest(req, res, parsedUrl);
  }).listen(port, err => {
    if (err) {
      throw err;
    }
    console.log(`> Ready on http://localhost:${port}`);
  });
});
