/**
 * @type {import('vite').UserConfig}
 */
export default {
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'hyperons',
      formats: ['es', 'cjs', 'umd'],
      target: 'node14',
      fileName: (format) => `hyperons.${format}.js`
    }
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  test: {
    environment: 'node',
    coverage: {
      reporter: ['text', 'lcov']
    }
  }
}
