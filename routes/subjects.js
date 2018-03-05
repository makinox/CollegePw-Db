const Sub = require('../models/subjects')

module.exports = async function (app) {
  // Obtener todas las clases

  await app.get('/subjects', async (req, res) => {
    await Sub.getSubjects(async (err, data) => {
      if (err) {
        return console.log(`Ocurrio algun error: ${err.message}`)
      } else {
        await res.status(200).json(data)
      }
    })
  })
}
