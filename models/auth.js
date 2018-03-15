'use strict'

let connection = require('../db/index')

const authModel = {}

authModel.validate = async (id, pass, callback) => {
  if (connection) {
    await connection.query(`SELECT * FROM usuarios WHERE idUsuarios = ${connection.escape(id)}
    AND contraseña =${connection.escape(pass)}`, async (err, rows) => {
      if (err) {
        return console.log(`Ha ocorrido un error: ${err.message}`)
      } else if (rows.length > 0) {
        await callback(null, true)
      } else {
        console.log('Error de credenciales')
        await callback(null, false)
      }
    })
  }
}

module.exports = authModel
