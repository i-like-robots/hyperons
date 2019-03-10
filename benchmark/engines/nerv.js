const { createElement } = require('nervjs')
const { renderToStaticMarkup } = require('nerv-server')
const factory = require('./shared/factory')

module.exports = () => renderToStaticMarkup(factory(createElement))
