'use strict'

const Enty = require('../models/enty')

module.exports = async function (app) {
// Obtener todas las entidades
  await app.get('/enty', async (req, res) => {
    await Enty.getEntys(async (err, data) => {
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

  await app.get('/enty/:id', async (req, res) => {
    await Enty.getEnty(req.params.id, async (err, data) => {
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

  // Agregar una entidad
  await app.post('/enty', async (req, res) => {
    const userData = {
      identificacion: req.body.identificacion,
      nombreEnt: req.body.nombreEnt,
      servicio: req.body.servicio
    }
    await Enty.register(userData, async (err, data) => {
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
}
