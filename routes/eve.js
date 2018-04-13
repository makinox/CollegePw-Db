'use strict'

const Eve = require('../models/eve')

module.exports = async function (app) {
  // Obtener el promedio
  await app.get('/eve/:user', async (req, res) => {
    await Eve.average(req.params.user, async (err, data) => {
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
}