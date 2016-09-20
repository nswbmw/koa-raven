const raven = require('raven');

module.exports = function sentry(app, client) {
  app.on('error', (err, ctx) => {
    const parsedReq = raven.parsers.parseRequest(ctx.request);
    client.captureException(err, parsedReq);
  });

  // catch global errors
  client.patchGlobal(() => {
    process.exit(1);
  });
};
