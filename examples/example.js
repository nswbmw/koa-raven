const Koa = require('koa');
const raven = require('raven');
const koaRaven = require('../index');

const app = module.exports = new Koa();
// False will be the sentry dsn
app.context.client = new raven.Client('https://<key>:<secret>@sentry.io/<project>');
koaRaven(app, app.context.client);

app.use((ctx, next) => {
  if (ctx.path.indexOf('throw') !== -1) {
    throw new Error('Terrible Error');
  }
  ctx.body = 'ok';
  return next();
});

if (!module.parent) {
  app.listen(3000);
  console.log('listening on port: 3000');
}
