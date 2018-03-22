'use strict'

const St = require('../models/state')

module.exports = async function (app) {
  // Obtener todos los estados
  await app.get('/stats', async (req, res) => {
    await St.getStats(async (err, data) => {
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
  // Obtener una sola materia dando  la  materia
  await app.get('/stats/:as', async (req, res) => {
    await St.getStat(req.params.as, async (err, data) => {
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

    // Obtener una sola materia dando  el usuario
  await app.get('/est/:as', async (req, res) => {
    await St.getOest(req.params.as, async (err, data) => {
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

  // Modificar un estado
  await app.put('/stats/:id&:as', async (req, res) => {
    const userData = {
      usuario: req.params.id,
      idCalificaciones: req.params.as,
      calificacionEstudiante: req.body.calificacionEstudiante,
      calificacionProfesores: req.body.calificacionProfesores,
      nota1: req.body.nota1,
      nota2: req.body.nota2,
      nota3: req.body.nota3
    }
    await St.updateStat(userData, async (err, data) => {
      if (data.error || err) {
        res.jsonp({
          success: false,
          data
        })
      } else {
        await res.jsonp({
          success: true
        })
      }
    })
  })
    // Insertando todas las estadisticas
  await app.post('/stats', async (req, res) => {
    const userData = {
      usuario: req.body.usuario,
      idAsignaturas: req.body.idAsignaturas,
      calificacionEstudiante: req.body.calificacionEstudiante,
      calificacionProfesores: req.body.calificacionProfesores,
      nota1: req.body.nota1,
      nota2: req.body.nota2,
      nota3: req.body.nota3
    }
    await St.insertStat(userData, async (err, data) => {
      if (data.error || err) {
        res.jsonp({
          success: false,
          data
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
      if (data.error || err) {
        res.jsonp({
          success: false,
          data
        })
      } else {
        await res.jsonp({
          success: true
        })
      }
    })
  })
}
