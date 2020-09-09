const assert = require('assert')
const debug = require('debug')('koa-raven')
const Raven = require('raven')

module.exports = function (DSN, opts) {
  assert(typeof DSN === 'string', 'DSN required')
  opts = opts || {}
  opts.environment = opts.environment || process.env.NODE_ENV

  const raven = Raven.config(DSN, opts).install()
  return async function koaRaven (ctx, next) {
    ctx.raven = raven
    try {
      await next()
    } catch (e) {
      debug(e)
      raven.captureException(e, {
        request: ctx.request
      })
      throw e
    }
  }
}
