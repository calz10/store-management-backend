const { mongoose: { Schema } } = require('../../db')

const refreshTokenSchema = new Schema({
  refresh_token: String,
  user_id: String,
  expiry: Number,
}, { autoCreate: true })

module.exports = refreshTokenSchema