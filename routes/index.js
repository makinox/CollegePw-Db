const User = require('../models/users')

module.exports = function (app) {
  // Obtener todos los usuarios
  app.get('/users', (req, res) => {
    User.getUsers((err, data) => {
      if (err) {
        console.log(`No existe ${err}`)
      } else {
        res.status(200).json(data)
      }
    })
  })
  // Obtener un solo usuario
  app.get('/users/:id', (req, res) => {
    User.getUser(req.params.id, (err, data) => {
      if (err) {
        console.log(`No existe ${err}`)
      } else {
        res.status(200).json(data)
      }
    })
  })
  // Modificar un usuario
  app.put('/users/:id', (req, res) => {
    const userData = {
      idUsuarios: req.params.id,
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      contraseña: req.body.contraseña,
      email: req.body.email,
      rol: req.body.rol,
      codigo: req.body.codigo,
      created_at: null,
      updated_at: null
    }
    User.updateUser(userData, (err, data) => {
      if (data && data.msg) {
        res.json(data)
      } else if (err) {
        res.json({
          success: false,
          message: `Ha ocurrido un error con el servidor: ${err}`
        })
      } else {
        res.json({
          success: true,
          message: 'Usuario actualizado',
          data
        })
      }
    })
  })
  // Insertando usuario
  app.post('/users', (req, res) => {
    const userData = {
      idUsuarios: req.params.id,
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      contraseña: req.body.contraseña,
      email: req.body.email,
      rol: req.body.rol,
      codigo: req.body.codigo
    }
    User.insertUser(userData, (err, data) => {
      if (data && data.insertId) {
        console.log(data)
        res.json({
          success: true,
          msg: 'Usuario insertado',
          data: data
        })
      } else if (err) {
        res.status(500).json({
          success: false,
          message: `Ha ocurrido un error con el servidor: ${err}`
        })
      }
    })
  })
  // Borrar usuarios
  app.delete('/users/:id', (req, res) => {
    User.deleteUser(req.params.id, (err, data) => {
      if ((data && data.message === 'Usuario borrado')) {
        res.json({
          success: true,
          data
        })
      } else if (err) {
        res.status(500).json({
          message: `Ha ocurrido un error con el servidor: ${err}`
        })
      }
    })
  })
}
