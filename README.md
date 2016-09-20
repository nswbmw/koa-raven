## koa-raven2

raven middleware for koa v2.

### Install
Install raven and koa2-raven
```npm i rav koa2-raven --save```

### Usage

```javascript
const Koa = require('koa');
const raven = require('raven');
const koaRaven = require('koa2-raven');

const app = new Koa();
koaRaven(app, new raven.Client('http://sentry_dsn_here/2');

app.use(function () {
  throw new Error('test');
});

app.listen(3000);
```

### License

MIT
