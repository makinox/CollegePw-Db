'use strict'

let connection = require('../db/index')

const entyModel = {}

entyModel.getEntys = async (callback) => {
  if (connection) {
    await connection.query('SELECT * FROM entidad ORDER BY idEnt', async (err, rows) => {
      if (err) {
        return callback(null, {message: `Ha ocorrido el siguiente error: ${err.message}`})
      } else {
        await callback(null, rows)
      }
    })
  } else {
    await callback(null, {message: 'No hay conexion'})
  }
}

entyModel.getEnty = async (id, callback) => {
  if (connection) {
    await connection.query(`SELECT * FROM entidad WHERE idEnt = ${connection.escape(id)}`, async (err, rows) => {
      if (err) {
        return callback(null, {message: `Ha ocorrido el siguiente error: ${err.message}`})
      } else {
        await callback(null, rows)
      }
    })
  } else {
    await callback(null, {message: 'No hay conexion'})
  }
}

entyModel.register = async (userData, callback) => {
  if (connection) {
    await connection.query('INSERT INTO entidad SET ?', userData, async (err, rows) => {
      if (err) {
        return callback(null, { message: `Ha ocorrido el siguiente error: ${err.message}` })
      } else {
        await callback(null, { message: 'Entidad agregada' })
      }
    })
  } else {
    await callback(null, { message: 'No hay conexion' })
  }
}

module.exports = entyModel
