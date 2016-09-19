const debug = require('debug')('koa-raven');
const raven = require('raven');

const Client = raven.Client;
const parsers = raven.parsers;

module.exports = function sentry(app, client) {
  if (typeof client !== 'object') {
    client = new Client(client || process.env.SENTRY_DSN, { level: process.env.SENTRY || 'error' });
  }

  // catch global errors
  client.patchGlobal(() => {
    process.exit(1);
  });

  app.context.onerror = function error(err, ctx) {
    if (!err) {
      return;
    }

    const kwargs = parsers.parseRequest(ctx.request);
    client.captureError(err, kwargs);
    debug(err, kwargs);

    super(err, ctx);
  };
};
