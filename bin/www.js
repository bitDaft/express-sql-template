#!/usr/bin/env node
'use strict';

// # Application entry point.
import http from 'http';

import config from '#config';
import app from '#app';
import '#json';

const port = config.port;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log('Running -> Listening on port : ' + port);
});
