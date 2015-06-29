'use strict';

var debug = require('debug')('koa-raven');
var raven = require('raven');
var Client = raven.Client;
var parsers = raven.parsers;

module.exports = function sentry(app, client) {
  if (typeof client !== 'object') {
    client = new Client(client || process.env.SENTRY_DSN, {level: process.env.SENTRY || 'error'});
  }

  // catch global errors
  client.patchGlobal(function() {
    process.exit(1);
  });

  var onerror = app.context.onerror;
  var server_name = app.name || process.env.SENTRY_NAME;

  app.context.onerror = function (err) {
    if (!err) {
      return;
    }

    var kwargs = parsers.parseRequest(this.request);
    kwargs.server_name = server_name;
    client.captureError(err, kwargs);
    debug(err, kwargs);

    onerror.call(this, err);
  };
};
