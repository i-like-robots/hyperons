const { createElement } = require('vdo')
const factory = require('../controllers/shared/factory')

module.exports = () => String(factory(createElement))
