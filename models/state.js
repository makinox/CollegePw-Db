'use strict'

let connection = require('../db/index')

const statModel = {}

statModel.getStats = async (callback) => {
  if (connection){
    await connection.query('SELECT * FROM calificaciones ORDER BY idCalificaciones', async (err, rows) => {
      if (err) {
        return console.log(`Ha ocorrido un error: ${err.message}`)
      } else {
        await callback(null, rows)
      }
    })
  }
}

statModel.getStat = async (id, as, callback) => {
  if (connection) {
    await connection.query(`SELECT * FROM calificaciones WHERE idUsuarios = ${connection.escape(id)}
    AND idAsignaturas = ${connection.escape(as)}`, async (err, rows) => {
      if (err) {
        return console.log(`Ha ocorrido un error: ${err.message}`)
      } else {
        await callback(null, rows)
      }
    })
  }
}

module.exports = statModel

