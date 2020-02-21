const { mongoose: { Schema } } = require('../../db')

const collectorSchema = new Schema({
  totalAmount: Number,
  balance: Number,
  storeId: String
}, { autoCreate: true })

module.exports = collectorSchema