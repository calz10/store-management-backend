const authenticationActions = require('./actions')
const Router = require('koa-router')
const router = new Router()

router.post('/login', authenticationActions.login)
router.get('/refresh-token', authenticationActions.getFreshToken)


module.exports = router