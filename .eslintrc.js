module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ['eslint:recommended'],
  plugins: ['react'],
  rules: {
    'react/no-unknown-property': 1,
    'react/react-in-jsx-scope': 2,
    'react/jsx-no-undef': 2,
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2
  },
  settings: {
    react: {
      pragma: 'h',
      fragment: 'Fragment'
    }
  }
}
