import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

const chai = 'chai'

export default {
  input: 'test/spec.js',
  output: {
    name: 'TestBundle',
    file: 'temp/spec.js',
    globals: {
      chai
    },
    format: 'iife'
  },
  external: [chai],
  plugins: [nodeResolve({ browser: true }), commonjs()]
}
