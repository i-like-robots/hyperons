const { h } = require('hyperapp')
const { renderToString } = require('@hyperapp/render')
const factory = require('../shared/factory')

module.exports = (req, res) => {
  res.type('text/html').code(200)
  res.send(renderToString(factory(h)))
}
