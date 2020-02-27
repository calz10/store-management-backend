const jwt = require('jsonwebtoken')

const Tokenizer = {
  generateToken:  (data) => {
    const token = jwt.sign({ ...data }, process.env.JWT_SECRET, { expiresIn: '1h' })

    return token
  },
  verifyToken: (token) => {
    const verifiedToken =  jwt.verify(token, process.env.JWT_SECRET)

    return verifiedToken
  }
}

module.exports = Tokenizer