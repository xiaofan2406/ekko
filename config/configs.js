const path = require('path');
const ip = require('ip');

const appRoot = path.join(__dirname, '..');
const appSrc = path.join(appRoot, 'docs');
const appDist = path.join(appRoot, 'docs', 'dist');
const libSrc = path.join(appRoot, 'src');

const devServerPort = process.env.PORT || 8000;
const servePort = process.env.PORT || 9000;

module.exports = {
  devServerPort,
  ipAddress: process.env.HOST || ip.address(),
  servePort,
  paths: {
    appRoot,
    appSrc,
    appDist,
    libSrc,
  },
};
