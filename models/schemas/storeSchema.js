const { mongoose: { Schema } } = require('../../db')

const storeSchema = new Schema({
  formerRentors: [String],
  activeStore: Boolean,
  rentAmount: Number,
  rentorId: String
})

module.exports = storeSchema