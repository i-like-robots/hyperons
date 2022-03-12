/**
 * @type {import('vite').UserConfig}
 */
export default {
  build: {
    lib: {
      entry: 'components/src/app.jsx',
      name: 'hyperons',
      formats: ['cjs'],
      fileName: () => 'bundle.js'
    }
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  test: {
    environment: 'node'
  }
}
