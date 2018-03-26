'use strict'

const mysql = require('mysql')
// const password = require('../config')

const connection = mysql.createConnection({
  host: process.env.hostt || '0.0.0.0',
  user: 'root',
  password: process.env.password || 'Jesusmakinoxal100%',
  database: 'collegepw',
  port: '3306'
})

module.exports = connection
