const { createElement } = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const factory = require('../controllers/shared/factory')

module.exports = () => renderToStaticMarkup(factory(createElement))
