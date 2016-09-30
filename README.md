## koa2-raven
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]

[npm-image]: https://img.shields.io/npm/v/koa2-raven.svg
[npm-url]: https://npmjs.org/package/koa2-raven
[travis-image]: https://img.shields.io/travis/scttcper/koa2-raven.svg
[travis-url]: https://travis-ci.org/scttcper/koa2-raven

raven middleware for koa v2 forked from koa-raven.

### Install
Install raven and koa2-raven
```npm i raven koa2-raven --save```

### Usage

```javascript
const Koa = require('koa');
const raven = require('raven');
const koaRaven = require('koa2-raven');

const app = new Koa();
koaRaven(app, new raven.Client('http://sentry_dsn_here/2'));

app.use(() => {
  throw new Error('Terrible Error');
});

app.listen(3000);
```
