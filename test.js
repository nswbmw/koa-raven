const raven = require('./index')
const Koa = require('koa')
const app = new Koa()

app.use(raven('xxx'))
app.use(ctx => {
  foo()
})

app.listen(3000)
