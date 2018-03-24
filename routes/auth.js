
  const Auth = require('../models/auth')

  module.exports = async function (app) {
    await app.get('/auth/:id&:ps', async (req, res) => {
      await Auth.validate(req.params.id, req.params.ps, async (err, data) => {
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
