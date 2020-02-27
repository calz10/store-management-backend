const { encrypter } = require('../../utils')
const { User } = require('../../models')
const { status: { code, response } } = require('../../utils')
const { userSchema: Validator } = require('../../models/schemas')

const registerUser = async (ctx) => {
  try {
    const { body: { username, password, ...data } } = ctx.request

    if(ctx.isAuthenticated()) {
      // todo
    } else {
      if(data.type === 'admin') {
        ctx.throw(code.UNAUTHORIZED, 'user is not permitted!')
      }
    }

    const errors = Validator.userSchema.validateInputs(ctx.request.body)
    if (errors) {
      ctx.throw('Validation Error', { errors, code: code.INTERNAL_SERVER })
    }

    const user = await User.findOne({ username })
    
    if (user) {
      return ctx.body = {
        ...response[code.INTERNAL_SERVER],
        errors: {
          username: 'username is already existing'
        }
      }
    } else {
      const hashPassword = await encrypter.encrypt(password)
      const { _doc: { password: _, ...result } } = await User.create({ ...data, username, password: hashPassword })
      
      return ctx.body = {
        ...response[code.CREATED],
        data: result
      }
    }
  } catch (error) {
    if (error) {
      ctx.body = {
        ...response[error.code || code.INTERNAL_SERVER],
        message: error.message,
        errors: error.errors || {}
      }
    }
  }
}

module.exports = {
  registerUser
}