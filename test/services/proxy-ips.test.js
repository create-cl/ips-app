const assert = require('assert');
const app = require('../../backend/app');

describe('\'proxy-ips\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/proxy-ips');

    assert.ok(service, 'Registered the service');
  });
});
