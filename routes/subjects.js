'use strict'

const Sub = require('../models/subjects')

module.exports = async function (app) {
  // Obtener todas las clases
  await app.get('/subjects', async (req, res) => {
    await Sub.getSubjects(async (err, data) => {
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
  // Obtener una sola asignatura
  await app.get('/subjects/:id', async (req, res) => {
    await Sub.getSubject(req.params.id, async (err, data) => {
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
  // Modificar una asignatura
  await app.put('/subjects/:id', async (req, res) => {
    const userData = {
      idAsignaturas: req.params.id,
      nombreCurso: req.body.nombreCurso,
      periodo: req.body.periodo,
      curso: req.body.curso,
      codigoG: req.body.codigoG
    }
    await Sub.updateSubject(userData, async (err, data) => {
      if (err) {
        res.jsonp({
          success: false,
          message: `Ocurrio el siguiente error: ${err}`
        })
      } else {
        await res.jsonp({
          success: true,
          message: 'Asignatura actualizada'
        })
      }
    })
  })
  // Insertando una asignatura
  await app.post('/subjects', async (req, res) => {
    const userData = {
      idAsignaturas: req.params.id,
      nombreCurso: req.body.nombreCurso,
      periodo: req.body.periodo,
      curso: req.body.curso,
      codigoG: req.body.codigoG
    }
    await Sub.insertSubject(userData, async (err, data) => {
      if (err) {
        res.jsonp({
          success: false,
          message: `Ocurrio el siguiente error: ${err}`
        })
      } else {
        await res.jsonp({
          success: true,
          message: 'Asignatura insertada'
        })
      }
    })
  })
  // Borrar asignaturas
  await app.delete('/subjects/:id', async (req, res) => {
    await Sub.deleteSubject(req.params.id, async (err, data) => {
      if (err) {
        res.jsonp({
          success: false,
          message: `Ocurrio el siguiente error: ${err}`
        })
      } else {
        await res.jsonp({
          success: true,
          message: 'Asignatura eliminada'
        })
      }
    })
  })
}
