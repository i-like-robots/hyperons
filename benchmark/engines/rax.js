const { createElement } = require('rax')
const { renderToString } = require('rax-server-renderer')
const factory = require('./shared/factory')

module.exports = () => renderToString(factory(createElement))
