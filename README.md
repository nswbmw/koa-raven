#### Note: probably not a necessary package anymore. Can still check it out as an example
# koa2-raven
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]

[npm-image]: https://img.shields.io/npm/v/koa2-raven.svg
[npm-url]: https://npmjs.org/package/koa2-raven
[travis-image]: https://travis-ci.org/scttcper/koa2-raven.svg
[travis-url]: https://travis-ci.org/scttcper/koa2-raven

[raven-node](https://github.com/getsentry/raven-node) middleware for [koa](https://github.com/koajs/koa) v2


### Install
Install raven ^1 and koa2-raven
```npm i raven@next koa2-raven --save```

### Usage

```javascript
const Koa = require('koa');
const raven = require('raven');
const koaRaven = require('koa2-raven');

const client = app.context.raven = Raven
  .config('https://public:private@app.getsentry.com/269')
  .install({ unhandledRejection: true });

const app = new Koa();
koaRaven(app, client);

app.use(() => {
  // This will log in sentry
  throw new Error('Terrible Error');
});

app.listen(3000);
```
