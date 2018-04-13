'use strict'

let connection = require('../db/index')

const userModel = {}

userModel.getUsers = async (callback) => {
  if (connection) {
    await connection.query('SELECT * FROM usuarios ORDER BY idUsuarios', async (err, rows) => {
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

userModel.getUser = async (id, callback) => {
  if (connection) {
    await connection.query(`SELECT * FROM usuarios WHERE usuario = ${connection.escape(id)}`, async (err, rows) => {
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

userModel.getAFcurso = async (grado, callback) => {
  if (connection) {
    let sql = `SELECT usuario FROM usuarios WHERE grado = ${connection.escape(grado)}`
    await connection.query(sql, async (err, rows) => {
      if (err) {
        console.log(`Ha ocorrido el siguiente error: ${err.message} \nsql: ${sql}`)
        callback(null, { error: `Ha ocorrido el siguiente error: ${err.message}` })
      } else {
        await callback(null, rows)
      }
    })
  } else {
    await callback(null, { message: 'No hay conexion' })
  }
}

userModel.updateUser = async (userData, callback) => {
  if (connection) {
    let nomb = ''
    if (userData.nombres > 0) { nomb = `nombres = ${connection.escape(userData.nombres)}` }
    let apel = ''
    if (userData.apellidos > 0) { apel = `apellidos = ${connection.escape(userData.apellidos)}` }
    let contr = ''
    if (userData.contraseña > 0) { contr = `contraseña = ${connection.escape(userData.contraseña)}` }
    let roll = ''
    if (userData.rol > 0) { roll = `rol = ${connection.escape(userData.rol)}` }
    let emai = ''
    if (userData.email > 0) { emai = `email = ${connection.escape(userData.email)}` }
    let docum = ''
    if (userData.documento > 0) { docum = `documento = ${connection.escape(userData.documento)}` }

    if ((nomb !== '') && (apel !== '')) { nomb = nomb + ',' }
    if ((apel !== '') && (contr !== '')) { apel = apel + ',' }
    if ((contr !== '') && (roll !== '')) { contr = contr + ',' }
    if ((roll !== '') && (emai !== '')) { roll = roll + ',' }
    if ((emai !== '') && (docum !== '')) { emai = emai + ',' }

    let sql = `
        UPDATE usuarios SET
        ${nomb}
        ${apel}
        ${contr}
        ${roll}
        ${emai}
        ${docum}
        WHERE usuario = ${connection.escape(userData.usuario)}`

    await connection.query(sql, async (err, rows) => {
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

userModel.insertUser = async (userData, callback) => {
  if (connection) {
    await connection.query('INSERT INTO usuarios SET ?', userData, async (err, rows) => {
      if (err) {
        console.log(`Ha ocorrido el siguiente error: ${err.message}`)
        callback(null, { error: `Ha ocorrido el siguiente error: ${err.message}` })
      } else {
        await callback(null, { message: 'Usuario agregado' })
      }
    })
  }
}

userModel.deleteUser = async (usuario, callback) => {
  if (connection) {
    let sql = `SELECT * FROM usuarios WHERE usuario = ${connection.escape(usuario)}`
    await connection.query(sql, async (err, row) => {
      if (row) {
        let sql = `DELETE FROM usuarios WHERE usuario = '${usuario}'`
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
  }
}

module.exports = userModel
