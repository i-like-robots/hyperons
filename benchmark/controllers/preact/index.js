const { h } = require('preact')
const renderToString = require('preact-render-to-string');
const factory = require('../shared/factory')

module.exports = (req, res) => {
  res.type('text/html').code(200)
  res.send(renderToString(factory(h)))
}
