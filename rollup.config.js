import buble from 'rollup-plugin-buble'
import pkg from './package.json'

const input = 'src/index.js'

export default [
  {
    input,
    plugins: [buble({ target: { node: 6 } })],
    output: {
      file: pkg.module,
      format: 'es'
    }
  },
  {
    input,
    plugins: [buble({ target: { node: 6 } })],
    output: {
      file: pkg.main,
      format: 'cjs'
    }
  }
]
