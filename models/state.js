'use strict'

let connection = require('../db/index')

const statModel = {}

statModel.getStats = async (callback) => {
  if (connection) {
    await connection.query('SELECT * FROM calificaciones ORDER BY idCalificaciones', async (err, rows) => {
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

statModel.getStat = async (as, callback) => {
  if (connection) {
    await connection.query(`SELECT * FROM calificaciones WHERE idAsignaturas = ${connection.escape(as)}`, async (err, rows) => {
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

statModel.getOest = async (as, callback) => {
  if (connection) {
    await connection.query(`SELECT * FROM calificaciones WHERE usuario = ${connection.escape(as)}`, async (err, rows) => {
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

statModel.updateStat = async (userData, callback) => {
  if (connection) {
    let sql = `
        UPDATE calificaciones SET
        calificacionEstudiante = ${connection.escape(userData.calificacionEstudiante)},
        calificacionProfesores = ${connection.escape(userData.calificacionProfesores)},
        nota1 = ${connection.escape(userData.nota1)},
        nota2 = ${connection.escape(userData.nota2)},
        nota3 = ${connection.escape(userData.nota3)},
        notaFinal = ${connection.escape((userData.nota1 + userData.nota2 + userData.nota3) / 3)}
        WHERE usuario = ${connection.escape(userData.usuario)}
        AND idAsignaturas = ${connection.escape(userData.idAsignaturas)}`

    await connection.query(sql, async (err, rows) => {
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

statModel.insertStat = async (userData, callback) => {
  if (connection) {
    await connection.query('INSERT INTO calificaciones SET ?', userData, async (err, rows) => {
      if (err) {
        console.log(`Ha ocorrido el siguiente error: ${err.message}`)
        callback(null, {error: `Ha ocorrido el siguiente error: ${err.message}`})
      } else {
        await callback(null, {'Calificacion agregada': rows})
      }
    })
  }
}

statModel.deleteStat = async (id, as, callback) => {
  if (connection) {
    let sql = `SELECT * FROM usuarios WHERE idUsuarios = ${connection.escape(id)}
    AND idAsignaturas = ${connection.escape(as)}`
    await connection.query(sql, async (err, row) => {
      if (row) {
        let sql = `DELETE FROM usuarios WHERE idUsuarios = ${id}
        AND idAsignaturas = ${as}`
        await connection.query(sql, async (err, req) => {
          if (err) {
            console.log(`Ha ocorrido el siguiente error: ${err.message}`)
            callback(null, {error: `Ha ocorrido el siguiente error: ${err.message}`})
          } else {
            await callback(null, {message: 'Usuario borrado'})
          }
        })
      } else if (err) {
        console.log(`Ha ocorrido el siguiente error: ${err.message}`)
        callback(null, {error: `Ha ocorrido el siguiente error: ${err.message}`})
      }
    })
  } else {
    await callback(null, {message: 'No hay conexion'})
  }
}

module.exports = statModel
