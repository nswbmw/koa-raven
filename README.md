## NOTICE

Sentry now provides official Koa integration: <https://sentry.io/for/koa/>.

## koa-raven

raven middleware for koa.

### Install

```sh
$ npm i koa-raven --save
```

### Usage

**raven(DSN[, opts])**

```js
const raven = require('koa-raven')
const Koa = require('koa')
const app = new Koa()

app.use(raven('DSN', opts))

app.use((ctx) => {
  throw new Error('test')
})

app.listen(3000)
```

or:

```js
const raven = require('koa-raven')
const Koa = require('koa')
const app = new Koa()

app.use(raven('DSN', opts))

app.use((ctx) => {
  try {
    throw new Error('test')
  } catch (e) {
    ctx.raven.captureException(e, { extra: { name: 'tom' } })
    ctx.status = 500
    ctx.body = e.stack
  }
})

app.listen(3000)
```

### Options

see: [https://docs.sentry.io/clients/node/config/](https://docs.sentry.io/clients/node/config/).

### License

MIT
