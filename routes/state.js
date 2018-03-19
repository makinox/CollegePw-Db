'use strict'

const St = require('../models/state')

module.exports = async function (app) {
  // Obtener todos los estadps

  await app.get('/stats', async (req, res) => {
    await St.getStats(async (err, data) => {
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
  // Obtener un solo estado
  await app.get('/stats/:id&:as', async (req, res) => {
    await St.getStat(req.params.id, req.params.as, async (err, data) => {
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
    // Modificar un estado
  await app.put('/stats/:id&:as', async (req, res) => {
    const userData = {
      idAsignaturas: req.params.id,
      idCalificaciones: req.params.as,
      calificacionEstudiante: req.body.calificacionEstudiante,
      calificacionProfesores: req.body.calificacionProfesores,
      nota1: req.body.nota1,
      nota2: req.body.nota2,
      nota3: req.body.nota3
    }
    await St.updateStat(userData, async (err, data) => {
      if (err) {
        res.jsonp({
          success: false,
          message: `Ha ocurrido un error con el servidor: ${err}`
        })
      } else {
        await res.jsonp({
          success: true
        })
      }
    })
  })
    // Insertando usuario
  await app.post('/stats', async (req, res) => {
    const userData = {
      idUsuarios: req.body.id,
      idAsignaturas: req.body.us,
      calificacionEstudiante: req.body.calificacionEstudiante,
      calificacionProfesores: req.body.calificacionProfesores,
      nota1: req.body.nota1,
      nota2: req.body.nota2,
      nota3: req.body.nota3
    }
    await St.insertStat(userData, async (err, data) => {
      if (err) {
        res.jsonp({
          success: false,
          message: `Ha ocurrido un error con el servidor: ${err}`
        })
      } else {
        await res.jsonp({
          success: true
        })
      }
    })
  })
    // Borrar usuarios
  await app.delete('/stats/:id&:as', async (req, res) => {
    await St.deleteStat(req.params.id, req.params.as, async (err, data) => {
      if (err) {
        res.jsonp({
          success: false,
          message: `Ha ocurrido un error con el servidor: ${err}`
        })
      } else {
        await res.jsonp({
          success: true
        })
      }
    })
  })
}
