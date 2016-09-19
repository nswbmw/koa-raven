const debug = require('debug')('koa-raven');
const raven = require('raven');

const Client = raven.Client;

module.exports = function sentry(app, client) {
  if (typeof client !== 'object') {
    client = new Client(client || process.env.SENTRY_DSN, { level: process.env.SENTRY || 'error' });
  }

  // catch global errors
  client.patchGlobal(() => {
    process.exit(1);
  });

  const onerror = app.context.onerror;

  app.context.onerror = function error(err) {
    if (!err) {
      return;
    }
    const kwargs = raven.parsers.parseRequest(this.request);
    client.captureError(err, kwargs);
    debug(err, kwargs);

    onerror(this, err);
  };
};
