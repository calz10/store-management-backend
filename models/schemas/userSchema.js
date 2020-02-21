const { mongoose: { Schema } } = require('../../db')

const UserSchema = (add) => {
  const schema = new Schema({
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }, {autoCreate: true  })

  if (add) schema.add(add)

  return schema
}

const adminSchema = UserSchema()

const rentorSchema = UserSchema({
  storeIds: [String],
  transactionIds: [String],
  paymentId: String
})


module.exports = {
    adminSchema,
    rentorSchema
}