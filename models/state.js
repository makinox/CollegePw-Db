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
    let cec = ''
    if (userData.calificacionEstudiante > 0) { cec = `calificacionEstudiante = ${connection.escape(userData.calificacionEstudiante)}` }
    let cpc = ''
    if (userData.calificacionProfesores > 0) { cpc = `calificacionProfesores = ${connection.escape(userData.calificacionProfesores)}` }
    let nt1 = ''
    if (userData.nota1 > 0) { nt1 = `nota1 = ${connection.escape(userData.nota1)}` }
    let nt2 = ''
    if (userData.nota2 > 0) { nt2 = `nota2 = ${connection.escape(userData.nota2)}` }
    let nt3 = ''
    if (userData.nota3 > 0) { nt3 = `nota3 = ${connection.escape(userData.nota3)}` }

    if ((cpc !== '')) { cec = cec + ',' }
    if ((cec === '') && (nt1 !== '')) { cpc = cpc + ',' }
    if ((cpc === '') && (nt2 !== '')) { nt1 = nt1 + ',' }
    if ((nt1 === '') && (nt3 !== '')) { nt2 = nt2 + ',' }

    let sql = `
        UPDATE calificaciones SET
        ${cec}
        ${cpc}
        ${nt1}
        ${nt2}
        ${nt3}
        WHERE usuario = ${connection.escape(userData.usuario)}
        AND idAsignaturas = ${connection.escape(userData.idAsignaturas)}`
    await connection.query(sql, async (err, rows) => {
      if (err) {
        console.log(`Ha ocorrido el siguiente error: ${err.message}`)
        callback(null, {error: `Ha ocorrido el siguiente error: ${err.message} `})
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
