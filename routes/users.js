const User = require('../models/users')

module.exports = async function (app) {
  // Obtener todos los usuarios
  await app.get('/users', async (req, res) => {
    await User.getUsers(async (err, data) => {
      if (data.error || err) {
        res.jsonp({
          success: false,
          data
        })
      } else {
        await res.jsonp(data)
      }
    })
  })

  // Obtiene un resultado con limite e indice
  await app.get('/users/limit=:limit&offset=:offset', async (req, res) => {
    await User.getUser(req.params.limit, req.params.offset, async (err, data) => {
      if (data.error || err) {
        res.jsonp({
          success: false,
          data
        })
      } else {
        await res.jsonp(data)
      }
    })
  })

  // Obtiene los resultados en orden ascendente
  await app.get('/usersNASC/limit=:limit&offset=:offset', async (req, res) => {
    await User.getUsersNameASC(req.params.limit, req.params.offset, async (err, data) => {
      if (data.error || err) {
        res.jsonp({
          success: false,
          data
        })
      } else {
        await res.jsonp(data)
      }
    })
  })

  // Obtiene los resultados en orden descendente
  await app.get('/usersNDESC/limit=:limit&offset=:offset', async (req, res) => {
    await User.getUsersNameDESC(req.params.limit, req.params.offset, async (err, data) => {
      if (data.error || err) {
        res.jsonp({
          success: false,
          data
        })
      } else {
        await res.jsonp(data)
      }
    })
  })

  // Obtiene los resultados de la busqueda
  await app.get('/usersSEARCH/limit=:limit&offset=:offset&search=:index', async (req, res) => {
    await User.getUsersSEARCH(req.params.limit, req.params.offset, req.params.index, async (err, data) => {
      if (data.error || err) {
        res.jsonp({
          success: false,
          data
        })
      } else {
        await res.jsonp(data)
      }
    })
  })

  // Obtiene los resultados de la busqueda
  await app.get('/usersFOR/', async (req, res) => {
    await User.forme(async (err, data) => {
      if (data.error || err) {
        res.jsonp({
          success: false,
          data
        })
      } else {
        await res.jsonp(data)
      }
    })
  })

  // Obtener un solo usuario
  // await app.get('/users/:id', async (req, res) => {
  //   await User.getUser(req.params.id, async (err, data) => {
  //     if (data.error || err) {
  //       res.jsonp({
  //         success: false,
  //         data
  //       })
  //     } else {
  //       await res.jsonp(data)
  //     }
  //   })
  // })

  // Da los usuarios que estan registrados en el curso
  // await app.get('/guser/:grado', async (req, res) => {
  //   await User.getAFcurso(req.params.grado, async (err, data) => {
  //     if (data.error || err) {
  //       res.jsonp({
  //         success: false,
  //         data
  //       })
  //     } else {
  //       await res.jsonp(data)
  //     }
  //   })
  // })

  // Modificar un usuario
  // await app.put('/users/:id', async (req, res) => {
  //   const userData = {
  //     nombres: req.body.nombres,
  //     apellidos: req.body.apellidos,
  //     contraseña: req.body.contraseña,
  //     email: req.body.email,
  //     rol: req.body.rol,
  //     documento: req.body.documento,
  //     usuario: req.params.id
  //   }
  //   await User.updateUser(userData, async (err, data) => {
  //     if (data.error || err) {
  //       res.jsonp({
  //         success: false,
  //         data
  //       })
  //     } else {
  //       await res.jsonp({
  //         success: true
  //       })
  //     }
  //   })
  // })
  // Insertando usuario
  // await app.post('/users', async (req, res) => {
  //   const userData = {
  //     nombres: req.body.nombres,
  //     apellidos: req.body.apellidos,
  //     contraseña: req.body.contraseña,
  //     email: req.body.email,
  //     rol: req.body.rol,
  //     documento: req.body.documento,
  //     usuario: req.body.usuario
  //   }
  //   await User.insertUser(userData, async (err, data) => {
  //     if (data.error || err) {
  //       res.jsonp({
  //         success: false,
  //         data
  //       })
  //     } else {
  //       await res.jsonp({
  //         success: true
  //       })
  //     }
  //   })
  // })

  // Borrar usuarios
  // await app.delete('/users/:id', async (req, res) => {
  //   await User.deleteUser(req.params.id, async (err, data) => {
  //     if (data.error || err) {
  //       res.jsonp({
  //         success: false,
  //         data
  //       })
  //     } else {
  //       res.jsonp({
  //         success: true
  //       })
  //     }
  //   })
  // })
}
