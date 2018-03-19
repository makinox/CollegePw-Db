'use strict'

let connection = require('../db/index')

const userModel = {}

userModel.getUsers = async (callback) => {
  if (connection) {
    await connection.query('SELECT * FROM usuarios ORDER BY idUsuarios', async (err, rows) => {
      if (err) {
        return console.log(`Ha ocorrido el siguiente error: ${err.message}`)
      } else {
        await callback(null, rows)
      }
    })
  } else {
    await callback(null, {message: 'No hay conexion'})
  }
}

userModel.getUser = async (id, callback) => {
  if (connection) {
    await connection.query(`SELECT * FROM usuarios WHERE usuario = ${connection.escape(id)}`, async (err, rows) => {
      if (err) {
        return console.log(`Ha ocorrido el siguiente error: ${err.message}`)
      } else {
        await callback(null, rows)
      }
    })
  } else {
    await callback(null, {message: 'No hay conexion'})
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
        email = ${connection.escape(userData.email)},
        documento = ${connection.escape(userData.documento)}
        WHERE usuario = ${connection.escape(userData.usuario)}`

    await connection.query(sql, async (err, rows) => {
      if (err) {
        return callback(null, {message: `Ha ocorrido el siguiente error: ${err.message}`})
      } else {
        await callback(null, rows)
      }
    })
  } else {
    await callback(null, {message: 'No hay conexion'})
  }
}

userModel.insertUser = async (userData, callback) => {
  if (connection) {
    await connection.query('INSERT INTO usuarios SET ?', userData, async (err, rows) => {
      if (err) {
        return console.log(`Ha ocorrido el siguiente error: ${err.message}`)
      } else {
        await callback(null, {'insertId': rows.insertId})
      }
    })
  }
}

userModel.deleteUser = async (usuario, callback) => {
  if (connection) {
    let sql = `SELECT * FROM usuarios WHERE usuario = '${connection.escape(usuario)}'`
    await connection.query(sql, async (err, row) => {
      if (row) {
        let sql = `DELETE FROM usuarios WHERE usuario = '${usuario}'`
        await connection.query(sql, async (err, req) => {
          if (err) {
            return console.log(`Ha ocorrido el siguiente error en el borrado: ${err.message}`)
          } else {
            await callback(null, {'message': 'Usuario borrado'})
          }
        })
      } else if (err) {
        await callback(null, {'message': `Ha ocurrido un error en el seleccionado: ${err.message}`})
      }
    })
  }
}

module.exports = userModel
