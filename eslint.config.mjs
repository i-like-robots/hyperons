import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    plugins: {
      react
    },
    languageOptions: {
      ecmaVersion: 2022,
      // sourceType: 'module',
      globals: {
        ...globals.node,
      },
      parserOptions: {
        jsx: true,
      },
    },
    settings: {
      react: {
        pragma: 'h',
        fragment: 'Fragment'
      }
    },
  },
  {
    ignores: ['**/dist/*']
  },
]
