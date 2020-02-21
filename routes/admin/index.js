const Router = require('koa-router')
const actions = require('./actions')


const adminRouter = new Router()

adminRouter.get('/admin', actions.getAdmin)

module.exports = adminRouter