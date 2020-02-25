const passport = require('koa-passport')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const { tokenizer } = require('../../utils')
const { v4 } = require('uuid')
const { RefreshToken, User  } = require('../../models')

const login = async (ctx, next) => {
  return passport.authenticate('local', async (err, user, info, status) => {
    if (!user) {
      ctx.status = 401
      ctx.body = {
        success: false
      }
    } else {
      const { password, ...docs } = user
      const token = tokenizer.generateToken(docs)
      const refresh_token = v4()
      const expiry = 60 * 60 * 24 * 1000
      
      const userRefreshToken = await RefreshToken.findOne({ user_id: user._id })
      
      if(!userRefreshToken) {
        await RefreshToken.create({ refresh_token, user_id: user._id, expiry })
      } else {
        await userRefreshToken.updateOne({ refresh_token })
      }
      
      ctx.cookies.set('refresh_token', refresh_token, { maxAge: expiry, httpOnly: true, secure: false })
      
      ctx.body = { success: true, docs, token, refresh_token }

      return ctx.login(user)
    }
  })(ctx, next)
}

const getFreshToken = async (ctx, user) => {

  if(!ctx.isAuthenticated()) {
    ctx.throw('Not authenticated!')
  }

  const token = ctx.cookies.get('refresh_token')
  const expiry = 60 * 60 * 24 * 1000

  try {
    const refreshToken =  await RefreshToken.findOne({ refresh_token: token })
    
    if(refreshToken) {
      const new_token = v4()
      const { _doc: { password, ...docs } } = await User.findById(refreshToken.user_id)
      const newJWT = tokenizer.generateToken(docs)
      
      await refreshToken.updateOne({
        refresh_token: new_token
      })

      ctx.cookies.set('refresh_token', new_token, { maxAge: expiry, httpOnly: true, secure: false })

      ctx.body = {
        success: true,
        user: docs,
        token: newJWT,
        new_token
      }

    } else {
      ctx.cookies.set('refresh_token', '', { httpOnly: true, secure: false})
      ctx.throw(new Error('Invalid token!'))
    }
  } catch (error) {
    ctx.throw(error)
  }
}

module.exports = { login, getFreshToken }