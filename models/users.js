'use strict'

let connection = require('../db/index')

let userModel = {}

userModel.getUsers = async (callback) => {
  if (connection) {
    await connection.query('SELECT * FROM usuarios ORDER BY idUsuarios', (err, rows) => {
      if (err) {
        throw err
      } else {
        callback(null, rows)
      }
    })
  }
}

userModel.getUser = async (id, callback) => {
  if (connection) {
    await connection.query(`SELECT * FROM usuarios WHERE idUsuarios = ${connection.escape(id)}`, (err, rows) => {
      if (err) {
        throw err
      } else {
        callback(null, rows)
      }
    })
  }
}

userModel.updateUser = async (userData, callback) => {
  if (connection) {
    let sql = `
        UPDATE usuarios SET
        nombres = ${connection.escape(userData.nombres)},
        apellidos = ${connection.escape(userData.apellidos)},
        contraseña = ${connection.escape(userData.contraseña)},
        rol = ${connection.escape(userData.rol)},
        email = ${connection.escape(userData.email)}
        where idUsuarios = ${connection.escape(userData.id) || connection.escape(userData.codigo)}`

    await connection.query(sql, (err, rows) => {
      if (err) {
        throw err
      } else {
        callback(null, {'message': 'Usuario actualizado'})
      }
    })
  }
}

module.exports = userModel
