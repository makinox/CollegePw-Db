'use strict'

let connection = require('../db/index')

let userModel = {}

userModel.getUsers = async (callback) => {
  if (connection) {
    await connection.query('SELECT * FROM usuarios ORDER BY idUsuarios', (err, rows) => {
      if (err) {
        return console.log(`Ha ocorrido un error: ${err.message}`)
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
        return console.log(`Ha ocorrido un error: ${err.message}`)
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
        where idUsuarios = ${connection.escape(userData.idUsuarios) || connection.escape(userData.codigo)}`

    await connection.query(sql, (err, rows) => {
      if (err) {
        return console.log(`Ha ocorrido un error: ${err.message}`)
      } else {
        callback(null, {'message': 'Usuario actualizado'})
      }
    })
  }
}

userModel.insertUser = async (userData, callback) => {
  if (connection) {
    await connection.query('INSERT INTO usuarios SET ?', userData, (err, rows) => {
      if (err) {
        return console.log(`Ha ocorrido un error: ${err.message}`)
      } else {
        callback(null, {'insertId': rows.insertId})
      }
    })
  }
}

userModel.deleteUser = (idUsuarios, callback) => {
  if (connection) {
    let sql = `SELECT * FROM usuarios WHERE idUsuarios = ${connection.escape(idUsuarios)}`
    connection.query(sql, (err, row) => {
      if (row) {
        let sql = `DELETE FROM usuarios WHERE idUsuarios = ${idUsuarios}`
        connection.query(sql, (err, req) => {
          if (err) {
            return console.log(`Ha ocorrido un error: ${err.message}`)
          } else {
            callback(null, {'message': 'Usuario borrado'})
          }
        })
      } else if (err) {
        callback(null, {'message': `Ha ocurrido un error: ${err.message}`})
      }
    })
  }
}

module.exports = userModel
