const User = require('../models/users')

module.exports = async function (app) {
  // Obtener todos los usuarios

  await app.get('/users', async (req, res) => {
    await User.getUsers(async (err, data) => {
      if (err) {
        console.log(`No existe ${err}`)
      } else {
        await res.status(200).json(data)
      }
    })
  })
  // Obtener un solo usuario

  await app.get('/users/:id', async (req, res) => {
    await User.getUser(req.params.id, async (err, data) => {
      if (err) {
        console.log(`No existe ${err}`)
      } else {
        await res.status(200).json(data)
      }
    })
  })
  // Modificar un usuario

  await app.put('/users/:id', async (req, res) => {
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
    await User.updateUser(userData, async (err, data) => {
      if (err) {
        res.json({
          success: false,
          message: `Ha ocurrido un error con el servidor: ${err}`
        })
      } else {
        await res.json({
          success: true,
          message: 'Usuario actualizado',
          data
        })
      }
    })
  })
  // Insertando usuario

  await app.post('/users', async (req, res) => {
    const userData = {
      idUsuarios: req.params.id,
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      contraseña: req.body.contraseña,
      email: req.body.email,
      rol: req.body.rol,
      codigo: req.body.codigo
    }
    await User.insertUser(userData, async (err, data) => {
      if (data && data.insertId) {
        await res.json({
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

  await app.delete('/users/:id', async (req, res) => {
    await User.deleteUser(req.params.id, async (err, data) => {
      if ((data && data.message === 'Usuario borrado')) {
        await res.json({
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
