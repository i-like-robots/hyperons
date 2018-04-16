const { h, render } = require('../../../')
const factory = require('../shared/factory')

module.exports = (req, res) => {
  res.type('text/html').code(200)
  res.send(render(factory(h)))
}
