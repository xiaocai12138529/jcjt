module.exports = {
  env: {
    development: {
      plugins: ["dynamic-import-node"],
    },
  },
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
