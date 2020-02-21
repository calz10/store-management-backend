const { Admin } = require('../../models')

const getAdmin = async (ctx) => {
  ctx.body = await Admin.findOne({})
}

module.exports = {
  getAdmin
}