const Koa = require('koa');
const helmet = require('koa-helmet')
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors')
const passport = require('koa-passport')
const initializeRoutes = require('./routes')
const session = require('koa-session')
const route = require('koa-route')

// const session = require('koa-generic-session');
// const convert = require('koa-convert')
// const CSRF = require('koa-csrf')

const mongoose = require('./db')
const app = new Koa()
const port = process.env.PORT || 3000
const key = process.env.SECRET_KEY

app.use(bodyParser())

mongoose.initializeDb()
app.use(helmet())
app.use(cors())

app.keys = [key, 'secret-key']
app.use(session({} , app))

require('./auth')
app.use(passport.initialize())
app.use(passport.session())

initializeRoutes(app)

app.on('error', (err, ctx) => {
    console.log(err)
});


app.listen(port)