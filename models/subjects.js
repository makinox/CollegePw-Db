'use strict'

let connection = require('../db/index')

const subjectsModels = {}

subjectsModels.getSubjects = async (callback) => {
  if (connection) {
    await connection.query('SELECT * FROM asignaturas ORDER BY idAsignaturas', async (err, rows) => {
      if (err) {
        return console.log(`Ha ocorrido un error: ${err.message}`)
      } else {
        await callback(null, rows)
      }
    })
  }
}

module.exports = subjectsModels
