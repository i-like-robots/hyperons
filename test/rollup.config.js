import commonjs from 'rollup-plugin-commonjs'

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
  plugins: [commonjs()]
}
