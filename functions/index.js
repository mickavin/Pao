const functions = require('firebase-functions');
const next = require('next');
const express = require('express');

const app = next({ dev: false, conf: { distDir: './.next' } });
const handle = app.getRequestHandler();

const server = express();
server.all('*', (req, res) => {
  app.prepare().then(() => handle(req, res));
});

exports.nextApp = functions.https.onRequest(server);
