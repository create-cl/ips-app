// Initializes the `IPSvalidator` service on path `/api/ips-validator`
const { IpSvalidator } = require('./ip-svalidator.class');
const hooks = require('./ip-svalidator.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/api/ips-validator', new IpSvalidator(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/ips-validator');

  service.hooks(hooks);
};
