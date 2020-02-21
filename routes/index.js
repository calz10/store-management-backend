const _ = require('koa-route')
const initializeAdminRoute = require('./admin')

const routes = (app) => {
  app.use(_.get('/', (ctx) => {
    ctx.body = { hello: "what can I do for you" }
  }))
  initializeAdminRoute(app)
}

module.exports = routes