const benchmark = require('benchmark')
const current = require('hyperons')
const development = require('../dist/cjs')
const factory = require('./engines/shared/factory')

const suite = new benchmark.Suite()

suite
  .add('Current', () => {
    current.render(factory(current.h))
  })
  .add('Development', () => {
    development.render(factory(development.h))
  })
  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: false })
