/**
 * @type {import('vite').UserConfig}
 */
export default {
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'hyperons',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => `hyperons.${format}.js`
    }
  },
  test: {
    environment: 'node'
  }
}
