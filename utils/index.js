const encrypter = require('./encrypter')
const tokenizer = require('./tokenizer')
const status = require('./response/status')

const formatValidation = (details = []) => {
  return details.reduce((acc, cum) => {
    acc[cum.path[0]] = cum.message

    return acc
  }, {})
}

module.exports = {
  encrypter,
  tokenizer,
  status,
  formatValidation
}