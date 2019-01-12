const { h, render } = require('../')
const factory = require('./controllers/shared/factory')

let runs = 1000
let i = 0

const exec = () => {
  while (i < runs) {
    render(factory(h))
    i++
  }
}

const start = process.hrtime()

exec()

const diff = process.hrtime(start)

console.info('Execution time (hr): %ds %dms', diff[0], diff[1] / 1000000)
