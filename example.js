'use strict';

var koa = require('koa');
var raven = require('./');

var app = koa();
app.name = 'example';

raven(app, 'http://18080b071d3d45ab972766405b2ef708:8d1091fbc44042f8a98f6e937ff46dba@localhost:9000/2');

app.use(function *() {
  throw new Error('test');
});

app.listen(3000);
