'use strict'

const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

// Configuraciones
app.set('port', (process.env.PORT || 3001))

// Headers
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  // res.header('Content-Security-Policy')
  // res.header('upgrade-insecure-requests')
  next()
})

// Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({type: 'application/x-www-form-urlencoded', extended: true}))

// Rutas
require('./routes/index')(app)
require('./routes/auth')(app)
require('./routes/users')(app)
require('./routes/subjects')(app)
require('./routes/state')(app)
require('./routes/enty')(app)
require('./routes/eve')(app)

// Conección
app.listen(app.get('port'), () => { console.log('Utopia-db corriendo en el puerto ', app.get('port')) })
