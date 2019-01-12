const { h } = require('hyperapp')
const { renderToString } = require('@hyperapp/render')
const factory = require('../controllers/shared/factory')

module.exports = () => renderToString(factory(h))
