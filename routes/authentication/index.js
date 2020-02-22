const authenticationActions = require('./actions')
const Router = require('koa-router')
const router = new Router()

router.post('/login', authenticationActions.login)
router.post('/verify-token', authenticationActions.verifyToken)


module.exports = router