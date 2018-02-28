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
      nombres: req.params.nombres,
      apellidos: req.body.apellidos,
      contraseña: req.body.contraseña,
      email: req.body.email,
      rol: req.body.rol,
      idUsuarios: req.body.idUsuarios,
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
          message: `Error ${err}`
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
}
