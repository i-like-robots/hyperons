const benchmark = require('benchmark')
const hyperapp = require('./engines/hyperapp')
const hyperons = require('./engines/hyperons')
const inferno = require('./engines/inferno')
const nerv = require('./engines/nerv')
const preact = require('./engines/preact')
const rax = require('./engines/rax')
const react = require('./engines/react')
const vdo = require('./engines/vdo')

const suite = new benchmark.Suite()

suite
  .add('Hyperapp', () => {
    hyperapp()
  })
  .add('Hyperons', () => {
    hyperons()
  })
  .add('Inferno', () => {
    inferno()
  })
  .add('Nerv', () => {
    nerv()
  })
  .add('Preact', () => {
    preact()
  })
  .add('Rax', () => {
    rax()
  })
  .add('React', () => {
    react()
  })
  .add('vdo', () => {
    vdo()
  })
  .on('cycle', (event) => {
    console.log(' -', String(event.target))
  })
  .on('complete', function () {
    console.log('\nThe fastest is:', this.filter('fastest').map('name'))
  })
  .run({ async: false })
