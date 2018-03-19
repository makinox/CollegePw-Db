const Index = require('../models/index')

module.exports = async function (app) {
  // Obtener todos las tablas

  await app.get('/', async (req, res) => {
    await Index.anything(async (err, data) => {
      if (err) {
        res.jsonp({
          success: false,
          message: `Ha ocurrido un error con el servidor: ${err}`
        })
      } else {
        await res.jsonp(data)
      }
    })
  })
}
