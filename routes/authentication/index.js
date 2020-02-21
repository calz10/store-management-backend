const authenticationActions = require('./actions')
const Router = require('koa-router')
const router = new Router()

router.post('/login', authenticationActions.login)


module.exports = router