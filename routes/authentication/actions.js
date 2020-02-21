const passport = require('koa-passport')

const login = async (ctx, next) => {
  return await passport.authenticate('local', (err, user, info, status) => {
    if (!user) {
      ctx.status = 401
      ctx.body = {
        success: false
      }
    } else {
      ctx.body = { success: true, user }
      return ctx.login(user)
    }
  })(ctx, next)
}

module.exports = { login }