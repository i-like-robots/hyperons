const { createElement } = require('nervjs')
const { renderToStaticMarkup } = require('nerv-server')
const factory = require('../shared/factory')

module.exports = (req, res) => {
  res.type('text/html').code(200)
  res.send(renderToStaticMarkup(factory(createElement)))
}
