const Koa = require('koa');
const helmet = require('koa-helmet')
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors')
const initializeRoutes = require('./routes')

const mongoose = require('./db')
const app = new Koa()
const port = process.env.PORT || 3000

initializeRoutes(app)

mongoose.initializeDb()

app.use(bodyParser())
app.use(helmet())
app.use(cors())


app.listen(port)