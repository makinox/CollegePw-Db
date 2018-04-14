'use strict'

let connection = require('../db/index')

const eveModel = {}

eveModel.average = async (user, callback) => {
  if (connection) {
    connection.query(`SELECT avg(notaFinal) AS nota FROM calificaciones WHERE usuario = ${connection.escape(user)}`, async (err, rows) => {
      if (err) {
        console.log(`Ha ocorrido el siguiente error: ${err.message}`)
        callback(null, { error: `Ha ocorrido el siguiente error: ${err.message}` })
      } else {
        await callback(null, rows)
      }
    })
  } else {
    await callback(null, { message: 'No hay conexion' })
  }
}

module.exports = eveModel
