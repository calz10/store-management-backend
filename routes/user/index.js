const userAction = require('./action')
const Router = require('koa-router')
const router = new Router()

router.post('/users', userAction.registerUser)


module.exports = router