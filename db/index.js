const mongoose = require('mongoose')

const uriString = process.env.DB_CONNECTION || "mongodb://localhost/store-management"

const initializeDb = () => {
    
    mongoose.connect(uriString, {useNewUrlParser: true, useUnifiedTopology: true })
    const { connection: db } = mongoose
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => {
        console.log('Successfully connected to mongodb!')
    })
}

module.exports = {
    initializeDb,
    mongoose
}