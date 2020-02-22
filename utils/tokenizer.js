const jwt = require('jsonwebtoken')
const fs = require('fs')

const Tokenizer = {
  generateToken:  (data) => {
    const privateKey = fs.readFileSync('jwtRS256.key')
    const token = jwt.sign({ ...data }, privateKey, { expiresIn: '1h', algorithm: 'RS256'})
    
    return token
  },
  verifyToken: (token) => {
    const pubKey = fs.readFileSync('jwtRS256.key.pub')
    const verifiedToken =  jwt.verify(token, pubKey)

    return verifiedToken
  }
}

module.exports = Tokenizer