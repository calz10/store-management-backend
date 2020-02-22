const passport = require('koa-passport')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const { tokenizer } = require('../../utils')

const login = async (ctx, next) => {
  return passport.authenticate('local', (err, user, info, status) => {
    if (!user) {
      ctx.status = 401
      ctx.body = {
        success: false
      }
    } else {
      const { password, ...docs } = user
      
      const token = tokenizer.generateToken(docs)
      ctx.body = { success: true, user, token }
      return ctx.login(user)
    }
  })(ctx, next)
}

const verifyToken = async (ctx) => {
  const ctxH = ctx.request.body
  try {
    const token = tokenizer.verifyToken(ctxH.token)
    ctx.body = { token, valid: true  }
    
  } catch (error) {
    ctx.throw(error)
  }

}

module.exports = { login, verifyToken }