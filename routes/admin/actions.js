const  { Admin } = require('../../models')

const actions = {
  getAdmin: async (ctx) => {
    ctx.body = await Admin.findOne({})
  }
}

module.exports = actions