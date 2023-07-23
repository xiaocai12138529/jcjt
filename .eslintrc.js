module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-empty-source": "off",
    "prettier/prettier": "off",
    "declaration-block-single-line-max-declarations": "off"
  },
  "globals":{
    "define": true,
    "BMapGL":true
  }
}
