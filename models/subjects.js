'use strict'

let connection = require('../db/index')

const subjectsModel = {}

subjectsModel.getSubjects = async (callback) => {
  if (connection) {
    await connection.query('SELECT * FROM asignaturas ORDER BY idAsignaturas', async (err, rows) => {
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

subjectsModel.getSubject = async (id, callback) => {
  if (connection) {
    await connection.query(`SELECT * FROM asignaturas WHERE idAsignaturas = ${connection.escape(id)}`, async (err, rows) => {
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

subjectsModel.updateSubject = async (userData, callback) => {
  if (connection) {
    let sql = `
        UPDATE asignaturas SET
        nombreCurso = ${connection.escape(userData.nombreCurso)},
        periodo = ${connection.escape(userData.periodo)},
        curso = ${connection.escape(userData.curso)},
        codigoG = ${connection.escape(userData.codigoG)}
        where idAsignaturas = ${connection.escape(userData.idAsignaturas)}`
    await connection.query(sql, async (err, rows) => {
      if (err) {
        console.log(`Ha ocorrido el siguiente error: ${err.message}`)
        callback(null, { error: `Ha ocorrido el siguiente error: ${err.message}` })
      } else {
        console.log(`Se registro con el id ${rows.idAsignaturas}`)
        await callback(null, rows.idAsignaturas)
      }
    })
  } else {
    await callback(null, { message: 'No hay conexion' })
  }
}

subjectsModel.insertSubject = async (userData, callback) => {
  if (connection) {
    await connection.query('INSERT INTO asignaturas SET ?', userData, async (err, rows) => {
      if (err) {
        console.log(`Ha ocorrido el siguiente error: ${err.message}`)
        callback(null, { error: `Ha ocorrido el siguiente error: ${err.message}` })
      } else {
        await callback(null, { message: 'Asignatura insertada' })
        // await connection.query(``)
      }
    })
  } else {
    await callback(null, { message: 'No hay conexion' })
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
            console.log(`Ha ocorrido el siguiente error: ${err.message}`)
            callback(null, { error: `Ha ocorrido el siguiente error: ${err.message}` })
          } else {
            await callback(null, { message: 'Asignatura borrada' })
          }
        })
      } else if (err) {
        console.log(`Ha ocorrido el siguiente error: ${err.message}`)
        callback(null, { error: `Ha ocorrido el siguiente error: ${err.message}` })
      }
    })
  } else {
    await callback(null, { message: 'No hay conexion' })
  }
}

module.exports = subjectsModel
