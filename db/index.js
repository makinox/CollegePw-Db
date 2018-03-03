'use strict'

const mysql = require('mysql')
const databasePass = require('../config')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: databasePass || process.env.password,
  database: 'collegepw'
})

module.exports = connection
