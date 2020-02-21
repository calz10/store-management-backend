const { get } = require('koa-route')
const { Admin } = require('../../models')
const { encrypter } = require('../../utils')

const adminFunctions = require('./functions')

const initializeAdminRoutes = async (app) => {
  const { use } = app
  const admin = await Admin.find()

  if (!admin.length) {
    const hashDefaultPassword = await encrypter.encrypt('DelmontepineApple@123')
    const defaultAdmin = {
      password: hashDefaultPassword,
      username: 'admin'
    }

    await Admin.create(defaultAdmin)
  }

  app.use(get('/admins', adminFunctions.getAdmin))
}

module.exports = initializeAdminRoutes