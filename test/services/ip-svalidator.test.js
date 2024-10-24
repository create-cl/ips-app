const assert = require('assert');
const app = require('../../backend/app');

describe('\'IPSvalidator\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/ips-validator');

    assert.ok(service, 'Registered the service');
  });
});
