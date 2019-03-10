const { h } = require('hyperapp')
const { renderToString } = require('@hyperapp/render')
const factory = require('./shared/factory')

module.exports = () => renderToString(factory(h))
