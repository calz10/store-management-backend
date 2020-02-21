const { mongoose: { Schema } } = require('../../db')


const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: String
}, { autoCreate: true })


const adminSchema = new Schema({
  userId: String
}, { autoCreate: true })

const rentorSchema = new Schema({
  storeIds: [String],
  transactionIds: [String],
  paymentId: String,
  userId: String
}, { autoCreate: true })


module.exports = {
  adminSchema,
  rentorSchema,
  userSchema
}