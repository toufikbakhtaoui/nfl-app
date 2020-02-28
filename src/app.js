const express = require('express')
const mongoose = require('mongoose')
const config = require('../config/config')
const routes = require('./routes')

const app = express()

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(config.mongo.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
}

app.route('/').get((req, res) => {
    res.json({ message: 'Welcome to the nfl!' })
})

app.use('/api', routes)

module.exports = app
