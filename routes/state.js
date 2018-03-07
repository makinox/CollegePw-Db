'use strict'

const St = require('../models/state')

module.exports = async function (app) {
  // Obtener todos los estadps

  await app.get('/stats', async (req, res) => {
    await St.getStats(async (err, data) => {
      if (err) {
        return console.log(`Ocurrio algun error: ${err.message}`)
      } else {
        await res.status(200).json(data)
      }
    })
  })
  // Obtener un solo estado
  await app.get('/stats/:id&:as', async (req, res) => {
    await St.getStat(req.params.id, req.params.as, async (err, data) => {
      if (err) {
        console.log(`No existe ${err}`)
      } else {
        await res.status(200).json(data)
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
        if (data) {
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
    await app.delete('/stats/:id&:as', async (req, res) => {
      await St.deleteStat(req.params.id, req.params.as, async (err, data) => {
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