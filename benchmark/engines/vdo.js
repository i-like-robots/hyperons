const { createElement } = require('vdo')
const factory = require('./shared/factory')

module.exports = () => String(factory(createElement))
