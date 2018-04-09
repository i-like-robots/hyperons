import pkg from './package.json'

const input = 'src/index.js'

export default [
  {
    input,
    output: {
      file: pkg.module,
      format: 'es'
    }
  },
  {
    input,
    output: {
      file: pkg.main,
      format: 'cjs'
    }
  }
]
