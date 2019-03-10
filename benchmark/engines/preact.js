const { h } = require('preact')
const renderToString = require('preact-render-to-string');
const factory = require('./shared/factory')

module.exports = () => renderToString(factory(h))
