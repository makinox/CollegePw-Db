const User = require('../models/users')

module.exports = function (app) {
  app.get('/users', (req, res) => {
    User.getUsers((err, data) => {
      if (err) {
        console.log(`not exists ${err}`)
      } else {
        res.status(200).json(data)
      }
    })
  })
  app.get('/users/:id', (req, res) => {
    User.getUser(req.params.id, (err, data) => {
      if (err) {
        console.log(`not exists ${err}`)
      } else {
        res.status(200).json(data)
      }
    })
  })
}
