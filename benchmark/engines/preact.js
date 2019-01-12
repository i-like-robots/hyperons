const { h } = require('preact')
const renderToString = require('preact-render-to-string');
const factory = require('../controllers/shared/factory')

module.exports = () => renderToString(factory(h))
