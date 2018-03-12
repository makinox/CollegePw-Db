'use strict'

const mysql = require('mysql')
const password = require('../config')

const connection = mysql.createConnection({
  host: process.env.hostt || 'localhost',
  user: 'root',
  password: process.env.password || password,
  database: 'collegepw'
})

module.exports = connection
