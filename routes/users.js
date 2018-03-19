const User = require('../models/users')

module.exports = async function (app) {
  // Obtener todos los usuarios
  await app.get('/users', async (req, res) => {
    await User.getUsers(async (err, data) => {
      if (err) {
        res.jsonp({
          success: false,
          message: `Ocurrio el siguiente error: ${err}`
        })
      } else {
        await res.jsonp(data)
      }
    })
  })

  // Obtener un solo usuario
  await app.get('/users/:id', async (req, res) => {
    await User.getUser(req.params.id, async (err, data) => {
      if (err) {
        res.jsonp({
          success: false,
          message: `Ocurrio el siguiente error: ${err}`
        })
      } else {
        await res.jsonp(data)
      }
    })
  })

  // Modificar un usuario
  await app.put('/users/:id', async (req, res) => {
    const userData = {
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      contraseña: req.body.contraseña,
      email: req.body.email,
      rol: req.body.rol,
      documento: req.body.documento,
      usuario: req.params.id
    }
    await User.updateUser(userData, async (err, data) => {
      if (err) {
        res.jsonp({
          success: false,
          message: `Ocurrio el siguiente error: ${err}`
        })
      } else {
        await res.jsonp({
          success: true
        })
      }
    })
  })
  // Insertando usuario
  await app.post('/users', async (req, res) => {
    const userData = {
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      contraseña: req.body.contraseña,
      email: req.body.email,
      rol: req.body.rol,
      documento: req.body.documento,
      usuario: req.body.usuario
    }
    await User.insertUser(userData, async (err, data) => {
      if (err) {
        res.jsonp({
          success: false,
          message: `Ocurrio el siguiente error: ${err}`
        })
      } else {
        await res.jsonp({
          success: true
        })
      }
    })
  })

  // Borrar usuarios
  await app.delete('/users/:id', async (req, res) => {
    await User.deleteUser(req.params.id, async (err, data) => {
      if (err) {
        res.jsonp({
          success: false,
          message: `Ocurrio el siguiente error: ${err}`
        })
      } else {
        res.jsonp({
          success: true
        })
      }
    })
  })
}
