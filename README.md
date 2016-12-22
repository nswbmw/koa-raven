## koa-raven

raven middleware for koa@1.

### Install

    npm i koa-raven --save

### Usage

**raven(DSN[, opts])**

```
'use strict';

const koa = require('koa');
const raven = require('koa-raven');

const app = koa();

app.use(raven('xxx'));
app.use(function *() {
  throw new Error('test');
});

app.listen(3000);
```

or:

```
'use strict';

const koa = require('koa');
const raven = require('koa-raven');

const app = koa();

app.use(raven('xxx'))
app.use(function* () {
  this.raven.captureException(new Error('test'), { extra: { name: 'tom' } })
})

app.listen(3000);
```

### Options

see: [https://docs.sentry.io/clients/node/config/](https://docs.sentry.io/clients/node/config/).

### License

MIT