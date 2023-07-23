const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

module.exports = defineConfig({
  devServer: {
    open: false,
    port: 8006
  },
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.module
        .rule('scss')
        .oneOf('vue')
        .use('px2rem-loader')
        .loader('px2rem-loader')
        .before('postcss-loader') 
        .options({ remUnit: 192, remPrecision: 4 })
        .end();
    config
        .plugin("html")
        .tap((args) => {
          args[0].title = process.env.VUE_APP_NAME;
          return args;
        })
        .end();
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))  // 存放 svg 目录的目录
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))  // 存放 svg 目录的目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
})
