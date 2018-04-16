const { createElement } = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const factory = require('../shared/factory')

module.exports = (req, res) => {
  res.type('text/html').code(200)
  res.send(renderToStaticMarkup(factory(createElement)))
}
