'use strict';

const common = require('../common');
const assert = require('assert');
const http = require('http');

const uncaughtCallback = common.mustCall(function(er) {
  assert.equal(er.message, 'get did fail');
});

process.on('uncaughtException', uncaughtCallback);

const server = http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('bye');
}).listen(common.PORT, function() {
  http.get({ port: common.PORT }, function(res) {
    res.resume();
    throw new Error('get did fail');
  }).on('close', function() {
    server.close();
  });
});
