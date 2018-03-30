const server = require('serve');
const configs = require('./configs');

server(configs.paths.appDist, {
  port: configs.servePort,
  single: true,
});

console.log('Production server listening...');
console.log(`http://localhost:${configs.servePort}`);
console.log(`http://${configs.ipAddress}:${configs.servePort}`);
