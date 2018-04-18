module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './config/webpack.common.js',
      },
      node: {
        extensions: ['.js', '.mjs', '.json'],
      },
    },
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 9,
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
  },
  plugins: ['react', 'flowtype'],
  extends: ['plugin:flowtype/recommended', 'airbnb', 'prettier'],
  rules: {
    'no-console': 0,
    'global-require': 0,
    'no-param-reassign': [2, { props: false }],
    'no-underscore-dangle': [2, { allowAfterThis: true }],
    'no-nested-ternary': 0,
    'import/extensions': [
      2,
      'always',
      { js: 'never', mjs: 'never', json: 'never' },
    ],
    'import/no-extraneous-dependencies': 0, // allow import devDependencies
    'react/jsx-filename-extension': 0, // enfore all .js extension
    'react/prefer-stateless-function': 0,
    'react/default-props-match-prop-types': 0,
    'jsx-a11y/anchor-is-valid': 0,
  },
};
