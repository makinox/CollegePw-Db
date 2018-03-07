'use strict'

const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.password,
  database: 'collegepw'
})

module.exports = connection
