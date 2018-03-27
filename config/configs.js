const path = require('path');
const ifconfig = require('os').networkInterfaces();

function getLocalIp() {
  const detail = Object.keys(ifconfig)
    .filter(ifaceName => ifaceName.indexOf('lo') === -1)
    .map(
      ifaceName =>
        ifconfig[ifaceName].filter(
          protocol => protocol.family === 'IPv4' && protocol.internal === false
        )[0]
    )[0];

  return detail ? detail.address : 'localhost';
}

const appRoot = path.join(__dirname, '..');
const appSrc = path.join(appRoot, 'docs', 'src');
const appDist = path.join(appRoot, 'docs', 'dist');
const libSrc = path.join(appRoot, 'src');

const devServerPort = process.env.PORT || 8000;
const testProdPort = process.env.PORT || 9000;

module.exports = {
  devServerPort,
  localIp: process.env.HOST || getLocalIp(),
  testProdPort,
  paths: {
    appRoot,
    appSrc,
    appDist,
    libSrc,
  },
};
