
  const Auth = require('../models/auth')

  module.exports = async function (app) {
    await app.get('/auth/:id&:ps', async (req, res) => {
      await Auth.validate(req.params.id, req.params.ps, async (err, data) => {
        if (err) {
          res.jsonp({
            success: false,
            message: `Ha ocurrido un error: ${err}`
          })
        } else {
          await res.jsonp(data)
        }
      })
    })
  }
