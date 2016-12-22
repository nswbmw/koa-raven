'use strict';

const assert = require('assert');
const debug = require('debug')('koa-raven');
const Raven = require('raven');

module.exports = function (DSN, opts) {
  assert('string' === typeof DSN, 'DSN required');
  opts = opts || {};
  opts.environment = opts.environment || process.env.NODE_ENV;

  const raven = new Raven.Client(DSN, opts);
  return function* koaRaven(next) {
    this.raven = raven;
    try {
      yield next;
    } catch (e) {
      debug(e);
      raven.captureException(e, {
        extra: {
          this: this
        }
      });
      throw e;
    }
  };
};
