const { mongoose: { Schema } } = require('../../db')

const paymentSchema = new Schema({
  userId: String,
  totalAmount: Number,
  balance: Number,
  storeId: String
}, { autoCreate: true })

module.exports = paymentSchema