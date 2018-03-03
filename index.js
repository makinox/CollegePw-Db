'use strict'

const express = require('express')
const app = express()

const morgan = require('morgan')
const bodyParser = require('body-parser')

const port = 3001

// settings
app.set('port', (process.env.PORT || 5000))

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// routes
require('./routes/index')(app)

app.listen(app.get('port'), function () {
  console.log('Utopia-db corriendo en el puerto ', app.get('port'))
})
