const Index = require('../models/index')

module.exports = async function (app) {
  // Obtener todos las tablas

  await app.get('/', async (req, res) => {
    await Index.anything(async (err, data) => {
      if (err) {
        return console.log(`Ocurrio algun error: ${err.message}`)
      } else {
        await res.status(200).jsonp(data)
      }
    })
  })
}
