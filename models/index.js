'use strict'

let connection = require('../db/index')

const indexModel = {}

indexModel.anything = async (callback) => {
  if (connection) {
    await connection.query('SHOW tables', async (err, rows) => {
      if (err) {
        return callback(null, { message: `Ha ocorrido el siguiente error: ${err.message}` })
      } else {
        await callback(null, rows)
      }
    })
  } else {
    await callback(null, {message: 'No hay conexion'})
  }
}

module.exports = indexModel
