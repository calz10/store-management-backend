const authRouter = require('./authentication')
const adminRouter = require('./admin')

const routes = (app) => {
  app.use(authRouter.routes())
  app.use(adminRouter.routes())
}


module.exports = routes