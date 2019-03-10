const { h, render } = require('../../')
const factory = require('./shared/factory')

module.exports = () => render(factory(h))
