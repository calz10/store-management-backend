const { mongoose: { model } } = require('../db')
const schemas = require('./schemas')

const Transaction = model('Transaction', schemas.transactionSchema)
const Payment = model('Payment', schemas.paymentSchema)
const Admin = model('Admin', schemas.userSchema.adminSchema)
const Rentor = model('Rentor', schemas.userSchema.rentorSchema)
const Store = model('Store', schemas.storeSchema)
const Collector = model('Collector', schemas.collectorSchema)

module.exports = {
  Transaction,
  Payment,
  Admin,
  Rentor,
  Store,
  Collector,
}