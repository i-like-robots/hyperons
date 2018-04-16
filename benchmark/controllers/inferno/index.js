const { createElement } = require('inferno-create-element')
const { renderToString } = require('inferno-server');
const factory = require('../shared/factory')

module.exports = (req, res) => {
  res.type('text/html').code(200)
  res.send(renderToString(factory(createElement)))
}
