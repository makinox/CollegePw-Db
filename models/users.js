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

userModel.updateUser = (userData, callback) => {
  if (connection) {
    let sql = `
        UPDATE users SET
        username = ${connection.escape(userData.username)},
        password = ${connection.escape(userData.password)},
        email = ${connection.escape(userData.email)}
        where id = ${connection.escape(userData.id)}`

    connection.query(sql, (err, rows) => {
      if (err) {
        throw err
      } else {
        callback(null, {'message': 'User updated'})
      }
    })
  }
}

module.exports = userModel
