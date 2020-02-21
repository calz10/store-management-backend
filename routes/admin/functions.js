const  { Admin } = require('../../models')

const functions = {
  getAdmin: async (ctx) => {
    ctx.body = await Admin.findOne({})
  }
}

module.exports = functions