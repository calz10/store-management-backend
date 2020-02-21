const { mongoose: { Schema } } = require('../../db')

const paymentSchema = new Schema({
  userId: String,
  totalAmount: Number,
  balance: Number,
  storeId: String
})

module.exports = paymentSchema