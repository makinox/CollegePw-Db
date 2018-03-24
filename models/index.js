'use strict'

let connection = require('../db/index')

const indexModel = {}

indexModel.anything = async (callback) => {
  if (connection) {
    await connection.query('SHOW tables', async (err, rows) => {
      if (err) {
        console.log(`Ha ocorrido el siguiente error: ${err.message}`)
        callback(null, {error: `Ha ocorrido el siguiente error: ${err.message}`})
      } else {
        await callback(null, rows)
      }
    })
  } else {
    await callback(null, {message: 'No hay conexion'})
  }
}

module.exports = indexModel
