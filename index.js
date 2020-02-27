const Koa = require('koa');
const helmet = require('koa-helmet')
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors')
const passport = require('koa-passport')
const initializeRoutes = require('./routes')
const session = require('koa-session')
const serve = require('koa-static');
const mount = require('koa-mount')

const mongoose = require('./db')
const app = new Koa()
const port = process.env.PORT || 3000
const key = process.env.SECRET_KEY
const path = require('path')

app.use(bodyParser())
console.log(__dirname+"/client/build")
app.use(serve("client/build"))
mongoose.initializeDb()
app.use(helmet())
// app.use(cookies())
app.use(cors())

app.keys = [key, 'secret-key']
app.use(session({}, app))

require('./auth')
app.use(passport.initialize())
app.use(passport.session())

initializeRoutes(app)

app.listen(port)