const { mongoose: { Schema } } = require('../../db')

const collectorSchema = new Schema({
  totalAmount: Number,
  balance: Number,
  storeId: String
})

module.exports = collectorSchema