'use strict'

let connection = require('../db/index')

const indexModel = {}

indexModel.anything = async (callback) => {
  if (connection) {
    await connection.query('SHOW tables', async (err, rows) => {
      if (err) {
        return console.log(`Ha ocorrido un error: ${err.message}`)
      } else {
        await callback(null, rows)
      }
    })
  } else {
    await callback(null, {message: 'No hay conexion'})
  }
}

module.exports = indexModel
