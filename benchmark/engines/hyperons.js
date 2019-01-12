const { h, render } = require('../../')
const factory = require('../controllers/shared/factory')

module.exports = () => render(factory(h))
