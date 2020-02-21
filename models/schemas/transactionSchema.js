const { mongoose: { Schema } } = require('../../db')

const transactionSchema = new Schema({
    amount: Number,
    rentorId: Number,
  }, { timestamps: true })
  

  module.exports = transactionSchema