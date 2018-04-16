const { createElement } = require('rax')
const { renderToString } = require('rax-server-renderer')
const factory = require('../shared/factory')

module.exports = (req, res) => {
  res.type('text/html').code(200)
  res.send(renderToString(factory(createElement)))
}
