const Index = require('../models/index')

module.exports = async function (app) {
  // Obtener todos las tablas

  await app.get('/', (req, res) => {
    Index.anything((err, data) => {
      if (err) {
        return console.log(`Ocurrio algun error: ${err.message}`);
      } else {
        res.status(200).json(data)
      }
    })
  })
}