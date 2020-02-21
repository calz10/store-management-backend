const bycript = require('bcrypt')
const saltRounds = 10;

const Encrypter = {
  encrypt: async (password) => {
    const hashPassword = await bycript.hash(password, Number(process.env.SALT_ROUNDS))
    return hashPassword
  },
  checkEncryption : async (password, hash) => await bycript.compare(password, hash)
}

module.exports = Encrypter