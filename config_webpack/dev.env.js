'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');
require('dotenv').config();
const webpack = require('webpack');

module.exports = merge(prodEnv, {
  COUNTRY_CODE: JSON.stringify(process.env.COUNTRY_CODE),
  FHIR_SERVERS: JSON.stringify(process.env.FHIR_SERVERS),
  BROADCAST_URL: JSON.stringify(process.env.BROADCAST_URL),
  VHL_RECIPIENT_NAME: JSON.stringify(process.env.VHL_RECIPIENT_NAME),
  FHIR_MEDIATORS: JSON.stringify(process.env.FHIR_MEDIATORS),
  NODE_ENV: '"development"'
});
