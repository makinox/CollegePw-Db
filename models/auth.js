'use strict'

let connection = require('../db/index')

const authModel = {}

authModel.validate = async (id, pass, callback) => {
  if (connection) {
    await connection.query(`SELECT * FROM usuarios WHERE usuario = ${connection.escape(id)}
    AND contraseña =${connection.escape(pass)}`, async (err, rows) => {
      if (err) {
        console.log(`Ha ocorrido el siguiente error: ${err.message}`)
        callback(null, {error: `Ha ocorrido el siguiente error: ${err.message}`})
      } else if (rows.length > 0) {
        await callback(null, true)
      } else {
        console.log('Error de credenciales')
        await callback(null, false)
      }
    })
  } else {
    await callback(null, {message: 'No hay conexion'})
  }
}

module.exports = authModel
