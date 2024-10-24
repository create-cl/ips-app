const users = require('./users/users.service.js');
const test = require('./test/test.service.js');
const ipSvalidator = require('./ip-svalidator/ip-svalidator.service.js');
const proxyIps = require('./proxy-ips/proxy-ips.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(test);
  app.configure(ipSvalidator);
  app.configure(proxyIps);
}
