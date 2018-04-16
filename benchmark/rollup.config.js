import buble from 'rollup-plugin-buble'

export default {
  input: './components/src/app.js',
  output: {
    file: 'components/dist/bundle.js',
    intro: 'module.exports = function (h) { var exports = {};',
    outro: 'return exports; }',
    format: 'cjs'
  },
  plugins: [buble({ jsx: 'h', target: { node: 6 } })]
}
