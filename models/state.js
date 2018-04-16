'use strict'

let connection = require('../db/index')

const statModel = {}

statModel.getStats = async (callback) => {
  if (connection) {
    await connection.query('SELECT * FROM calificaciones ORDER BY idCalificaciones', async (err, rows) => {
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

statModel.getStat = async (as, callback) => {
  if (connection) {
    await connection.query(`SELECT * FROM calificaciones WHERE idAsignaturas = ${connection.escape(as)}`, async (err, rows) => {
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

statModel.getOest = async (as, callback) => {
  if (connection) {
    await connection.query(`SELECT * FROM calificaciones WHERE usuario = ${connection.escape(as)}`, async (err, rows) => {
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

statModel.updateStat = async (userData, callback) => {
  if (connection) {
    // Calificacion estudiante
    let cec = ''
    let cecInit = ''
    let cecOuput = ''
    if (userData.calificacionEstudiante > 0) {
      cec = `${connection.escape(userData.calificacionEstudiante)}`
      cecInit = 'calificacionEstudiante'
      cecOuput = 'calificacionEstudiante = values(calificacionEstudiante)'
    }

    // Calificacion profesores
    let cpc = ''
    let cpcInit = ''
    let cpcOuput = ''
    if (userData.calificacionProfesores > 0) {
      cpc = `${connection.escape(userData.calificacionProfesores)}`
      cpcInit = 'calificacionProfesores'
      cpcOuput = 'calificacionProfesores = values(calificacionProfesores)'
    }

    // Nota 1
    let nt1 = ''
    let nt1Init = ''
    let nt1Ouput = ''
    if (userData.nota1 > 0) {
      nt1 = `${connection.escape(userData.nota1)}`
      nt1Init = 'nota1'
      nt1Ouput = 'nota1 = values(nota1)'
    }

    // Nota 2
    let nt2 = ''
    let nt2Init = ''
    let nt2Ouput = ''
    if (userData.nota2 > 0) {
      nt2 = `${connection.escape(userData.nota2)}`
      nt2Init = 'nota2'
      nt2Ouput = 'nota2 = values(nota2)'
    }

    // Nota 3
    let nt3 = ''
    let nt3Init = ''
    let nt3Ouput = ''
    if (userData.nota3 > 0) {
      nt3 = `${connection.escape(userData.nota3)}`
      nt3Init = 'nota3'
      nt3Ouput = 'nota3 = values(nota3)'
    }

    // Identificacion de la calificacion
    let idCal = `(concat(${connection.escape(userData.usuario)},${connection.escape(userData.idAsignaturas)})`

    if ((cec !== '') && (cpc !== '')) {
      cec += ','
      cecInit += ','
      cecOuput += ','
    }
    if ((cpc !== '') && (nt1 !== '')) {
      cpc += ','
      cpcInit += ','
      cpcOuput += ','
    }
    if ((nt1 !== '') && (nt2 !== '')) {
      nt1 += ','
      nt1Init += ','
      nt1Ouput += ','
    }
    if ((nt2 !== '') && (nt3 !== '')) {
      nt2 += ','
      nt2Init += ','
      nt2Ouput += ','
    }

    let sql = `INSERT into calificaciones
     (idCalificaciones, idAsignaturas, usuario, ${cecInit} ${cpcInit} ${nt1Init} ${nt2Init} ${nt3Init})
      values ${idCal} , ${connection.escape(userData.idAsignaturas)}, ${connection.escape(userData.usuario)}, ${cec} ${cpc} ${nt1} ${nt2} ${nt3})
       ON DUPLICATE KEY UPDATE idCalificaciones = values(idCalificaciones),idAsignaturas = values(idAsignaturas), usuario = values(usuario),
        ${cecOuput} ${cpcOuput} ${nt1Ouput} ${nt2Ouput} ${nt3Ouput}`
    // let sql = `
    //     UPDATE calificaciones SET
    //     ${cec}
    //     ${cpc}
    //     ${nt1}
    //     ${nt2}
    //     ${nt3}
    //     WHERE usuario = ${connection.escape(userData.usuario)}
    //     AND idAsignaturas = ${connection.escape(userData.idAsignaturas)}`
    await connection.query(sql, async (err, rows) => {
      await connection.query(`UPDATE calificaciones set notaFinal = ((nota1 + nota2 + nota3)/(3)) where usuario = ${connection.escape(userData.usuario)} and idAsignaturas = ${connection.escape(userData.idAsignaturas)}`)
      if (err) {
        console.log(`Ha ocorrido el siguiente error: ${err.message} sql error ${sql}`)
        callback(null, { error: `Ha ocorrido el siguiente error: ${err.message} ` })
      } else {
        await callback(null, rows)
      }
    })
  } else {
    await callback(null, { message: 'No hay conexion' })
  }
}

statModel.insertStat = async (userData, callback) => {
  if (connection) {
    await connection.query('INSERT INTO calificaciones SET ?', userData, async (err, rows) => {
      if (err) {
        console.log(`Ha ocorrido el siguiente error: ${err.message}`)
        callback(null, { error: `Ha ocorrido el siguiente error: ${err.message}` })
      } else {
        await callback(null, { 'Calificacion agregada': rows })
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
            callback(null, { error: `Ha ocorrido el siguiente error: ${err.message}` })
          } else {
            await callback(null, { message: 'Usuario borrado' })
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

module.exports = statModel
