const authRouter = require('./authentication')
const adminRouter = require('./admin')
const userRouter = require('./user')

const routes = (app) => {
  app.use(authRouter.routes())
  app.use(adminRouter.routes())
  app.use(userRouter.routes())
}


module.exports = routes