module.exports = function sentry(app, client) {
  app.on('error', (err, ctx) => {
    const parsedReq = client.parsers.parseRequest(ctx.request);
    client.captureException(err, parsedReq);
  });
};
