const passport = require('koa-passport')
const { tokenizer, status: { code, response } } = require('../../utils')
const { v4 } = require('uuid')
const { RefreshToken, User } = require('../../models')


const login = async (ctx, next) => {
  if(ctx.isAuthenticated()) {
    return ctx.body = {
      ...response[code.INTERNAL_SERVER],
      message: "user is already authenticated"
    }
  }

  return passport.authenticate('local', async (err, user, info, status) => {
    try {
      if (!user) {
        ctx.throw(code.INTERNAL_SERVER, 'Invalid username and password')
      } else {

        const { password, ...docs } = user
        const token = tokenizer.generateToken(docs)
        const refresh_token = v4()
        const expiry = 60 * 60 * 24 * 1000

        const userRefreshToken = await RefreshToken.findOne({ user_id: user._id })

        if (!userRefreshToken) {
          await RefreshToken.create({ refresh_token, user_id: user._id, expiry })
        } else {
          await userRefreshToken.updateOne({ refresh_token })
        }

        ctx.cookies.set('refresh_token', refresh_token, { maxAge: expiry, httpOnly: true, secure: false })

        ctx.body = {
          ...response[code.OK],
          data: {
            refresh_token,
            user: docs,
            token
          }
        }
        return ctx.login(user)
      }

    } catch (error) {
      ctx.body = {
        ...response[code.INTERNAL_SERVER],
        errors: error.errors ||  {},
        message: error.message
      }
    }
  })(ctx, next)
}

const getFreshToken = async (ctx, user) => {

  if (!ctx.isAuthenticated()) {
    ctx.throw('Not authenticated!')
  }

  const token = ctx.cookies.get('refresh_token')
  const expiry = 60 * 60 * 24 * 1000

  try {
    const refreshToken = await RefreshToken.findOne({ refresh_token: token })

    if (refreshToken) {
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
      ctx.cookies.set('refresh_token', '', { httpOnly: true, secure: false })
      ctx.throw(new Error('Invalid token!'))
    }
  } catch (error) {
    ctx.throw(error)
  }
}

module.exports = { login, getFreshToken }