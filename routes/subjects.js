'use strict'

const Sub = require('../models/subjects')

module.exports = async function (app) {
  // Obtener todas las clases

  await app.get('/subjects', async (req, res) => {
    await Sub.getSubjects(async (err, data) => {
      if (err) {
        return console.log(`Ocurrio algun error: ${err.message}`)
      } else {
        await res.status(200).jsonp(data)
      }
    })
  })
  // Obtener un solo usuario
  await app.get('/subjects/:id', async (req, res) => {
    await Sub.getSubject(req.params.id, async (err, data) => {
      if (err) {
        console.log(`No existe ${err}`)
      } else {
        await res.status(200).jsonp(data)
      }
    })
  })
  // Modificar un usuario
  await app.put('/subjects/:id', async (req, res) => {
    const userData = {
      idAsignaturas: req.params.id,
      nombreCurso: req.body.nombreCurso,
      periodo: req.body.periodo,
      curso: req.body.curso,
      codigoG: req.body.codigoG,
      created_at: null,
      updated_at: null
    }
    await Sub.updateSubject(userData, async (err, data) => {
      if (err) {
        res.jsonp({
          success: false,
          message: `Ha ocurrido un error con el servidor: ${err}`
        })
      } else {
        await res.jsonp({
          success: true,
          message: 'Asignatura actualizada',
          data
        })
      }
    })
  })
  // Insertando usuario
  await app.post('/subjects', async (req, res) => {
    const userData = {
      idAsignaturas: req.params.id,
      nombreCurso: req.body.nombreCurso,
      periodo: req.body.periodo,
      curso: req.body.curso,
      codigoG: req.body.codigoG
    }
    await Sub.insertSubject(userData, async (err, data) => {
      if (data && data.insertId) {
        await res.jsonp({
          success: true,
          msg: 'Asignatura insertada',
          data: data
        })
      } else if (err) {
        res.status(500).jsonp({
          success: false,
          message: `Ha ocurrido un error con el servidor: ${err}`
        })
      }
    })
  })
  // Borrar usuarios
  await app.delete('/subjects/:id', async (req, res) => {
    await Sub.deleteSubject(req.params.id, async (err, data) => {
      if ((data && data.message === 'Asignutura borrada')) {
        await res.jsonp({
          success: true,
          data
        })
      } else if (err) {
        res.status(500).jsonp({
          message: `Ha ocurrido un error con el servidor: ${err}`
        })
      }
    })
  })
}
