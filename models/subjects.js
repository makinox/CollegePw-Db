'use strict'

let connection = require('../db/index')

const subjectsModel = {}

subjectsModel.getSubjects = async (callback) => {
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

subjectsModel.getSubject = async (id, callback) => {
  if (connection) {
    await connection.query(`SELECT * FROM asignaturas WHERE idAsignaturas = ${connection.escape(id)}`, async (err, rows) => {
      if (err) {
        return console.log(`Ha ocorrido un error: ${err.message}`)
      } else {
        await callback(null, rows)
      }
    })
  }
}

subjectsModel.updateSubject = async (userData, callback) => {
  if (connection) {
    let sql = `
        UPDATE asignaturas SET
        nombreCurso = ${connection.escape(userData.nombreCurso)},
        periodo = ${connection.escape(userData.periodo)},
        curso = ${connection.escape(userData.curso)},
        codigoG = ${connection.escape(userData.codigoG)}
        where idAsignaturas = ${connection.escape(userData.idAsignaturas) || connection.escape(userData.codigo)}`
    await connection.query(sql, async (err, rows) => {
      if (err) {
        return console.log(`Ha ocorrido un error: ${err.message}`)
      } else {
        await callback(null, rows)
      }
    })
  }
}

subjectsModel.insertSubject = async (userData, callback) => {
  if (connection) {
    await connection.query('INSERT INTO asignaturas SET ?', userData, async (err, rows) => {
      if (err) {
        return console.log(`Ha ocorrido un error: ${err.message}`)
      } else {
        await callback(null, {'insertId': rows.insertId})
      }
    })
  }
}

subjectsModel.deleteSubject = async (idAsignaturas, callback) => {
  if (connection) {
    let sql = `SELECT * FROM asignaturas WHERE idAsignaturas = ${connection.escape(idAsignaturas)}`
    await connection.query(sql, async (err, row) => {
      if (row) {
        let sql = `DELETE FROM asignaturas WHERE idAsignaturas = ${idAsignaturas}`
        await connection.query(sql, async (err, req) => {
          if (err) {
            return console.log(`Ha ocorrido un error: ${err.message}`)
          } else {
            await callback(null, {'message': 'Usuario borrado'})
          }
        })
      } else if (err) {
        await callback(null, {'message': `Ha ocurrido un error: ${err.message}`})
      }
    })
  }
}

module.exports = subjectsModel
