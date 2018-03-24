const Index = require('../models/index')

module.exports = async function (app) {
  // Obtener todos las tablas

  await app.get('/', async (req, res) => {
    await Index.anything(async (err, data) => {
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
