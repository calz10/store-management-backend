const { Admin } = require('../../models')

const getAdmin = async (ctx, next) => {
  ctx.body = await Admin.findOne({})
}

module.exports = {
  getAdmin
}