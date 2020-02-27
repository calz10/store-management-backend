const Joi = require('@hapi/joi')

const { mongoose: { Schema } } = require('../../db')
const { formatValidation } = require('../../utils')


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

userSchema.method().validateInputs = (data) => {
  const schema = {
    username: Joi.string().min(3).max(15).required(),
    password: Joi.string().min(8).max(30).required().meta({ message: "hih" }),
    type: Joi.string().valid('rentor', 'admin').default('rentor').required()
  }
  const { error } = Joi.object(schema).options({ abortEarly: false }).validate(data)
  if (error && error.details.length) {
   return formatValidation(error.details)
  }
  return false
}


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