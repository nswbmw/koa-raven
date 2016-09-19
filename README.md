## koa-raven2

raven middleware for koa v2.

### Install
```npm i koa2-raven --save```

### Usage

```javascript
const Koa = require('koa');
const koaRaven = require('koa2-raven');

const app = new Koa();
koaRaven(app, 'http://18080b071d3d45ab972766405b2ef708:8d1091fbc44042f8a98f6e937ff46dba@localhost:9000/2');

app.use(function () {
  throw new Error('test');
});

app.listen(3000);
```

### License

MIT
