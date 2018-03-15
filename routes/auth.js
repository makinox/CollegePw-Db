
  const Auth = require('../models/auth')

  module.exports = async function (app) {
    await app.get('/auth/:id&:ps', async (req, res) => {
      await Auth.validate(req.params.id, req.params.ps, async (err, data) => {
        if (err) {
          console.log(`No existe ${err}`)
        } else {
          await res.status(200).jsonp(data)
        }
      })
    })
  }
