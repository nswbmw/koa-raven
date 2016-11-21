const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const Raven = require('raven');

const koaRaven = require('../index');

const app = module.exports = new Koa();

app.use(bodyParser());

const client = app.context.raven = Raven
  .config('https://public:private@app.getsentry.com/269')
  .install({ unhandledRejection: true });

koaRaven(app, client);

router.get('/', (ctx, next) => {
  ctx.body = 'ok';
  return next();
});

router.get('/throw', () => {
  throw new Error('Terrible Error');
});

router.post('/throwPost', () => {
  throw new Error('Terrible Error');
});

router.get('/throwUser', (ctx) => {
  ctx.body = 'ok';
  Raven.setContext({
    user: {
      email: 'matt@example.com',
      id: '123',
    },
  });
  throw new Error('Terrible Error');
});

app.use(router.routes());
app.use(router.allowedMethods());

if (!module.parent) {
  app.listen(3000);
}
