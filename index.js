'use strict'

const express = require('express')
const app = express()

const morgan = require('morgan')
const bodyParser = require('body-parser')

// settings
app.set('port', (process.env.PORT || 3001))

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  type: 'application/x-www-form-urlencoded',
  extended: true
}))

// routes
require('./routes/index')(app)
require('./routes/users')(app)
require('./routes/subjects')(app)

app.listen(app.get('port'), function () {
  console.log('Utopia-db corriendo en el puerto ', app.get('port'))
})
