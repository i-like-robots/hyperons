const { createElement } = require('inferno-create-element')
const { renderToString } = require('inferno-server');
const factory = require('./shared/factory')

module.exports = () => renderToString(factory(createElement))
