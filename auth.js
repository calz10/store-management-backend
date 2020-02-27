const passport = require('koa-passport')
const  { Strategy: LocalStrategy } = require('passport-local')
const { encrypter } = require('./src/server/utils')
const { Admin, User, } = require('./src/server/models')

const bcrypt = require('bcrypt')

const fetchAdmin = async () => {
  try {
    const hasAdmin = await User.findOne({ type: 'admin' })
    if (!hasAdmin) {
      const password = await encrypter.encrypt('delmontepineapple@123.')

      const userData = await User.create({
        username: 'admin',
        password,
        type: 'admin'
      })

      await Admin.create({
        userId: userData._id
      })
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

fetchAdmin()


/**
 * Serialize user
 * 
 * @param object        User info
 */
passport.serializeUser(async (user, done) => {
  done(null, user._id)
})

/**
 * Deserialize user from session
 * 
 * @param integer        User id
 * @returns
 */
passport.deserializeUser(async(id, done) => {
  try {
    const user = await User.findById(id)
    if(user) {
      done(null, user._doc)
    }
    done(null)
  } catch(err) {
    done(err)
  }
})

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username })
    const sameHash = await encrypter.checkEncryption(password, user.password)

    if(sameHash) {
      return done(null, user._doc)
    } else {
      return done(null)
    }
  } catch (error) {
    return done(error)
  }
}))