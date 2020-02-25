const { encrypter } = require('../../utils')
const { User } = require('../../models')

const registerUser = async (ctx) => {
  try {
    const { body: { username, password, ...data } } = ctx.request
    const user = await User.findOne({ username })

    if (user) {
      ctx.throw('Username already exist')
    } else {
      const hashPassword = await encrypter.encrypt(password)
      const { _doc: { password: _, ...result } } = await User.create({ ...data, username, password: hashPassword })
      ctx.body = {
        success: true,
        data: result
      }
    }
  } catch (error) {
    ctx.throw(error)
  }
}

module.exports = {
  registerUser
}