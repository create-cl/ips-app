// Initializes the `proxy-ips` service on path `/api/proxy-ips`
const { ProxyIps } = require('./proxy-ips.class');
const hooks = require('./proxy-ips.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/api/proxy-ips', new ProxyIps(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/proxy-ips');

  service.hooks(hooks);
};
