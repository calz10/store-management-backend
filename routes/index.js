// const  _ = require('koa-route')
// const initializeAdminRoute = require('./admin')
const initializeAuthRoutes = require('./authentication')
// const Router = require('koa-router')
const authRouter = require('./authentication')
const adminRouter = require('./admin')

const routes = (app) => {
  app.use(authRouter.routes())
  app.use(adminRouter.routes())
}

module.exports = routes